import React, { useState } from 'react';

import "../styles/swipe.css"
import SwipeProfile from '../components/SwipeProfile';

// Sharon like mexican food


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

    const handleClick = (isLeft) => {
        if(isLeft) {
            console.log("Good Clicked")
        } else {
            console.log("Bad Clicked")
        }

        setIndex((index) => (index + 1) % profiles.length); 
    }

    return ( 
        <div className="swipe_page_container">
            <SwipeProfile name={profiles[index].name} 
            age={profiles[index].age} 
            foodList={profiles[index].foodList}
            clickFunction={handleClick}/>
        </div>
    );
}

export default SwipePage;