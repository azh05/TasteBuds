import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';


function Recomend() {
    const { user } = useUser();
    const [favoriteCusine, setFavoriteCusine] = useState(null);
    const [userMatch, setUserMarch] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [cuisine, setCuisine] = useState('');
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
        }}, [user]);

        const handleCuisineChange = (event) => {
            const selectedCuisine = profileData.cuisine[0];
            setCuisine(selectedCuisine);
        
            switch (selectedCuisine) {
              case 'italian':
                setRecommendation('Olive Garden');
                break;
              case 'chinese':
                setRecommendation('Panda Express');
                break;
              case 'american':
                setRecommendation('Hamburgers');
                break;
              default:
                setRecommendation('');
            }
          };


    return (
    <div className="Recomend">
        <Navbar></Navbar>
        <h1>Restaurant Recommendation</h1>
        <p>Select your favorite cuisine:</p>
        <select value={cuisine} onChange={handleCuisineChange}>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="american">American</option>
        </select>
        {recommendation && (
          <div>
            <h2>We Recommend:</h2>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    );
}
  
export default Recomend;
