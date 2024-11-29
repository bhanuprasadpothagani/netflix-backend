const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash the password before saving it
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's modified
  const salt = await bcrypt.genSalt(10);  // Generate salt
  this.password = await bcrypt.hash(this.password, salt);  // Hash password
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Compare entered password with hashed password
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
