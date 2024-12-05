import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';


function Recommend(user2) {
    const { user } = useUser();
    const [favoriteCusine, setFavoriteCusine] = useState(null);
    const [userMatch, setUserMarch] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [cuisine, setCuisine] = useState('');
    const restaurants = {
      Italian: ["Enzo's Pizzeria", "Olive Garden", "Prince of Venice", "California Pizza Kitchen", "Maggiano's Little Italy", "Epicuria"],
      Chinese: ["Din Tai Fung", "Panda Express", "Golden Chopsticks", "P.F. Chang's", "Benihana", "Rendevous East"],
      American: ["In-And-Out", "Cracker Barrel", "Texas Roadhouse", "McDonald's", "KFC"],
      Indian: ["Bollywood Kitchen", "Downtown Dhaba", "Bollywood Bites", "Maharaja Cuisine"],
      Japanese: ["Nobu", "Gyu-Kaku", "Kura Sushi", "Marugame Udon", "Matsunoya Tonkatsu", "Coco Ichibanya", "Noma Sushi", "Midoh"],
      Mexican: ["Taco Bell", "Del Taco", "Chipotle", "El Pollo Loco", "Wahoo's Fish Taco", "Rubio's Coastal Grill"],
      Other: ["Lee's Sandwich", "Jersey Mike's Subs", "Chuck E. Cheese", "Shakey's Pizza"],
    };
    
    // State to keep track of the current restaurant
    const [restaurant, setRestaurant] = useState("Click the button to pick a restaurant!");
    const [message, setMessage] = useState("No restaurant found!")

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

      const getRandomRestaurant = () => {
        // Pick a random cuisine from user's preferences
        const randomCuisine = profileData.cuisine[Math.floor(Math.random() * profileData.cuisine.length)];
        // Pick a random restaurant from the selected cuisine
        const randomRestaurant = restaurants[randomCuisine][Math.floor(Math.random() * restaurants[randomCuisine].length)];
        // Update the state
        setRestaurant(randomRestaurant);
        setRecommendation(randomCuisine);
      }



    return (
    <div>
      <Navbar></Navbar>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Restaurant Recommendation</h1>
      <button onClick={getRandomRestaurant} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Recomend me another restaurant
      </button>
      <p>Since you liked {recommendation} we recomend {restaurant}</p>
    </div>
    </div>
    );
}
  
export default Recommend;
