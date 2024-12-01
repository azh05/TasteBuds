import React, { useState, useEffect } from 'react';
import "../styles/swipe.css";
import SwipeProfile from '../components/SwipeProfile';
import { useUser } from '../userinfo/UserContext';

const endpoint = "http://localhost:5001/users";

function SwipePage() {
    const { user } = useUser();
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 });
    const [maxDistance, setMaxDistance] = useState(50);
    const [isExiting, setIsExiting] = useState(false);
    const [clickDirection, setClickDirection] = useState('');

    // Fetch profiles from backend
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) throw new Error('Failed to fetch profiles from backend');
                const data = await response.json();
                setProfiles(data);
                setFilteredProfiles(data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        const fetchUserLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error fetching user location:", error);
                }
            );
        };

        fetchProfiles();
        fetchUserLocation();
    }, []);

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 3958.8; // Radius of the Earth in miles
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in miles
    };

    // Filter profiles based on distance
    useEffect(() => {
        if (!userLocation.lat || !userLocation.lon || profiles.length === 0) {
            setFilteredProfiles([]);
            return;
        }

        const filtered = profiles.filter((profile) => {
            if (!profile.lat || !profile.lon) return false;
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                profile.lat,
                profile.lon
            );
            return distance <= maxDistance;
        });

        setFilteredProfiles(filtered);
        setCurrentIndex(0); // Reset index
    }, [maxDistance, userLocation, profiles]);

    // Handle liking/disliking
    const handleLike = async (isLeft) => {
        if (!user) return;
        const display_user = filteredProfiles[currentIndex];
        const user_email = user.email;

        try {
            const response = await fetch('http://localhost:5001/past_likes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    display_email: display_user.email,
                    user_email,
                    isLeft,
                }),
            });
            if (!response.ok) throw new Error('Failed to update likes.');
        } catch (error) {
            console.error(error);
        }
    };

    // Handle swipe actions
    const handleClick = (isLeft) => {
        if (isExiting || currentIndex >= filteredProfiles.length) return;
        handleLike(isLeft);
        setClickDirection(isLeft ? 'left' : 'right');
        setIsExiting(true);

        setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIsExiting(false);
            setClickDirection('');
        }, 400);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') handleClick(true);
            else if (event.key === 'ArrowRight') handleClick(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, filteredProfiles]);

    const currentProfile = filteredProfiles[currentIndex];

    return (
        <div className="swipe_page_container">
            {/* Distance Radius Slider */}
            <div className="filter-container">
                <label>
                    Distance Radius: {maxDistance} miles
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(Number(e.target.value))}
                    />
                </label>
                <p>{filteredProfiles.length} profiles available within {maxDistance} miles.</p>
            </div>

            {/* Swipeable Profile */}
            <div className="profile-container">
                {currentProfile ? (
                    <SwipeProfile
                        name={currentProfile.profileName}
                        age={currentProfile.age}
                        foodList={currentProfile.cuisine}
                        clickFunction={handleClick}
                        className={`object ${isExiting ? `exit-${clickDirection}` : 'enter'}`}
                    />
                ) : (
                    <p>No profiles available within the selected radius.</p>
                )}
            </div>
        </div>
    );
}

export default SwipePage;