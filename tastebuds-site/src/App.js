// src/App.js
import React from 'react';


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  // Ensure this path is correct
import Signup from './pages/signup'; // Correct path for signup page
import HomePage from './pages/home';  // Correct path for HomePage
import SwipePage from './pages/SwipePage';
import Match from './pages/match';
import Restaurant from './pages/restaurant';

function App() {
  return (
    <Router>
      <div>
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
          <Route path="/login" element={<Login />} /> {/* Login page route */}
          <Route path="/scroll" element={<SwipePage />} /> {/* Scroll page route */}
          <Route path="/match" element={<Match />} /> {/* Matching page route */}
          <Route path="/match" element={<Restaurant />} /> {/* Matching resturant route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;