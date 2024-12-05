import React, { useState, useEffect } from "react";
import "../styles/swipe.css";
import SwipeProfile from "../components/SwipeProfile";
import { useUser } from "../userinfo/UserContext";
import zipcodes from "zipcodes";
import Navbar from "../components/navigationbar";

const SwipePage = () => {
  const { user } = useUser();
  const [profiles, setProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [isExiting, setIsExiting] = useState(false);
  const [clickDirection, setClickDirection] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all user profiles when the component mounts
useEffect(() => {
    if(!user) {
        return;
    }
  fetch("http://localhost:5001/all_users") // Ensure this matches your backend URL
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      if (Array.isArray(users)) {
        // Filter out the current user's profile
        const filteredUsers = users.filter((profile) => profile.email !== user.email);

        setAllProfiles(filteredUsers); // Store all other profiles
        setProfiles(filteredUsers); // Display all other profiles initially

        // Extract unique cities for the dropdown (including "All")
        const uniqueCities = [
          "All",
          ...new Set(filteredUsers.map((user) => getCityFromZip(user.zipCode))),
        ];
        setCities(uniqueCities);
      } else {
        console.error("Invalid data format:", users);
      }
    })
    .catch((error) => {
      console.error("Error fetching profiles:", error);
    });
}, [user]);


  // Get city from zip code
  const getCityFromZip = (zipCode) => {
    if (!zipCode) return "No city provided";
    const location = zipcodes.lookup(zipCode);
    return location ? location.city : "No city provided";
  };

  // Handle city filter changes
  const handleCityChange = (event) => {
    const selected = event.target.value;
    setSelectedCity(selected);

    const filteredProfiles =
      selected === "All"
        ? allProfiles
        : allProfiles.filter((profile) => getCityFromZip(profile.zipCode) === selected);

    setProfiles(filteredProfiles);
    setCurrentIndex(0);
  };

  // Handle like or dislike
  const handleLike = async (isLeft) => {
    if (!user || currentIndex >= profiles.length) return;

    const currentProfile = profiles[currentIndex];

    try {
      const response = await fetch("http://localhost:5001/past_likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_email: currentProfile.email,
          user_email: user.email,
          isLeft,
        }),
      });

      if (!response.ok) throw new Error(`Failed to update likes. Status: ${response.status}`);
    } catch (error) {
      console.error("Error in handleLike:", error);
    }
  };

  const handleClick = (isLeft) => {
    if (isExiting || profiles.length === 0) return;
  
    handleLike(isLeft);
    setClickDirection(isLeft ? "left" : "right");
    setIsExiting(true);
  
    setTimeout(() => {
      setProfiles((prevProfiles) => {
        const updatedProfiles = [...prevProfiles];
  
        if (isLeft) {
          // Remove the current profile
          updatedProfiles.splice(currentIndex, 1);
        }
  
        // Adjust index after the profile is removed or moved
        const newIndex =
          isLeft
            ? Math.min(currentIndex, updatedProfiles.length - 1) // Stay within bounds after removal
            : (currentIndex + 1) % updatedProfiles.length; // Move to the next profile or loop
  
        setCurrentIndex(updatedProfiles.length > 0 ? newIndex : 0); // Reset index if no profiles left
  
        return updatedProfiles;
      });
  
      setIsExiting(false);
      setClickDirection("");
    }, 400); // Match this to animation duration
  };  
  

  // Listen for arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handleClick(true);
      if (event.key === "ArrowRight") handleClick(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isExiting]);

  const availableProfilesCount = profiles.length;

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="not-logged-in">
          <div>Must be Logged In</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="swipe_page_container">
        <div className="city-dropdown">
          <label htmlFor="cityFilter">Filter by City:</label>
          <select id="cityFilter" value={selectedCity} onChange={handleCityChange}>
            {cities.map((city, index) => (
              <option key={`${city}-${index}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="available-profiles-count">
          <p>Available profiles: {availableProfilesCount}</p>
        </div>

        <div className="swipe-container">
          {availableProfilesCount > 0 ? (
            <SwipeProfile
            name={profiles[currentIndex]?.profileName || "Unknown"}
            age={profiles[currentIndex]?.age || "N/A"}
            foodList={profiles[currentIndex]?.cuisine || []}
            clickFunction={handleClick}
            className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
            />
          ) : (
            <p>No profiles available for the selected city.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipePage;