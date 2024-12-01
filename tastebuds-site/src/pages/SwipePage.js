import React, { useState, useEffect } from "react";
import "../styles/swipe.css";
import SwipeProfile from "../components/SwipeProfile"; // Assuming this component handles the profile UI
import { useUser } from "../userinfo/UserContext"; // To get the current user information

const SwipePage = () => {
  const { user } = useUser(); // Current user info
  const [profiles, setProfiles] = useState([]); // Profiles displayed in the swipe view
  const [allProfiles, setAllProfiles] = useState([]); // All profiles fetched from the backend
  const [zipCodes, setZipCodes] = useState([]); // Unique zip codes for the dropdown
  const [selectedZipCode, setSelectedZipCode] = useState("All"); // Dropdown selection
  const [isExiting, setIsExiting] = useState(false); // For exit animation
  const [clickDirection, setClickDirection] = useState(""); // Direction of swipe (left or right)
  const [currentIndex, setCurrentIndex] = useState(0); // For tracking the current profile index

  // Fetch all user profiles when the component mounts
  useEffect(() => {
    fetch("http://localhost:5001/all_users") // Ensure this matches your backend URL
      .then((response) => response.json())
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
      const filteredProfiles = allProfiles.filter(
        (profile) => profile.zipCode === selected
      );
      setProfiles(filteredProfiles); // Show only profiles with the selected zip code
    }
  };

  const handleLike = async (isLeft) => {
    if (!user) return;
    const display_user = profiles[currentIndex];
    const display_email = display_user.email;
    const user_email = user.email;

    const response = await fetch("http://localhost:5001/past_likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        display_email,
        user_email,
        isLeft,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update likes.");
    }
  };

  const handleClick = (isLeft) => {
    if (isExiting || currentIndex >= profiles.length) return;

    handleLike(isLeft);
    const direction = isLeft ? "left" : "right";
    setClickDirection(direction);
    setIsExiting(true);

    setTimeout(() => {
      if (currentIndex + 1 < profiles.length) {
        setCurrentIndex(currentIndex + 1); // Move to the next profile
      }
      setIsExiting(false);
      setClickDirection("");
    }, 400); // Match this to animation duration
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handleClick(true); // Simulate left button click
      } else if (event.key === "ArrowRight") {
        handleClick(false); // Simulate right button click
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, isExiting]);

  // Get the number of profiles for the selected zip code
  const availableProfilesCount = selectedZipCode === "All" 
    ? profiles.length 
    : profiles.filter((profile) => profile.zipCode === selectedZipCode).length;

  return (
    <div className="swipe_page_container">
      {/* Dropdown for filtering by zip code */}
      <div className="zip-code-dropdown">
        <label htmlFor="zipCodeFilter">Filter by Zip Code:</label>
        <select id="zipCodeFilter" value={selectedZipCode} onChange={handleZipCodeChange}>
          {zipCodes.map((zip) => (
            <option key={zip} value={zip}>
              {zip}
            </option>
          ))}
        </select>
      </div>

      {/* Display number of profiles for selected zip code */}
      <div className="available-profiles-count">
        <p>Available profiles: {availableProfilesCount}</p>
      </div>

      {/* Swipe view for profiles */}
      <div className="swipe-container">
        {profiles.length > 0 && (
          <SwipeProfile
            name={profiles[currentIndex]?.profileName}
            age={profiles[currentIndex]?.age}
            foodList={profiles[currentIndex]?.cuisine}
            clickFunction={handleClick}
            className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
          />
        )}
      </div>
    </div>
  );
};

export default SwipePage;