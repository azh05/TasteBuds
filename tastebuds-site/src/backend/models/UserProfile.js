const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // In practice, you'd hash this password
  profileName: String,
  zipCode: String,
  age: Number,
  gender: String,
  cuisine: String,
  photo: String, // Assuming photo will be a URL or path
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
