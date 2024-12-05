import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';


function Recomend() {
    const { user } = useUser();
    const [favoriteCusine, setFavoriteCusine] = useState(null);
    const [userMatch, setUserMarch] = useState(null);
    const [recomendation, setRecomendation] = useState(null);
    const [profileData, setProfileData] = useState({
        profileName: '',
        age: '',
        gender: '',
        cuisine: [],
        bio: '',
        icon: '',
      });
      useEffect(() => {
        const allTags = ["Italian", "Indian", "Japanese", "American", "Other"];
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

    
    return (
        <div>
            <Navbar></Navbar>
            <div>Since you like {profileData.cuisine[0]} we recomend...
            </div>
        </div>
    );
};
  
export default Recomend;
