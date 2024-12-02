import React from 'react';
import "../styles/navigationbar.css"

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      TasteBuds
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/profile">Edit my profile</a>
      </li>
      <li>
        <a href="/match">View my matches</a>
      </li>
      <li>
        <a href="/scroll">Swipe on Profiles</a>
      </li>
      <li>
        <a href="/Logout">Logout</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;