import React, { useState } from 'react';
import '../App.css'; // Import CSS for external styling
import "../styles/swipe.css"
import "../styles/match.css"
import Watermelon from "../watermelon.jpg"


function MatchedProfile({name, age, food}) {
    return (
        <div className="flex-container" style={{ height:"95px", width:"95%"}}>
            <div>
                <img className="profile-img" src={Watermelon} alt="Circle" style={{ marginRight:"20px" }}></img>

            </div>
            <div style={{ fontSize:"30px", marginRight:"20px"}}><b>{name}  {age}  </b></div>
                <p>{food}</p>

        </div>

    );
}

export default MatchedProfile