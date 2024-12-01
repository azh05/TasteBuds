const mongoose = require('mongoose');
const genderChoices = ['Prefer not to say', 'Male', 'Female', 'Non-Binary'];
const cuisineChoices = ['Italian', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'American', 'Other']

String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
  

function cosineSimilarity(A, B) {
    if (A.length !== B.length) {
      throw new Error("Arrays must be of the same length");
    }
  
    const dotProduct = A.reduce((sum, a, i) => sum + a * B[i], 0);
    const magnitudeA = Math.sqrt(A.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(B.reduce((sum, b) => sum + b * b, 0));
  
    // Oops
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }
  
    return dotProduct / (magnitudeA * magnitudeB);
}

function argmin(arr) {
    if (arr.length === 0) {
      return -1; // Or throw an error if you prefer
    }
  
    let minIndex = 0;
    let minValue = arr[0];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
        minIndex = i;
        minValue = arr[i];
      }
    }
  
    return minIndex;
}

// user follows the UserProfile schema
// Embed info into a 5D vector
function embedUser(user) {
    const { age, gender, cuisine, past_likes, past_dislikes, who_liked } = user;

    const genderID = genderChoices.indexOf(gender);
    const cuisineID = cuisineChoices.indexOf(cuisine);
    const past_likes_ID = past_likes.reduce((total, str) => total + str.hashCode(), 0);
    const past_dislikes_ID = past_dislikes.reduce((total, str) => total + str.hashCode(), 0);
    const who_liked_ID = who_liked.reduce((total, str) => total + str.hashCode(), 0);

    return [ age, genderID, cuisineID, past_likes_ID, past_dislikes_ID, who_liked_ID ];
}

// Pick a random user
function pickRandomUser(userList, userEmail) {
    const candidateUsers = userList.filter(candidate => candidate.email !== userEmail);

    return candidateUsers[Math.floor(Math.random() * candidateUsers.length)].email;
}

// Given all the users (in the UserRec schema) and the email of the current User swiping
// Recommend the best user (their email) 
function recommendUser(userList, userEmail) {
    // Getting the current User
    const currentUser = userList.filter(obj => obj.email === userEmail)[0];
    
    // if the user doesn't exist in the Database
    if(!currentUser) {
        // Add to the database and return someone random
        return null;
    }

    console.log(currentUser);
    
    // Getting emails of users that were recently seen
    const { recent_interactions } = currentUser;

    // Getting emails of users that are not the user that is swiping and wasn't recently interacted with
    const candidateUsers = userList.filter(candidate => {
        candidate.email !== userEmail && !(candidate.email in recent_interactions)
    }); 

    // Calculating Cosine Similarity between their embed_vectors 
    const cos_sims = candidateUsers.map(candidate => {
        return cosineSimilarity(currentUser.embed_vector, candidate.embed_vector);
    });

    // Most similar user
    const most_sim_idx = argmin(cos_sims);

    return candidateUsers[most_sim_idx].email;
}


module.exports = { embedUser, recommendUser, pickRandomUser };