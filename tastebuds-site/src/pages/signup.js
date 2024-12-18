import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../backend/firebase';  // Ensure Firebase is initialized correctly
import '../App.css'; // Import CSS for external styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleSaveProfile = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!email || !password || !profileName || !zipCode || !age || !gender || !cuisine) {
      setError('Please fill out all fields.');
      // setSuccess('');
      return;
    }

    //age validation
    if(age<18) {
      setError('TasteBuds is restricted to users 18+');
      // setSuccess('');
      return;
    }
    if(age > 110) {
      setError('Please enter a valid age.');
      // setSuccess('');
      return;
    }
    //zip code validation. must be 5 digits
    if(!(/^\d{5}$/.test(String(zipCode)) && zipCode > 501)) {
      setError('Your zip code must be 5 digits. Please try again.');
      // setSuccess('');
      return;
    }

  
    try {
      // Send the data to the API
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          profileName,
          zipCode,
          age,
          gender,
          cuisine
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create the user.');
      }


      const data = await response.json();
      console.log('API Response:', data);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created:', user);
      // setSuccess('Profile successfully created!');
      setError('');
      navigate('/');

    }  catch (error) {
      console.error('Error creating user:', error.message);
      setError(error.message);
      // setSuccess('');
    };
}


  return (
    <div className="div-container"> 
      <div className="signup-container">
      <h2>Create Your Profile</h2>
      <form className="signup-form" onSubmit={handleSaveProfile}>
      {error && (
          <p className="error-message" style={{ color: 'red' }}>
            {error}
          </p>
        )}
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
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Other">Other</option>
          </select>
        </label>

          <button className="save-button" type="submit">Save Profile</button>
      </form>
    </div>
    </div>
  );
};


export default Signup;
