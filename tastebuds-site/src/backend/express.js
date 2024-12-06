const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (you can be more restrictive if needed)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from React frontend
  methods: ['GET', 'POST'],        // Allow only specific methods
  credentials: true,               // Allow cookies (if you're using them)
}));

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Simulate the signup route
app.post('/api/signup', (req, res) => {
  const { email, password, profileName, zipCode, age, gender, cuisine } = req.body;

  if (!email || !password || !profileName || !zipCode || !age || !gender || !cuisine) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  // Simulate saving the user in a database
  console.log('Received user data:', req.body);

  // Simulate a successful response
  res.status(200).json({ message: 'User profile successfully created.' });
});

app.listen(5001, () => {
  console.log('Backend server running on http://localhost:5001');
});
