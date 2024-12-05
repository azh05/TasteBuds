import React from 'react';
import "../styles/navigationbar.css";
import { useUser } from '../userinfo/UserContext';

function Navbar() {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        console.log("Logged Out");
        setUser(null);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <p className="logo">TasteBuds</p>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href={`/profile/${user?.email || ''}`}>Edit my profile</a>
                    </li>
                    <li>
                        <a href="/match">View my matches</a>
                    </li>
                    <li>
                        <a href="/scroll">Swipe on Profiles</a>
                    </li>
                    <li>
                        <a href="/recommend">Recommend a restaurant</a>
                    </li>
                    <li onClick={handleLogout}>
                        <a href="/">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
