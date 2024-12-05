const mongoose = require('mongoose');
const UserProfile = require('./models/UserProfile');
require('dotenv').config(); // Load environment variables
const faker = require('faker'); // Install with `npm install faker`

const MONGO_URI = "mongodb+srv://alexren:alexren@tastebuds.3cfkg.mongodb.net/?retryWrites=true&w=majority&appName=tastebuds";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing database
    await UserProfile.deleteMany({});
    console.log('Cleared existing profiles from database');

    // Cuisine options
    const cuisineOptions = [
      'Italian',
      'Mexican',
      'Japanese',
      'Indian',
      'Chinese',
      'American',
      'Other',
    ];

    // Generate sample profiles
    const sampleProfiles = [];

    // California ZIP codes
    const californiaZipCodes = ['90001', '90002', '90003', '94101', '94102', '90210', '92612', '91790', '91344', '92037'];

    // Generate 70% profiles from California
    for (let i = 0; i < 70; i++) {
      const profile = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileName: faker.name.firstName(),
        zipCode: faker.random.arrayElement(californiaZipCodes),
        age: faker.datatype.number({ min: 18, max: 60 }),
        gender: faker.random.arrayElement(['Male', 'Female', 'Non-Binary']),
        cuisine: faker.helpers.shuffle(cuisineOptions).slice(0, faker.datatype.number({ min: 1, max: 3 })), // Select 1-3 random cuisines
        photo: faker.image.avatar(),
      };
      sampleProfiles.push(profile);
    }

    // Generate 30% profiles from across the US
    for (let i = 0; i < 30; i++) {
      const profile = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileName: faker.name.firstName(),
        zipCode: faker.address.zipCode(),
        age: faker.datatype.number({ min: 18, max: 60 }),
        gender: faker.random.arrayElement(['Male', 'Female', 'Non-Binary']),
        cuisine: faker.helpers.shuffle(cuisineOptions).slice(0, faker.datatype.number({ min: 1, max: 3 })), // Select 1-3 random cuisines
        photo: faker.image.avatar(),
      };
      sampleProfiles.push(profile);
    }

    // Insert profiles into the database
    await UserProfile.insertMany(sampleProfiles);
    console.log(`Inserted ${sampleProfiles.length} profiles successfully`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
