const mongoose = require('mongoose');

// Define the schema for a movie
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  info: {
    directors: [String],  // List of directors
    release_date: String, // Release date of the movie
    rating: { type: Number },  // Movie rating
    genres: [String],  // List of genres
    image_url: String, // URL of the movie image
    plot: String,  // Short plot summary
    rank: { type: Number },  // Popularity or rank
    running_time_secs: Number,  // Duration of the movie in seconds
    actors: [String],  // List of actors
  },
});

// Export the Movie model
module.exports = mongoose.model('Movie', MovieSchema);
