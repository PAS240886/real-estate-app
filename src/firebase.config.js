// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpe2Y11Amtl9HfUNTySPkmBP_mSdl1_V0",
  authDomain: "realestateapp-a5c7f.firebaseapp.com",
  projectId: "realestateapp-a5c7f",
  storageBucket: "realestateapp-a5c7f.appspot.com",
  messagingSenderId: "286278702639",
  appId: "1:286278702639:web:9f92ece7d0e8a0c0d718da"
};

export const db = getFirestore()