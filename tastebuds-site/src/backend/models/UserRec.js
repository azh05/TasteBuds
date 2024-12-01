
const mongoose = require('mongoose');

// Recommendation Schema
const userRecommendationSchema = new mongoose.Schema({
  email: { type: String },
  embed_vector : { type: [Number], default: [0,     0,       0,      0,          0,           0 ] },
  //                                        Age, Gender, Cuisine, past_likes, past_dislikes, who_liked
  recent_interactions: { type: [String], default: [ ] }
});

const UserRec = mongoose.model('UserRec', userRecommendationSchema);

module.exports = UserRec;
