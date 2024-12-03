const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  email: { type: String },
  // password: { type: String, required: true }, // In practice, you'd hash this password
  profileName: String,
  zipCode: String,
  age: Number,
  gender: String,
  cuisine: { type: [String], default: [] },
  photo: String, // Assuming photo will be a URL or path
  bio: {type: String, default: ''},
  icon: {type: String, default: '🍉'},
  past_likes: { type: [String], default: [] },
  past_dislikes: { type: [String], default: [] },
  who_liked: { type: [String], default: []}
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
