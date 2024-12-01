import React, { useState, useEffect } from "react";

const SwipePage = () => {
  const [profiles, setProfiles] = useState([]); // Profiles displayed in the swipe view
  const [allProfiles, setAllProfiles] = useState([]); // All profiles fetched from the backend
  const [zipCodes, setZipCodes] = useState([]); // Unique zip codes for the dropdown
  const [selectedZipCode, setSelectedZipCode] = useState("All"); // Dropdown selection

  // Fetch all user profiles when the component mounts
  useEffect(() => {
    fetch("http://localhost:5001/all_users") // Ensure this matches your backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        setAllProfiles(users); // Store all profiles
        setProfiles(users); // Display all profiles initially
        // Extract unique zip codes for the dropdown
        const uniqueZipCodes = ["All", ...new Set(users.map((user) => user.zipCode))];
        setZipCodes(uniqueZipCodes);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  // Handle zip code selection
  const handleZipCodeChange = (event) => {
    const selected = event.target.value;
    setSelectedZipCode(selected);
    if (selected === "All") {
      setProfiles(allProfiles); // Reset to show all profiles
    } else {
      const filteredProfiles = allProfiles.filter((profile) => profile.zipCode === selected);
      setProfiles(filteredProfiles); // Show only profiles with the selected zip code
    }
  };

  return (
    <div>
      <h1>Swipe Profiles</h1>
      {/* Dropdown for filtering by zip code */}
      <label htmlFor="zipCodeFilter">Filter by Zip Code:</label>
      <select id="zipCodeFilter" value={selectedZipCode} onChange={handleZipCodeChange}>
        {zipCodes.map((zip) => (
          <option key={zip} value={zip}>
            {zip}
          </option>
        ))}
      </select>
      {/* Swipe view */}
      <div className="swipe-container">
  {profiles.map((profile, index) => (
    <div key={`${profile.email}-${index}`} className="profile-card">
      <img src={profile.photo} alt={profile.profileName} />
      <h3>{profile.profileName}</h3>
      <p>{profile.zipCode}</p>
      <p>{profile.cuisine}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default SwipePage;
