// src/App.js
import React from 'react';
import './App.css';
import Login from './components/Login';  // If Login.js is in the components folder

function App() {
  return (
    <div className="App">
      <h1>Welcome to TasteBuds</h1>
      <Login /> {/* Render the Login component */}
    </div>
  );
}

export default App;