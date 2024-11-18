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

app.get('/users', async (req, res) => {
  try {
    // Query all documents from the userprofiles collection
    const users = await UserProfile.find({});
    res.status(200).json(users); // Send the user profiles as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})  

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
