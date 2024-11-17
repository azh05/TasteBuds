import React, { useState, useEffect } from 'react';

import "../styles/swipe.css"
import SwipeProfile from '../components/SwipeProfile';


function SwipePage() {
    const [profiles, setProfiles] = useState([ 
        { name: "Peter", age: 24, foodList: ["Italian", "Wine"] }, 
        { name: "Sharon", age: 37, foodList: ["Mexican"] }, 
        { name: "Min", age: 12, foodList: ["Food"] },
        { name: "Gao", age: 44, foodList: ["Beverage"] },
        { name: "David", age: 89, foodList: ["Orange"]},
        { name: "Orange", age: 11, foodList: ["Ham", "Burger"] }
    ]); 

    const [index, setIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [clickDirection, setClickDirection] = useState("");

    const handleClick = (isLeft) => {
        if (isExiting) return;

        const direction = isLeft ? "left" : "right";
        setClickDirection(direction); 
        setIsExiting(true); // Start the exit animation


        setTimeout(() => {  
            setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
            setIsExiting(false);
            setClickDirection("");
          }, 300); // Match this to animation duration

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

    return ( 
        
        <div className="swipe_page_container">

            <SwipeProfile name={profiles[index].name} 
                age={profiles[index].age} 
                foodList={profiles[index].foodList}
                clickFunction={handleClick}
                className={`object ${isExiting ? `exit-${clickDirection}` : "enter"}`}
                />

            
                
        </div>
    );
}

export default SwipePage;