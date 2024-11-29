const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Ensure correct import
const movieRoutes = require('./routes/movies');
const favoriteRoutes = require('./routes/favorites');
const cors = require('cors');

dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(
  cors()
); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control'); // Allowed headers

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight request
  }

  next();
});

console.log(authRoutes);   // Should log a function (Router)
console.log(movieRoutes);  // Should log a function (Router)
console.log(favoriteRoutes);  // Should log a function (Router)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes); // Correctly use authRoutes
app.use('/movies', movieRoutes); // Correctly use movieRoutes
app.use('/favorites', favoriteRoutes); // Correctly use favoriteRoutes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
