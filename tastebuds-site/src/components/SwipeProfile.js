import React from "react";
import Watermelon from "../watermelon.jpg"
import American from "../american.jpg";
import Chinese from "../chinese.jpg";
import Indian from "../indian.jpg";
import Italian from "../italian.jpg";
import Japanese from "../japanese.jpg";
import Mexican from "../mexican.jpg";

import "../styles/swipe.css"
function SwipeProfile({ name, age, image, clickFunction, foodList, className }) {
    if(!Array.isArray(foodList)) {
        foodList = [ foodList ];
    }


    const pickPhoto = () =>{
        var favFood = foodList[0];
        switch(favFood){
            case "American":
              return American;
          
            case "Chinese":
              return Chinese;
          
            case "Indian":
              return Indian;
            
            case "Italian":
              return Italian;
      
            case "Japanese":
              return Japanese;
            
            case "Mexican":
              return Mexican;
            
            case "Other":
              return Watermelon;
            
            default:
              return Watermelon;
        };
      };
      

    return (
        <div className={`profile_container ${className}`}>
            <div className="profile_header">
                <h1>{name}</h1>
                <p>{age}</p>
            </div>
            <div className="profile">
                <img src={pickPhoto() || Watermelon} alt="Profile" />

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