import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling

function HomePage() {
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
      <p className="home-text">
        Temp hyperlink to scrolling page{' '}
        <Link className="home-link" to="/scroll">
          Here!
        </Link>
      </p>
      <p className="home-text">
        Temp hyperlink to profile page{' '}
        <Link className="home-link" to= "/profile">
          Here!
        </Link>
      </p>
    </div>
  );
}

export default HomePage;
