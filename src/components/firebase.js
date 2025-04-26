// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVYit3hKnWLoL4TdUm5eCULn21gCVyf9o",
    authDomain: "skillswap-d3d5a.firebaseapp.com",
    projectId: "skillswap-d3d5a",
    storageBucket: "skillswap-d3d5a.firebasestorage.app",
    messagingSenderId: "285846862088",
    appId: "1:285846862088:web:473b7c154ea4a9b815d4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;