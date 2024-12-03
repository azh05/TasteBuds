/*
For MongoDB backend server setup.
*/
require('dotenv').config(); // To use environment variables from a .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Recommendation and Zipcode Filtering system
const { embedUser, recommendUser, pickRandomUser } = require('./recommend');
const zipcodes = require("zipcodes");

// Mongoose object types
const UserProfile = require('./models/UserProfile');
const UserRec = require('./models/UserRec');

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

const getCityFromZip = (zipCode) => {
  const location = zipcodes.lookup(zipCode);
  return location ? location.city : "No city provided";
};

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
    const { email, selected_city } = req.query;

    // Query all documents from the userprofiles collection
    const userProfiles = await UserProfile.find({});

    let userEmbeds;
    if(selected_city && selected_city !== "All") {
      // Filtering profiles by zipcode
      const filteredUserProfiles = userProfiles.filter(
        (profile) => getCityFromZip(profile.zipCode) === selected_city
      );
      const filteredEmails = filteredUserProfiles.map(user => user.email);

      // Query all documents from the userrecs collection by zipcode
      userEmbeds = await UserRec.find({ $or: [
        { email: { $in: filteredEmails } },
        { email: email }
      ] });
    } else {
      userEmbeds = await UserRec.find({});
    }
      
    // recommended user email
    const recUserEmail = recommendUser(userEmbeds, email);

    // User who is logged in
    const currUser = await UserRec.findOne({email: email});

    // how long it will take for a seen user to be valid agains
    const DELAY = 10;

    // if null email -> None avaiable 
    
    if(!recUserEmail) { 
      res.status(200).json(null); 
      /* 
      // Pick a random email 
      const currUserInteractions = currUser ?  currUser.recent_interactions : [];

      const randomEmail = pickRandomUser(userProfiles, email, currUserInteractions);

      const updatedDisplayUser = await UserRec.findOneAndUpdate(
        { email: email },
        { $addToSet: { recent_interactions: randomEmail }, },
        { new: true, upsert: true }
      );

      const randomUser = await UserProfile.findOne({email: randomEmail});

      if(currUser && currUser.recent_interactions && currUser.recent_interactions.length > DELAY) {
        // Update the recommendation collection 
        await UserRec.updateOne(
          { email: email },
          { $pop: { recent_interactions : -1 }, $set: {email: email}},
          { new: true, upsert: true }
        );
      }

      res.status(200).json(randomUser); */
    } else {
      const recUser = await UserProfile.findOne({email: recUserEmail});
      if(currUser && currUser.recent_interactions && currUser.recent_interactions.length >= DELAY) {
        // Update the recommendation collection 
        await UserRec.updateOne(
          { email: email },
          { $pop: { recent_interactions : -1 }, $set: {email: email}},
          { new: true, upsert: true }
        );
      }
      

      const updatedUser = await UserRec.findOneAndUpdate(
        { email: email },
        { $addToSet: { recent_interactions: recUserEmail }, $set: {email: email}},
        { new: true, upsert: true }
      );

      res.status(200).json(recUser); 
    }

    
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



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


    // Update Embedding
    const updatedUserEmbed = await UserRec.findOneAndUpdate(
      { email: user_email }, 
      { $set: { embed_vector: embedUser(updatedUser) }},
      { upsert: true, returnDocument: 'after' }
    )

    const updatedDisplayEmbed = await UserRec.findOneAndUpdate(
      { email: display_email }, 
      { $set: { embed_vector: embedUser(updatedDisplayUser) }},
      { upsert: true, returnDocument: 'after' }
    )

    res.status(200).json({ message: 'Profiles updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
});

app.get('/likes', async(req, res) => {
  try {
    const { email } = req.query;
    /* may conflict email; email */
    const user = await UserProfile.findOne({email: email})
    const who_liked = user.who_liked;
    const liked_users = await UserProfile.find({email: { $in: who_liked}});
    res.status(200).json(liked_users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Failed to fetch users'})
  }
})