// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider }  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR5MFL9tGQY1XXolYqEWvUb9oA5_acSJw",
  authDomain: "votechain-2b18d.firebaseapp.com",
  projectId: "votechain-2b18d",
  storageBucket: "votechain-2b18d.appspot.com",
  messagingSenderId: "814511305067",
  appId: "1:814511305067:web:4bb26ba31fd0e039915c2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider}