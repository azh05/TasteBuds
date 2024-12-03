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
<<<<<<< HEAD
      <p className="home-text">
        Temp hyperlink to scrolling page{' '}
        <Link className="home-link" to="/scroll">
          Here!
        </Link>
      </p>
      <p className="home-text">
        Temp hyperlink to matching page{' '}
        <Link className="home-link" to="/match">
          Here!
        </Link>
      </p>
      <p className="home-text">
        Temp hyperlink to resturant page{' '}
        <Link className="home-link" to="/resturant">
          Here!
        </Link>
      </p>
=======
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
>>>>>>> 877eeca6e79315e0956df87988fad6a7febda913
    </div>
  );
}

export default HomePage;