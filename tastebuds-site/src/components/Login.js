import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../backend/firebase'; // Import the auth object
import '../App.css'; // Import CSS for external styling
import { useUser } from '../userinfo/UserContext';
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useUser();


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      // Handle authentication errors
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="div-container">
      <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link to='/'>
            <button className="login-button" type="submit">Log In</button>
        </Link>
      </form>
    </div>
    </div>
    
  );
}

export default Login;