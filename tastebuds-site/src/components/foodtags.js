import React from "react";
import "../styles/profile.css"



function FoodTags({foodList, isEditing, onDeleteTag}){
    if(!Array.isArray(foodList)) {
        foodList = [ foodList ];
    }


    

    return(
        <div className = "tag-container">
            {foodList.map((str, index) => (
                <div className = "tag-item" key ={index}>
                    <span>{str}</span>
                    {isEditing && (
                        <button onClick={() => onDeleteTag(str)} className= "delete-button">X</button>
                    )}
                </div>
            ))}
        </div>
    );


}

export default FoodTags