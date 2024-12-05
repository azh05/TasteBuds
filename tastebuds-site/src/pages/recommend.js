import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';


function Recommend(user2) {
    const { user } = useUser();
    const [MoreRec, setMoreRec] = useState("a");
    const [message, setMessage] = useState("Click the button to pick a restaurant!");
    const [match, setMatchName] = useState({
      profileName: '',
    });
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Array of strings
        const [selectedOption, setSelectedOption] = useState(""); // State to store selected option
    const restaurants = {
      Italian: ["Enzo's Pizzeria", "Olive Garden", "Prince of Venice", "California Pizza Kitchen", "Maggiano's Little Italy", "Epicuria"],
      Chinese: ["Din Tai Fung", "Panda Express", "Golden Chopsticks", "P.F. Chang's", "Benihana", "Rendevous East"],
      American: ["In-And-Out", "Cracker Barrel", "Texas Roadhouse", "McDonald's", "Denny's", "Rocco's"],
      Indian: ["Bollywood Kitchen", "Downtown Dhaba", "Bollywood Bites", "Maharaja Cuisine"],
      Japanese: ["Nobu", "Gyu-Kaku", "Kura Sushi", "Marugame Udon", "Matsunoya Tonkatsu", "Coco Ichibanya", "Noma Sushi", "Midoh"],
      Mexican: ["Taco Bell", "Del Taco", "Chipotle", "El Pollo Loco", "Wahoo's Fish Taco", "Rubio's Coastal Grill", "Rendevous West"],
      Other: ["Lee's Sandwich", "Jersey Mike's Subs", "Chuck E. Cheese", "Shakey's Pizza", "KFC", "De Neve", "The Drey", "Bruin Cafe"],
    };
    
    // State to keep track of the current restaurant
    const [restaurant, setRestaurant] = useState("Click the button to pick a restaurant!");

    const [profileData, setProfileData] = useState({
        profileName: '',
        age: '',
        gender: '',
        cuisine: [],
        bio: '',
        icon: '',
        who_liked: [],
      });
      useEffect(() => {
        // Fetch profile data
        const fetchProfile = async () => {
          try {
            const email = user.email;
            const response = await fetch(`http://localhost:5001/profile?email=${email}`);
            console.log("fetched user from backend API")
            if (!response.ok) {
              throw new Error('Failed to fetch profile');
            }
            const data = await response.json();  // Parse the response as JSON
            setProfileData((prev) => ({
              ...data,
            }));
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }
        if (user) {
          fetchProfile();
        }}, [user]
      );

      const fetchName = async (matchEmail) => {
        try {
          const response = await fetch(`http://localhost:5001/profile?email=${matchEmail}`);
          if (!response.ok) {
            throw new Error("fetch failed");
          }
          const data = await response.json();
          setMatchName(data.profileName);
        } catch(err) {
          console.log(err);
        }
      }


      

      const getRandomRestaurant = () => {
        // Pick a random cuisine from user's preferences
        const randomCuisine = profileData.cuisine[Math.floor(Math.random() * profileData.cuisine.length)];
        // Pick a random restaurant from the selected cuisine
        const randomRestaurant = restaurants[randomCuisine][Math.floor(Math.random() * restaurants[randomCuisine].length)];
        // Update the state
        fetchName(match);
        setMessage("Since you and " + match + " liked " + randomCuisine + " we recommend " + randomRestaurant);
        setMoreRec("another");
      }

      const handleChange = (event) => {
        setMatchName(event.target.value); // Update state with selected option
        setSelectedOption(event.target.value);
      };


    return (
    <div>
      <Navbar></Navbar>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select an match to eat out with</h1>
      <select value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          -- Select an match --
        </option>
        {profileData.who_liked.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
      <h1>Restaurant Recommendation</h1>
      <button onClick={getRandomRestaurant} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Recommend me {MoreRec} restaurant
      </button>
      <p>{message}</p>
    </div>
    </div>
        );
}
  
export default Recommend;
