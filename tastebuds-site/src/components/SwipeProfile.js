import React from "react";
import Watermelon from "../watermelon.jpg"

import "../styles/swipe.css"
function SwipeProfile({ name, age, image, clickFunction, foodList, className }) {
    if(!Array.isArray(foodList)) {
        foodList = [ foodList ];
    }

    return (
        <div className={`profile_container ${className}`}>
            <div className="profile_header">
                <h1>{name}</h1>
                <p>{age}</p>
            </div>
            <div className="profile">
                <img src={image || Watermelon} alt="Profile" />

                <button onClick={() => clickFunction(true)} className="button good">✅</button>
                <button onClick={() => clickFunction(false)} className="button bad">❌</button>

                { 
                    foodList[0] && (<div className="food-list">
                        {foodList.map((food, index) => (
                            <p key={index} className="food-item">{food}</p>
                        ))}
                    </div>)
                }
                
            </div>
        </div>
    );
}

export default SwipeProfile;