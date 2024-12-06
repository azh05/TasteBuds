import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';
import "../styles/recommend.css"


function Recommend(user2) {
    const { user } = useUser();
    const [MoreRec, setMoreRec] = useState("a");
    const [message, setMessage] = useState("Click the button to pick a restaurant!");
    const [names, setNames] = useState([]);
    const [match, setMatchName] = useState({
      profileName: '',
      cuisine: '',
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

      useEffect(() => {
        if (profileData.who_liked.length > 0) {
          emailtoName();
        }
      }, [profileData.who_liked]);

      useEffect(() => {
        if (selectedOption) {
          const selectedMatch = names.find(option => option.profileName === selectedOption);
          if (selectedMatch) {
            setMatchName({
              profileName: selectedMatch.profileName,
              cuisine: selectedMatch.cuisine,  // Ensure `cuisine` is correctly populated
            });
          }
        }
      }, [selectedOption, names]);
      
      const fetchName = async (matchEmail) => {
        try {
          const response = await fetch(`http://localhost:5001/profile?email=${matchEmail}`);
          if (!response.ok) {
            throw new Error("Failed to fetch name");
          }
          const data = await response.json();
          return { profileName: data.profileName, cuisine: data.cuisine }; // Return the name and cuisine
        } catch (err) {
          console.error("Error fetching name:", err);
          return { profileName: '', cuisine: [] }; // Return empty data in case of error
        }
      };
      
      
      
      const emailtoName = async () => {
        console.log("Fetching names from emails...");
        try {
          const fetchedNames = await Promise.all(
            profileData.who_liked.map(async (email) => {
              const matchData = await fetchName(email);
              return {
                profileName: matchData.profileName,
                cuisine: matchData.cuisine,
              };
            })
          );
          setNames(fetchedNames); // Update the state with the array of name and cuisine objects
        } catch (error) {
          console.error("Error fetching names:", error);
        }
      };


      

      const getRandomRestaurant = () => {
        if (!selectedOption) {
          setMessage("Please select a match first!");
          return;
        }
      
        // Assuming `match` contains the selected match's profile data
        const matchCuisines = match.cuisine || []; // Fallback in case `cuisine` isn't defined
        const userCuisines = profileData.cuisine || [];

        
        // Find common cuisines between user and the selected match
        const commonCuisines = userCuisines.filter(cuisine =>
          matchCuisines.includes(cuisine)
        );
      
        // If there are no common cuisines, show a message
        if (commonCuisines.length === 0) {
          setMessage(`You and ${selectedOption} don't have any common cuisines! Try another match.`);
          return;
        }
      
        // Pick a random cuisine from the common cuisines
        const randomCuisine = commonCuisines[Math.floor(Math.random() * commonCuisines.length)];
      
        // Pick a random restaurant from the selected cuisine
        const randomRestaurant =
          restaurants[randomCuisine][Math.floor(Math.random() * restaurants[randomCuisine].length)];
      
        // Update the message
        setMessage(
          `Since you and ${selectedOption} both like ${randomCuisine}, we recommend ${randomRestaurant}!`
        );
        setMoreRec("another");
      };
      

      const handleChange = (event) => {
        setMatchName(event.target.value); // Update state with selected option
        setSelectedOption(event.target.value);
      };


    return (
    <div>
      <Navbar></Navbar>
      <div  className ="recommender" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select an match to eat out with</h1>
      <select className = "selector" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          -- Select an match --
        </option>
        {names.map((option, index) => (
          <option key={index} value={option.profileName}>
            {option.profileName}
          </option>
        ))}
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
      <h1>Restaurant Recommendation</h1>
      <div className="button-container">
      <button  className = "Recbutton"onClick={getRandomRestaurant} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Recommend me {MoreRec} restaurant
      </button>
      </div>
      <p>{message}</p>
    </div>
    </div>
        );
}
  
export default Recommend;
