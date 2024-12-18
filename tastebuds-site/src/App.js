// src/App.js
import React from 'react';

import { UserProvider } from './userinfo/UserContext';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  // Ensure this path is correct
import Signup from './pages/signup'; // Correct path for signup page
import HomePage from './pages/home';  // Correct path for HomePage
import SwipePage from './pages/SwipePage';
import Match from './pages/match';
import ProfilePage from './pages/profile';
import Recommend from './pages/recommend'

function App() {
  return (
    <UserProvider >
      <Router>
        <div>
          {/* Define Routes here */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home page route */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
            <Route path="/login" element={<Login />} /> {/* Login page route */}
            <Route path="/scroll" element={<SwipePage />} /> {/* Scroll page route */}
            <Route path="/match" element={<Match />} /> {/* Matching page route */}
            <Route path="/profile/:email" element = {<ProfilePage />} /> {/* Profile page route */}
            <Route path="/recommend" element = {<Recommend />} /> {/* Profile page route */}
        </Routes>
        </div>
      </Router>
    </UserProvider>
    
  );
}

export default App;