import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS for external styling
import '../styles/match.css';
import MatchedProfile from '../components/MatchedProfile';

function Match() {
    return (
        <div className="match-page-total">
            <h1 className="match-title" >Matches</h1>
        <div className="horizontal-line" ></div>
        <div className = "match-container">
            <MatchedProfile/>
        </div>
        </div>
        
    )
}

export default Match;