import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling

function ScrollPage() {
  return (
    <div className="scroll-container">
      <h1 className="scroll-title">Get to scrolling motha focka</h1>
      <button className="arrow-button left-arrow">{"<"}</button>
      <div className="profile-placeholder"></div>
      <button className="arrow-button right-arrow">{">"}</button>
    </div>
  );
}

export default ScrollPage;