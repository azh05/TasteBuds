import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

//Initialize getter functions
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const status = await validatePassword(getAuth(), passwordFromUser);


// //Detect auth state
// onAuthStateChanged(auth, user => {
//     if(user != null) {
//       console.log('logged in!');
//     } else {
//       console.log('No user');
//     }

// });

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });


// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// if (!status.isValid) {
//   // Password could not be validated. Use the status to show what
//   // requirements are met and which are missing.

//   // If a criterion is undefined, it is not required by policy. If the
//   // criterion is defined but false, it is required but not fulfilled by
//   // the given password. For example:
//   const needsLowerCase = status.containsLowercaseLetter !== true;
// }

// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

export { auth, db };