import React, { useState, useRef, useEffect } from 'react';
import "../styles/profile.css"
import Picker from 'emoji-picker-react';
import { FaBars } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Watermelon from "../watermelon.jpg";
import FoodTags from '../components/foodtags';

function ProfilePage()  {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('Name');
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('20');
  const [gender, setGender] = useState('');
  const [cuisine, setCuisine] = useState(["Chinese", "Thai", "Mexican"]);
  const [availableTags, setAvailableTags] = useState(["Italian", "Indian", "Japanese", "American", "Other"]);
  const [photo, setPhoto] = useState(null);
  const [icon, setIcon] = useState('🍉')
  const [bio, setBio] = useState('Insert bio here...')
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const [canAddTag, setCanAddTag] = useState(false)
  const [originalProfileName, setOriginalProfileName] = useState('');
  const [editingState, setEditingState] = useState({
    name: false,
    cuisine: false,
    bio: false,
});
const cuisineEditRef = useRef(null);
const maxCharacters = 350;


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

  const toggleEditing = (section) => {
    setEditingState(prevState => ({
        ...prevState,
        [section]: !prevState[section],
    }));
};

  const handleEdit = () => {
    setOriginalProfileName(profileName);
    setIsEditing(true);
  };

  const handleSave = (section) => {
    toggleEditing(section);
  };

  const handleProfileNameChange = (event) => {
    setProfileName(event.target.value); // Update the profile name
};

 const handleCuisineChange = (tag) => {
    setCuisine((prevCuisine) => [...prevCuisine, tag]); // Add the tag to the cuisine list
    setAvailableTags((prevAvailableTags) => prevAvailableTags.filter((t) => t !== tag)); // Remove it from available tags
    setCanAddTag(false); // Hide the available tags list
  };

  const handleBioChange = (event) => {
    setBio (event.target.value);
  }


  const handleAddButton = () =>{
    setCanAddTag(true);
  };



const handleKeyDown = (event,section) => {
  if (event.key === 'Enter') {
      handleSave(section); // Trigger save when Enter is pressed
  } else if (event.key === 'Escape' && section == 'name') {
      setProfileName(originalProfileName); // Revert to the original value when Escape is pressed
      setIsEditing(false); // Exit editing mode
  } else if ( event.key == 'Escape' && section == 'bio'){
      setIsEditing(false);
  }
};


const handleDeleteTag = (tag) => {
  if (cuisine.length > 1){
    setCuisine(cuisine.filter((t) => t !== tag)); // Remove the tag
    setAvailableTags([...availableTags, tag]); // re-add to avilible tags
  }
  else {
    setCanDelete(false);
    setTimeout(() => setCanDelete(true), 2000);
  }
};

  

  const categories = [
    {
        category: 'food_drink',
        name: 'Food & Drink' // Custom label
    }
  ];


  useEffect(() => {
    const handleClickOutside = (event) => {
        if (cuisineEditRef.current && !cuisineEditRef.current.contains(event.target)) {
            setEditingState((prev) => ({ ...prev, cuisine: false })); // Exit edit mode
            setCanAddTag(false); // Hide the available tags list
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);




  return (
    <div >
        <div className = "top-bar" > 
            <button className= "icon-button"> 
                <FaBars size = {34}/>
            </button>
        </div>
        <div className = "horizontal-bar"></div>
        <div className = "header-photo-container">
        <img id="header-photo" src={photo || Watermelon} alt="Header Photo" />
            <button 
             className="upload-button" 
             onClick={() => document.getElementById('photo-upload').click()}>
                Change Photo
                <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoChange}/>
            </button>
        </div>
        <div className = "food-icon" onClick={() => setShowPicker(!showPicker)}>
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
      <div className = "name-text">
        {editingState.name ? (
          <input
            className="name-input"
            type="text"
            value ={profileName}
            onChange={handleProfileNameChange}
            onKeyDown={(e) => handleKeyDown(e,'name')}
          />
        ) : (
          <p className = "name" >{profileName},</p>
        )}
        <p className = "name"> {age}</p>
        <div className = "edit-button-container">
        {!editingState.name && (
         <button 
            className = "edit-button"
            onClick={() => toggleEditing('name')}> 
            <MdEdit size = {20}/>
          </button>
        )}
        </div>
      </div>
      <div ref = {cuisineEditRef} className = "food-tags-display"> 
        <FoodTags 
        foodList ={cuisine} 
        isEditing={editingState.cuisine}
        onDeleteTag={handleDeleteTag}
        />
        <div className = "edit-button-container-2">
          <div className = "edit-button-container">
            {!editingState.cuisine &&(
            <button
              class = "edit-button"
              onClick={() => toggleEditing('cuisine')}>
              <MdEdit size = {20}/>
            </button>
            )}
            
          </div>
        </div>
        {editingState.cuisine &&(
           <button
           class = "add-button"
           onClick = {handleAddButton}
           >
            <IoAdd size={20}/>
           </button>
        )}
        {canAddTag && (
                <div className="available-tags-list">
                    {availableTags.map((tag, index) => (
                        <button class = "tag-item available-tag" key={index} onClick={() => handleCuisineChange(tag)}>
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        {!canDelete && (
          <p className = "error-message">Must have at least one food tag!</p>
        )}
      </div>
      <div className = "bio-container">
        <p className ="section-text">About Me:</p>
        <div className = "bio-body">
        {editingState.bio ? (
          <textarea
            className="bio-input"
            type= "text"
            placeholder="Insert bio here...."
            value={bio}
            onChange={handleBioChange}
            onKeyDown={(e) => handleKeyDown (e, 'bio')}
            maxLength={maxCharacters}
          />
        ) : (
          <p className= "bio-text">{bio}</p>
        )}
        </div>
        
        <div className = "edit-bio-container">
          <div className = "edit-button-container">
            <button className = "edit-button"
            onClick={() => toggleEditing('bio')}> 
              <MdEdit size = {20}/>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;