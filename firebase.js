// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYW4GiJtCAeeT7gJi_eOqeehS3EuK1uFU",
  authDomain: "mychatapp-9d3e4.firebaseapp.com",
  projectId: "mychatapp-9d3e4",
  storageBucket: "mychatapp-9d3e4.appspot.com",
  messagingSenderId: "711232978562",
  appId: "1:711232978562:web:b00baaeebb26d2cc2ffe9b",
  measurementId: "G-J8DMKMG5QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}