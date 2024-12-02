import React, { useState, useEffect } from 'react';

import "../styles/swipe.css"
import SwipeProfile from '../components/SwipeProfile';

// For user information
import { useUser } from '../userinfo/UserContext';

import { FaBars } from 'react-icons/fa';
import Navbar from '../components/NavigationBar';

const endpoint = "http://localhost:5001/user"


function SwipePage() {
    const { user } = useUser();

    const [profile, setProfile] = useState(
        { profileName: "", age: "", foodList: []}
    ); 

    const [isExiting, setIsExiting] = useState(false);
    const [clickDirection, setClickDirection] = useState("");

    // Recall: LEFT  = GOOD 
    //         RIGHT = BAD 
    // TODO: We want to update the current-user and the liked-user object in MongoDB
    //       so that the current-user object adds liked-user.id to their past_likes list
    //       and the liked-user object adds current-user.id to their liked_users list
    //       It should also update the current-user's past_unlikes list depending on what button is clicked
    
    const handleLike = async (isLeft) => {
        // console.log(user.email)
        if(!user) {
            return; 
        }
        const display_user = profile;
        const display_email = display_user.email;
        const user_email = user.email;
        
        const response = await fetch('http://localhost:5001/past_likes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              display_email,
              user_email,
              isLeft
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update likes.');
          }
    }

    const handleClick = (isLeft) => {
        if (isExiting) return;
        
        handleLike(isLeft);


        const direction = isLeft ? "left" : "right";
        setClickDirection(direction); 
        setIsExiting(true); // Start the exit animation

        setTimeout(() => {  
            fetch(`${endpoint}?email=${user.email}`)
                .then((response => response.json()))
                .then((data) => {
                    setProfile(data);
                })

            setIsExiting(false);
            setClickDirection("");
          }, 500); // Match this to animation duration

    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                handleClick(true); // Simulate left button click
            } else if (event.key === "ArrowRight") {
                handleClick(false); // Simulate right button click
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        }, [])

    useEffect(() => {
        fetch(endpoint)
                .then((response => response.json()))
                .then((data) => {
                    setProfile(data);
                })
    }, []);

    return ( 
<<<<<<< HEAD
        <div>
            <Navbar></Navbar>
            <div className="swipe_page_container">
                { 
                <SwipeProfile name={profile.profileName} 
                    age={profile.age} 
                    foodList={profile.cuisine}
                    clickFunction={handleClick}
                    className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
                    />
=======
        
        <div className="swipe_page_container">
            { user ? 
            <SwipeProfile name={profile.profileName} 
                age={profile.age} 
                foodList={profile.cuisine}
                clickFunction={handleClick}
                className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
                /> :
                <div>Must be Logged In</div>
>>>>>>> d2c6e4673ec1ae0e2c5d9a754b559f9663c4e042

                }       
            </div>
        </div>
    );
}

export default SwipePage;