import React from "react";
import Watermelon from "../watermelon.jpg"

import "../styles/swipe.css"

function SwipeProfile( { name, age } ) {
    return ( 
        <div className="profile"> 
            <div id="profile_img_body"> 
                <button className="swipe_buttons"> {"<"} </button>
                <img id="profile_img" src={ Watermelon }/>
                <button className="swipe_buttons"> {">"} </button>
            </div>

            <hr id="profile_divider" />


            <div id="profile_description">

                <div id="profile_head">
                    <p className="swipe_head_text">
                        { name }
                    </p>
                    <p className="swipe_head_text">
                        { age }
                    </p>
                </div>
                
            </div>
            <ul id="food_list">
                <li>
                    Italian
                </li>
                <li>
                    Wine
                </li>
            </ul>
        </div>

     );
}

export default SwipeProfile;