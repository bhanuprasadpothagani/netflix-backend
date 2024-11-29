const express = require('express');
const Favorite = require('../models/Favorite');
const Movie = require('../models/Movie');
const verifyToken = require('../utils/verifyToken'); // JWT verification middleware
const router = express.Router();

// Add a movie to the user's favorites
router.post('/', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user._id; // Extract user ID from the verified JWT

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find the user's favorite document or create a new one
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      favorite = new Favorite({ userId, movies: [movieId] });
    } else if (!favorite.movies.includes(movieId)) {
      favorite.movies.push(movieId); // Add the movie to favorites if not already added
    }

    await favorite.save();
    res.status(200).json({ message: 'Movie added to favorites', favorite });
  } catch (err) {
    console.error('Error adding to favorites:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get the user's favorite movies
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user._id; // Extract user ID from the verified JWT

  try {
    const favorite = await Favorite.findOne({ userId }).populate('movies'); // Populate movies for detailed data
    if (!favorite || favorite.movies.length === 0) {
      return res.status(404).json({ message: 'No favorite movies found' });
    }

    res.status(200).json(favorite.movies);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
