/*
For MongoDB backend server setup.
*/
require('dotenv').config(); // To use environment variables from a .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; //backend runs on port 5001

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
console.log('MONGO_URI:', process.env.MONGO_URI); // Add this before connecting to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Getting all users from the database
app.get('/all_users', async (req, res) => {
  try {
    // Query all documents from the userprofiles collection
    const users = await UserProfile.find({});
    res.status(200).json(users); // Send the user profiles as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})  

app.get('/user', async (req, res) => {
  try {
    // Query one document from userprofiles
    const user = await UserProfile.findOne({});
    res.status(200).json(user); 
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const UserProfile = require('./models/UserProfile');

app.post('/api/signup', async (req, res) => {
  const { email, password, profileName, zipCode, age, gender, cuisine, photo } = req.body;
  
  try {
    // Create and save a new user profile
    const newUserProfile = new UserProfile({
      email,
      password,
      profileName,
      zipCode,
      age,
      gender,
      cuisine,
      photo,
    });
    await newUserProfile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// updating the users past_likes and past_dislikes page
app.post('/past_likes', async (req, res) => {
  const { display_email, user_email, isLeft } = req.body;

  try {
    // Determine the fields to update based on isLeft
    const updateField = isLeft ? 'past_likes' : 'past_dislikes';
    const reverseUpdateField = isLeft ? 'past_dislikes' : 'past_likes';

    // Step 1: Remove from the reverse field (if needed)
    await UserProfile.updateOne(
      { email: user_email },
      { $pull: { [reverseUpdateField]: display_email } }
    );

    // Step 2: Add to the correct field
    const updatedUser = await UserProfile.findOneAndUpdate(
      { email: user_email },
      { $addToSet: { [updateField]: display_email } },
      { new: true, upsert: true } // Return the updated document, create if not exists
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the Display User
    const updateDisplayUserOperation = isLeft
      ? { $addToSet: { who_liked: user_email } } // Add user_email to who_liked
      : { $pull: { who_liked: user_email } };   // Remove user_email from who_liked

    const updatedDisplayUser = await UserProfile.findOneAndUpdate(
      { email: display_email },
      updateDisplayUserOperation,
      { new: true, upsert: true }
    );

    if (!updatedDisplayUser) {
      return res.status(404).json({ error: 'Display User not found' });
    }

    res.status(200).json({ message: 'Profiles updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
});