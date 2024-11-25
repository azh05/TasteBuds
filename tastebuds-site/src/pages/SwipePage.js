import React, { useState, useEffect } from 'react';

import "../styles/swipe.css"
import SwipeProfile from '../components/SwipeProfile';

const endpoint = "http://localhost:5001/users"

function SwipePage() {
    const [profiles, setProfiles] = useState([]); // Store the list of profiles
    const [selectedZip, setSelectedZip] = useState(''); // Zip code selection
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error handling
  
    // Sample profiles with zip codes
    const sampleProfiles = [
      { profileName: 'Alex', zipCode: '10001', age: 28, gender: 'Male', cuisine: 'Italian', photo: 'https://via.placeholder.com/150' },
      { profileName: 'Peter', zipCode: '90210', age: 35, gender: 'Male', cuisine: 'Japanese', photo: 'https://via.placeholder.com/150' },
      { profileName: 'Sophia', zipCode: '60614', age: 24, gender: 'Female', cuisine: 'Mexican', photo: 'https://via.placeholder.com/150' },
      { profileName: 'Emily', zipCode: '30301', age: 30, gender: 'Female', cuisine: 'Indian', photo: 'https://via.placeholder.com/150' },
      { profileName: 'James', zipCode: '80202', age: 40, gender: 'Male', cuisine: 'Thai', photo: 'https://via.placeholder.com/150' },
    ];
  
    // Extract unique zip codes for dropdown
    const uniqueZipCodes = [...new Set(sampleProfiles.map(profile => profile.zipCode))];
  
    const handleSearch = (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      if (!selectedZip) {
        setError('Please select a zip code');
        setLoading(false);
        return;
      }
  
      // Filter profiles by selected zip code
      const filteredProfiles = sampleProfiles.filter(profile => profile.zipCode === selectedZip);
  
      setProfiles(filteredProfiles);
      setLoading(false);
    };
  
    return (
      <div className="container">
        <h1>Search Profiles</h1>
  
        {/* Filter Form */}
        <form onSubmit={handleSearch}>
          <label>
            Select Zip Code:
            <select value={selectedZip} onChange={(e) => setSelectedZip(e.target.value)} required>
              <option value="">Select Zip Code</option>
              {uniqueZipCodes.map(zip => (
                <option key={zip} value={zip}>
                  {zip}
                </option>
              ))}
            </select>
          </label>
  
          <button type="submit">Search</button>
        </form>
  
        {/* Loading State */}
        {loading && <p className="loading">Loading profiles...</p>}
  
        {/* Error Message */}
        {error && <p className="error">{error}</p>}
  
        {/* Profile List */}
        <div className="profile-list">
          <h2>Filtered Profiles</h2>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <div key={index} className="profile-card">
                <h3>{profile.profileName || 'Unnamed Profile'}</h3>
                <p>Zip Code: {profile.zipCode}</p>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                <p>Cuisine Preference: {profile.cuisine}</p>
              </div>
            ))
          ) : (
            <p>No profiles found for the selected zip code.</p>
          )}
        </div>
      </div>
    );
  }
  
  export default SwipePage;