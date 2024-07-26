import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyDWEcdmfLRavyzz-JATEwcckvhh2ANnBrc",
  
    authDomain: "playlist-27ed0.firebaseapp.com",
  
    projectId: "playlist-27ed0",
  
    storageBucket: "playlist-27ed0.appspot.com",
  
    messagingSenderId: "937410773892",
  
    appId: "1:937410773892:web:e5bcb464e0cebf171893d1"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const projectFirestore = getFirestore(app);

// Initialize Auth
const projectAuth = getAuth(app);

export { projectFirestore, serverTimestamp, projectAuth };
