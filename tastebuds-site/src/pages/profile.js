import React, { useState } from 'react';
import "../styles/profile.css"
import Picker from 'emoji-picker-react';
import { FaBars } from 'react-icons/fa';
import Watermelon from "../watermelon.jpg"

function ProfilePage()  {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [photo, setPhoto] = useState(null);
  const [icon, setIcon] = useState('🍉')
  const [showPicker, setShowPicker] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };
  const handleEmojiClick = (emojiObject) => {
    setIcon(emojiObject.emoji);
    setShowPicker(false); // Close the picker after selecting an emoji
  };

  const categories = [
    {
        category: 'food_drink',
        name: 'Food & Drink' // Custom label
    }
    ];


  return (
    <div >
        <div class = "top-bar" > 
            <button class= "icon-button"> 
                <FaBars size = {34}/>
            </button>
        </div>
        <div class = "horizontal-bar"></div>
        <div class = "header-photo-container">
        <img id="header-photo" src={photo || Watermelon} alt="Header Photo" />
            <button 
             class="upload-button" 
             onClick={() => document.getElementById('photo-upload').click()}>
                Change Photo
                <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoChange}/>
            </button>
        </div>
        <div class = "food-icon" onClick={() => setShowPicker(!showPicker)}>
            <span className="icon-display" >{icon}</span> 
        </div>
        {showPicker && (
            <div className="emoji-picker-container">
                <Picker 
                    onEmojiClick={handleEmojiClick} 
                    disableSkinTonePicker={true}
                    categories={categories}
                />
            </div>
      )}
      <h1>Name</h1>
    </div>
  );
}

export default ProfilePage;