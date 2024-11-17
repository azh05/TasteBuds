// src/App.js
import React from 'react';
import SwipePage from './page/SwipePage';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  // Ensure this path is correct
import Signup from './pages/signup'; // Correct path for signup page
import HomePage from './pages/home';  // Correct path for HomePage
import ScrollPage from './pages/scroll'; // Correct path for ScrollPage

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;