import React, { useState, useEffect } from 'react';

import "../styles/swipe.css"
import SwipeProfile from '../components/SwipeProfile';

// For user information
import { useUser } from '../userinfo/UserContext';

const endpoint = "http://localhost:5001/users"


function SwipePage() {
    const { user } = useUser();

    const [profiles, setProfiles] = useState([ 
        { profileName: "", age: "", foodList: []},
        { profileName: "Peter", age: 24, foodList: ["Italian", "Wine"] }, 
        { profileName: "Sharon", age: 37, foodList: ["Mexican"] }, 
        { profileName: "Min", age: 12, foodList: ["Food"] },
        { profileName: "Gao", age: 44, foodList: ["Beverage"] },
        { profileName: "David", age: 89, foodList: ["Orange"]},
        { profileName: "Orange", age: 11, foodList: ["Ham", "Burger"] }
    ]); 

    const [index, setIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [clickDirection, setClickDirection] = useState("");

    // Recall: LEFT  = GOOD 
    //         RIGHT = BAD 
    // TODO: We want to update the current-user and the liked-user object in MongoDB
    //       so that the current-user object adds liked-user.id to their past_likes list
    //       and the liked-user object adds current-user.id to their liked_users list
    //       It should also update the current-user's past_unlikes list depending on what button is clicked
    
    const handleLike = async (isLeft) => {
        const display_user = profiles[index];
        const display_email = display_user.email;

        const user_email = user.email;
        console.log(user_email);
        
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
            throw new Error('Failed to update likes the user.');
          }
    }

    const handleClick = (isLeft) => {
        if (isExiting) return;
        
        handleLike(isLeft);


        const direction = isLeft ? "left" : "right";
        setClickDirection(direction); 
        setIsExiting(true); // Start the exit animation


        setTimeout(() => {  
            setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
            setIsExiting(false);
            setClickDirection("");
          }, 400); // Match this to animation duration

    }

    useEffect(() => {
        fetch(endpoint)
            .then((response => response.json()))
            .then((data) => {
                setProfiles(data);
            })
    }, []);

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

    return ( 
        
        <div className="swipe_page_container">
            { 
            <SwipeProfile name={profiles[index].profileName} 
                age={profiles[index].age} 
                foodList={profiles[index].cuisine}
                clickFunction={handleClick}
                className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
                />

            }       
                
        </div>
    );
}

export default SwipePage;