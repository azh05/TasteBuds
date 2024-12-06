import React from 'react';
import { useUser } from '../userinfo/UserContext';


function Logout() {
    const { setUser } = useUser(); // Ensure you destructure correctly

    const handleLogout = () => {
        console.log("Logged Out")
        setUser(null); // Clear user from context and localStorage
    };
    
    return (  <div onClick={handleLogout}> 
        Logout 
    </div> );
}

export default Logout;