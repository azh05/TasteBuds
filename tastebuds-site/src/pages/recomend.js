import { useUser } from "../userinfo/UserContext";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navigationbar";
import { Link } from 'react-router-dom';


function Recomend() {
    const { user } = useUser();
    const [profiles, setProfiles] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
      // Fetch all user profiles when the component mounts
useEffect(() => {
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
        } else {
          console.error("Invalid data format:", users);
        }
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, [user.email]);

  

    return (
        <div>
            <Navbar></Navbar>
        </div>
    );
};
  
export default Recomend;
