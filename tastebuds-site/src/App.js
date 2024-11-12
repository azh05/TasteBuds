// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';  // If Login.js is in the components folder
import Signup from './pages/signup'; 
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <div>
        {/* Define Routes here */}
        <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path="/signup" element={<Signup />} /> {/* signup page route */}
        <Route path="/Login" element={<Login />} /> {/* signup page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;