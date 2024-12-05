const mongoose = require('mongoose');
const UserProfile = require('./models/UserProfile');
require('dotenv').config(); // Load environment variables

const MONGO_URI = "mongodb+srv://alexren:alexren@tastebuds.3cfkg.mongodb.net/?retryWrites=true&w=majority&appName=tastebuds";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Sample profiles
    const sampleProfiles = [
      {
        email: 'user1@example.com',
        password: 'password1',
        profileName: 'Alice',
        zipCode: '90024',
        age: 25,
        gender: 'Female',
        cuisine: 'Italian',
        photo: 'https://example.com/photo1.jpg',
      },
      {
        email: 'user2@example.com',
        password: 'password2',
        profileName: 'Bob',
        zipCode: '90024',
        age: 30,
        gender: 'Male',
        cuisine: 'Italian',
        photo: 'https://example.com/photo2.jpg',
      },
      {
        email: 'user3@example.com',
        password: 'password3',
        profileName: 'Carol',
        zipCode: '90024',
        age: 28,
        gender: 'Female',
        cuisine: 'Italian',
        photo: 'https://example.com/photo3.jpg',
      },
    ];

    // Insert profiles into the database
    await UserProfile.insertMany(sampleProfiles);
    console.log('Sample profiles inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();