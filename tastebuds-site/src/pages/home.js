import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling
import Logout from '../components/Logout';

function HomePage() {
  const [watermelons, setWatermelons] = useState([]);

  useEffect(() => {
    // Generate watermelons periodically
    const interval = setInterval(() => {
      setWatermelons((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100, // Random position across the width
        },
      ]);
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to TasteBuds</h1>
      <p className="home-text">
        Log in{' '}
        <Link className="home-link" to="/Login">
          Here!
        </Link>
      </p>
      <p className="home-text">
        Don't have an account? Sign up{' '}
        <Link className="home-link" to="/signup">
          Here!
        </Link>
      </p>
      {/* Watermelon emojis */}
      <div className="watermelon-container">
        {watermelons.map((watermelon) => (
          <span
            key={watermelon.id}
            className="watermelon"
            style={{ left: `${watermelon.left}%` }}
          >
            🍉
          </span>
        ))}
      </div>
    </div>
  );
}

export default HomePage;