import React, { useState } from 'react';
import '../App.css'; // Import CSS for external styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSaveProfile = (event) => {
    event.preventDefault();
    console.log("Profile saved:", {
      email,
      password,
      profileName,
      zipCode,
      age,
      gender,
      cuisine,
      photo
    });
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="signup-container">
      <h2>Edit Your Profile</h2>
      <form className="signup-form" onSubmit={handleSaveProfile}>
        <label>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Profile Name:
          <input
            type="text"
            placeholder="Enter your profile name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
        </label>

        <label>
          Zip Code:
          <input
            type="text"
            placeholder="Enter your zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-Binary</option>
            <option value="preferNotToSay">Prefer not to say</option>
          </select>
        </label>

        <label>
          Cuisine Preferences:
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">Select cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="japanese">Japanese</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="american">American</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Upload Photo:
          <input type="file" onChange={handlePhotoChange} />
        </label>

        <button className="save-button" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Signup;
