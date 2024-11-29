const mongoose = require('mongoose');

// Define the schema for a user's favorite movies
const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],  // List of movie references
});

// Export the Favorite model
module.exports = mongoose.model('Favorite', FavoriteSchema);
