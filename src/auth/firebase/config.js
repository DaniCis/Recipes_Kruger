// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN3wcdxmFhn5Q7_gK-2i-AwLMfsCT3bsk",
    authDomain: "recipesks-faaa5.firebaseapp.com",
    projectId: "recipesks-faaa5",
    storageBucket: "recipesks-faaa5.appspot.com",
    messagingSenderId: "298193489554",
    appId: "1:298193489554:web:51f570332f3f0712f8a04b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);