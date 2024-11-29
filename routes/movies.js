const express = require('express');
const Movie = require('../models/Movie');
const verifyToken = require('../utils/verifyToken');  // Import the JWT verification middleware
const router = express.Router();

// GET all movies - Public Route (No authentication)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ 'info.rank': 1 }); // Sort movies by rank

    // Group movies by genres
    const groupedMovies = movies.reduce((acc, movie) => {
      if (!movie.info || !Array.isArray(movie.info.genres)) return acc; // Skip invalid movies

      movie.info.genres.forEach((genre) => {
        if (!acc[genre]) {
          acc[genre] = [];
        }
        acc[genre].push(movie); // Add movie to its corresponding genre
      });

      return acc;
    }, {});

    res.status(200).json(groupedMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.get('/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title); // Decode the title if needed
    console.log('Title:', decodedTitle);

    const movie = await Movie.findOne({ title: decodedTitle }); // Find the movie by title
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie); // Return the movie details
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
module.exports = router;
