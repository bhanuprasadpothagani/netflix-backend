const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie'); // Import the Movie model
const movies = require('./movies.json'); // Import the movie data from movies.json

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Insert the movies data into the movies collection
    Movie.insertMany(movies)
      .then(() => {
        console.log('Movies data successfully inserted!');
        mongoose.disconnect(); // Disconnect after inserting
      })
      .catch((err) => {
        console.error('Error inserting movies:', err);
        mongoose.disconnect(); // Disconnect in case of error
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
