const genderChoices = ['preferNotToSay', 'male', 'female', 'non-binary'];
const cuisineChoices = ['italian', 'mexican', 'japanese', 'indian', 'chinese', 'american', 'other']

function hashCode(str) {
    if(!str) {
        return 0;
    }
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
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

function argmax(arr) {
    if (arr.length === 0) {
      return -1; // Or throw an error if you prefer
    }
  
    let maxIndex = 0;
    let maxValue = arr[0];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxIndex = i;
        maxValue = arr[i];
      }
    }
  
    return maxIndex;
}

// user follows the UserProfile schema
// Embed info into a 5D vector
function embedUser(user) {
    const { age, gender, cuisine, past_likes, past_dislikes, who_liked, email } = user;

    const genderID = gender ? genderChoices.indexOf(gender.toLowerCase()) : 0;
    const cuisineID = cuisine ? cuisineChoices.indexOf(cuisine.toLowerCase()) : 0;
    const past_likes_ID = past_likes ? past_likes.reduce((total, str) => total + hashCode(str) / 10000000000, 0) : 0;
    const past_dislikes_ID = past_dislikes ? past_dislikes.reduce((total, str) => total + hashCode(str) / 10000000000, 0) : 0;
    const who_liked_ID = who_liked ? who_liked.reduce((total, str) => total + hashCode(str) / 10000000000, 0) : 0;

    return [age, genderID, cuisineID, past_likes_ID, past_dislikes_ID, who_liked_ID];
}

// Pick a random user
function pickRandomUser(userList, userEmail, recent_interactions) {
    const candidateUsers = userList.filter(
        candidate => candidate.email !== userEmail && !recent_interactions.includes(candidate.email)
    );


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
        console.log("Current User DNE");
        return null;
    }
    
    // Getting emails of users that were recently seen
    const { recent_interactions } = currentUser;

    // Getting emails of users that are not the user that is swiping and wasn't recently interacted with
    userList = userList.filter(candidate => {
        return candidate.email && candidate.email !== userEmail && !(recent_interactions.includes(candidate.email));
    }); 

    // No Candidates
    if(userList.length == 0) {
        console.log("No Candidates available")
        return null; 
    }

    // Calculating Cosine Similarity between their embed_vectors 
    const cos_sims = userList.map(candidate => {
        return cosineSimilarity(currentUser.embed_vector, candidate.embed_vector);
    });

    
    // Most similar user
    const most_sim_idx = argmax(cos_sims);

    if(most_sim_idx == -1) {
        console.log("Cosine Sim Error");
        return null;
    }

    return userList[most_sim_idx].email;
}


module.exports = { embedUser, recommendUser, pickRandomUser };