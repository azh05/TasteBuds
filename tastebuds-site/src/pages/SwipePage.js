import React, { useState, useEffect } from "react";
import "../styles/swipe.css";
import SwipeProfile from "../components/SwipeProfile"; // Assuming this component handles the profile UI
import { useUser } from "../userinfo/UserContext"; // To get the current user information
import zipcodes from "zipcodes"; // Using the zipcodes package for city lookup
import Navbar from '../components/navigationbar';

const SwipePage = () => {
  const { user } = useUser(); // Current user info
  const [profiles, setProfiles] = useState([]); // Profiles displayed in the swipe view
  const [allProfiles, setAllProfiles] = useState([]); // All profiles fetched from the backend
  const [cities, setCities] = useState([]); // Unique cities for the dropdown
  const [selectedCity, setSelectedCity] = useState("All"); // Dropdown selection
  const [isExiting, setIsExiting] = useState(false); // For exit animation
  const [clickDirection, setClickDirection] = useState(""); // Direction of swipe (left or right)
  const [currentIndex, setCurrentIndex] = useState(0); // For tracking the current profile index

  const [profile, setProfile] = useState(
    { profileName: "", age: "", foodList: []}
); 

  // Fetch all user profiles when the component mounts
  useEffect(() => {
    fetch("http://localhost:5001/all_users") // Ensure this matches your backend URL
      .then((response) => response.json())
      .then((users) => {
        setAllProfiles(users); // Store all profiles
        setProfiles(users); // Display all profiles initially

        // Extract unique cities for the dropdown (including "All")
        const uniqueCities = ["All", ...new Set(users.map((user) => getCityFromZip(user.zipCode)))];
        setCities(uniqueCities);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  // Set first user
    useEffect(() => {
        fetch(`http://localhost:5001/user?email=${user.email}`)
                .then((response => response.json()))
                .then((data) => {
                    setProfile(data);
                })
    }, []);

  // Function to get city from zip code using the zipcodes library
  const getCityFromZip = (zipCode) => {
    const location = zipcodes.lookup(zipCode);
    return location ? location.city : "No city provided";
  };

  // Handle city selection
  const handleCityChange = (event) => {
    const selected = event.target.value;
    setSelectedCity(selected);

    let filteredProfiles = [];
    if (selected === "All") {
      filteredProfiles = allProfiles;
    } else {
      filteredProfiles = allProfiles.filter(
        (profile) => getCityFromZip(profile.zipCode) === selected
      );
    }

    setProfiles(filteredProfiles); // Update displayed profiles

    fetch(`http://localhost:5001/user?email=${user.email}&selected_city=${selected}`)
            .then((response => response.json()))
            .then((data) => {
                setProfile(data);
            });
  };

  const handleLike = async (isLeft) => {
    if (!user || currentIndex >= profiles.length) return; // Prevent issues with invalid indexes
    const display_user = profile;
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
      console.error("Failed to update likes.");
    }
  };

  const handleClick = (isLeft) => {
    if (isExiting || currentIndex >= profiles.length) return; // Prevent swiping beyond the last profile

    handleLike(isLeft);
    const direction = isLeft ? "left" : "right";
    setClickDirection(direction);
    setIsExiting(true);

    setTimeout(() => {
      
        fetch(`http://localhost:5001/user?email=${user.email}&selected_city=${selectedCity}`)
            .then((response => response.json()))
            .then((data) => {
                setProfile(data);
            });

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

  // Get the number of profiles for the selected city
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
    <Navbar></Navbar>
    <div className="swipe_page_container">
      {/* Dropdown for filtering by city */}
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

      {/* Display number of profiles for selected city */}
      <div className="available-profiles-count">
        <p>Available profiles: {availableProfilesCount}</p>
      </div>

      {/* Swipe view for profiles */}
      <div className="swipe-container">
        {availableProfilesCount > 0 && profile ? (
          <SwipeProfile
            name={profile.profileName}
            age={profile.age}
            foodList={profile.cuisine}
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