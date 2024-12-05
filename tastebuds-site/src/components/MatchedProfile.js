import React, { useState, useEffect } from 'react';
import '../App.css'; // Import CSS for external styling
import "../styles/swipe.css"
import "../styles/match.css"
import Watermelon from "../watermelon.jpg"
import American from "../american.jpg";
import Chinese from "../chinese.jpg";
import Indian from "../indian.jpg";
import Italian from "../italian.jpg";
import Japanese from "../japanese.jpg";
import Mexican from "../mexican.jpg";
import { BiFoodMenu } from 'react-icons/bi';


function MatchedProfile({name, age, food}) {

    const pickPhoto = () =>{
        var favFood = food[0];
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
        <div className="flex-container" style={{ height:"95px", width:"95%"}}>
            <div>
                <img className="profile-img" src={pickPhoto()} alt="Circle" style={{ marginRight:"20px" }}></img>

            </div>
            <div className="default" style={{ fontSize:"30px", marginRight:"20px"}}><b>{name}  {age}  </b> {food} </div>
            <div className="hover" style={{ fontSize:"30px", marginRight:"20px"}}><b>{mail} </b></div>
        </div>

    );
}

export default MatchedProfile