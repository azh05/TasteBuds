// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './backend/firebase'; // Import the auth object


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      // Handle authentication errors
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;