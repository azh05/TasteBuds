import React from 'react';
import "../styles/navigationbar.css"
import { useUser } from '../userinfo/UserContext';

function Navbar () {

    const { user, setUser } = useUser(); // Ensure you destructure correctly

    const handleLogout = () => {
        console.log("Logged Out")
        setUser(null); // Clear user from context and localStorage
    };

  return (

<nav className="navbar">
  <div className="navbar-left">
    <p className="logo">
      TasteBuds
    </p>
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
        <a href="/recommend">recommend a resturant</a>
      </li>
      <div onClick={handleLogout}> 
        <li>
            <a href="/">Logout</a>
        </li>
      </div>
    </ul>
  </div>
</nav>
);
};

export default Navbar;