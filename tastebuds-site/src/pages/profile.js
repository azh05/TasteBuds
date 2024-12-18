import React, { useState, useRef, useEffect } from 'react';
import "../styles/profile.css"
import Picker from 'emoji-picker-react';
import { IoAdd } from "react-icons/io5";
import Watermelon from "../watermelon.jpg";
import American from "../american.jpg";
import Chinese from "../chinese.jpg";
import Indian from "../indian.jpg";
import Italian from "../italian.jpg";
import Japanese from "../japanese.jpg";
import Mexican from "../mexican.jpg";
import FoodTags from '../components/foodtags';
import Navbar from '../components/navigationbar';
import { useUser } from '../userinfo/UserContext';
import { useParams } from 'react-router-dom'; 



function ProfilePage()  {
  const { email } = useParams(); // Get the email parameter from the URL
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    profileName: '',
    age: '',
    gender: '',
    cuisine: [],
    bio: '',
    icon: '',
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const [canAddTag, setCanAddTag] = useState(false)
  const [editOrSave, setEditOrSave] = useState ("Edit")
  const [editingState, setEditingState] = useState({
    name: false,
    cuisine: false,
    bio: false,
    icon: false,
});
const cuisineEditRef = useRef(null);
const maxCharacters = 350;


  //populate profile by pulling data from API
  useEffect(() => {
    const allTags = ["Italian", "Indian", "Japanese", "American", "Other", "Mexican", "Chinese"];
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/profile?email=${email}`);
        console.log("fetched user from backend API")
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();  // Parse the response as JSON
        setProfileData((prev) => ({
          ...data,
        }));
        
        const updatedAvailableTags = allTags.filter(
          (tag) => !data.cuisine.includes(tag)
        );
        setAvailableTags(updatedAvailableTags);

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
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
}, [user, email]);

useEffect(() => {
  if (profileData.cuisine && profileData.cuisine.length > 0) {
    pickPhoto();
  }
}, [profileData]);


if (!user) {
  return (
    <div>
      <Navbar />
      <div className="not-logged-in">
        <div>Must be Logged In</div>
      </div>
    </div>
  );
}

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
        ...profileData
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


  
  const handleEmojiClick = (emojiObject) => {
    handleInputChange('icon', emojiObject.emoji);
    setShowPicker(false); // Close the picker after selecting an emoji
  };

  const toggleEditing = (section) => {
    setEditingState(prevState => ({
        ...prevState,
        [section]: !prevState[section],
    }));
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
  pickPhoto();
}

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

const pickPhoto = () =>{
  var favFood = profileData.cuisine[0];
  switch(favFood){
      case "American":
        setPhoto(American);
        break;
    
      case "Chinese":
        setPhoto(Chinese);
        break;
    
      case "Indian":
        setPhoto(Indian);
        break;
      
      case "Italian":
        setPhoto(Italian);
        break;

      case "Japanese":
        setPhoto(Japanese);
        break;
      
      case "Mexican":
        setPhoto(Mexican);
        break;
      
      case "Other":
        setPhoto(Watermelon);
        break;
      
      default:
        setPhoto(Watermelon);
        break;
  };
};


  return (
    <div >
        <Navbar></Navbar>
        <div className = "header-photo-container">
        <img id="header-photo" src={photo || Watermelon} alt="" />
        </div>
        <div className = {`food-icon ${editingState.icon ? 'hover-enabled' : ''}`} onClick={() => {
            if (editingState.icon) {
              setShowPicker(!showPicker);
            }
        }}>
            <span className="icon-display" >{profileData.icon}</span> 
        </div>
        {showPicker && user.email === profileData.email && editingState.icon &&(
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
        {profileData.gender !== "preferNotToSay" && <p className="name">{profileData.gender.charAt(0).toUpperCase()+profileData.gender.slice(1)},</p>}
        <p className='name'> Age {profileData.age}</p>

      </div>
      <div className='email-container'>
        <p className='email'>Contact Info: {profileData.email}</p>
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
      {user.email === profileData.email && (
      <button className="save-all-button" onClick={handleSaveClick}>
        {editOrSave}
      </button>
      )}
    </div>


    </div>
  );
}

export default ProfilePage;