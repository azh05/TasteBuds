import React, { useState, useRef, useEffect } from 'react';
import "../styles/profile.css"
import Picker from 'emoji-picker-react';
import { FaBars } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Watermelon from "../watermelon.jpg";
import FoodTags from '../components/foodtags';

import { useUser } from '../userinfo/UserContext';

function ProfilePage()  {
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    profileName: '',
    age: '',
    gender: '',
    cuisine: [],
    bio: '',
    icon: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('Name');
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [cuisine, setCuisine] = useState([]);
  const [availableTags, setAvailableTags] = useState(["Italian", "Indian", "Japanese", "American", "Other"]);
  const [photo, setPhoto] = useState(null);
  const [icon, setIcon] = useState('🍉')
  const [bio, setBio] = useState('Insert bio here...')
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const [canAddTag, setCanAddTag] = useState(false)
  const [originalProfileName, setOriginalProfileName] = useState('');
  const [editOrSave, setEditOrSave] = useState ("Edit")
  const [editingState, setEditingState] = useState({
    name: false,
    cuisine: false,
    bio: false,
});
const cuisineEditRef = useRef(null);
const maxCharacters = 350;

  //populate profile by pulling data from API
  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const email = user.email;
        const response = await fetch(`http://localhost:5001/profile?email=${email}`);
        console.log("fetched user from backend API")
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();  // Parse the response as JSON
        // setProfileData(data);  // Set the profile data
        setProfileData((prev) => ({
          ...data,
          icon: data.icon || '🍉', // Default to 🍉 if no icon is provided
        }));

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    if (user) {
      fetchProfile();
    }
/*
  const handleClickOutside = (event) => {
      if (cuisineEditRef.current && !cuisineEditRef.current.contains(event.target)) {
          setEditingState((prev) => ({ ...prev, cuisine: false })); // Exit edit mode
          setCanAddTag(false); // Hide the available tags list
      }
  };
*/
/*
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
*/
}, [user]);

const handleSave = async (section) => {
  try {
    console.log(section, "saved");
    const response = await fetch('http://localhost:5001/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(profileData), // Send the profileData as JSON in the body
      body: JSON.stringify({
        ...profileData,
        // icon: profileData.icon || '🍉', // Default to 🍉 if no icon is set
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save profile data');
    }

    toggleEditing(section); // Close editing mode
  } catch (error) {
    console.error('Error saving profile data:', error);
  }
};

const handleInputChange = (field, value) => {
  setProfileData(prev => ({ ...prev, [field]: value }));
};


  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };
  
  const handleEmojiClick = (emojiObject) => {
    setIcon(emojiObject.emoji);
    handleInputChange('icon', emojiObject.emoji);
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

  const handleProfileNameChange = (event) => {
    handleInputChange('profileName', event.target.value);    // Update the profile name
};

 const handleCuisineChange = (tag) => {
     // Add the tag to the cuisine list
     setProfileData((prevData) => {
      const updatedCuisine = [...prevData.cuisine, tag]; // Update cuisine based on profileData
      return {
        ...prevData,
        cuisine: updatedCuisine, // Update the cuisine array in profileData
      };
    });
    setAvailableTags((prevAvailableTags) => prevAvailableTags.filter((t) => t !== tag)); // Remove it from available tags
    setCanAddTag(false); // Hide the available tags list
  };

  const handleBioChange = (event) => {
    handleInputChange('bio', event.target.value);
  }

  const handleAddButton = () =>{
    setCanAddTag(true);
  };


/*
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
*/
const handleSaveAll = () => {
  // Call handleSave for each section
  handleSave('icon');
  handleSave('name');
  handleSave('cuisine');
  handleSave('bio');
  // Optionally add more sections if needed
};

const handleEditOrSave = () => {
  setEditOrSave((prevText) => (prevText === "Edit" ? "Save All" : "Edit"));
};

const handleSaveClick = ()=>{
  handleSaveAll();
  handleEditOrSave();
}



// const handleDeleteTag = (tag) => {
//   if (profileData.cuisine.length > 1){
//     console.log("delete tag");
//     console.log(profileData.cuisine);
//     setCuisine(profileData.cuisine.filter((t) => t !== tag)); // Remove the tag
//     console.log(profileData.cuisine);
//     setAvailableTags([...availableTags, tag]); // re-add to avilible tags
//   }
//   else {
//     setCanDelete(false);
//     setTimeout(() => setCanDelete(true), 2000);
//   }
// };



const handleDeleteTag = (tag) => {
  if (profileData.cuisine.length > 1) {
    console.log("delete tag");
    // Update cuisine within profileData
    setProfileData((prevData) => ({
      ...prevData,
      cuisine: prevData.cuisine.filter((t) => t !== tag), // Remove the tag
    }));

    setAvailableTags((prevAvailableTags) => [...prevAvailableTags, tag]); // re-add to available tags
  } else {
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
            <span className="icon-display" >{profileData.icon}</span> 
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
            value ={profileData.profileName}
            onChange={handleProfileNameChange}
            //onKeyDown={(e) => handleKeyDown(e,'name')}
          />
        ) : (
          <p className = "name" >{profileData.profileName},</p>
        )}
        <p className = "name"> {profileData.age}</p>
      </div>
      <div ref = {cuisineEditRef} className = "food-tags-display"> 
        <FoodTags 
        foodList ={profileData.cuisine} 
        isEditing={editingState.cuisine}
        onDeleteTag={handleDeleteTag}
        />
        {editingState.cuisine &&(
           <button
           className = "add-button"
           onClick = {handleAddButton}
           >
            <IoAdd size={20}/>
           </button>
        )}
        {canAddTag && (
                <div className="available-tags-list">
                    {availableTags.map((tag, index) => (
                        <button className = "tag-item available-tag" key={index} onClick={() => handleCuisineChange(tag)}>
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
            value={profileData.bio}
            onChange={handleBioChange}
            //onKeyDown={(e) => handleKeyDown (e, 'bio')}
            maxLength={maxCharacters}
          />
        ) : (
          <p className= "bio-text">{profileData.bio}</p>
        )}
        </div>
        
        
      </div>

       {/* Save All Button */}
    <div className="save-all-button-container">
      <button className="save-all-button" onClick={handleSaveClick}>
        {editOrSave}
      </button>
    </div>


    </div>
  );
}

export default ProfilePage;