// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyBqpGGSAjr5j70dCOQQ_KoGqTpjMaH_C1M",
    authDomain: "wcmml-ab527.firebaseapp.com",
    databaseURL: "https://wcmml-ab527-default-rtdb.firebaseio.com",
    projectId: "wcmml-ab527",
    storageBucket: "wcmml-ab527.appspot.com",
    messagingSenderId: "849129448321",
    appId: "1:849129448321:web:810d77e1f5507622c13e80",
    measurementId: "G-DKDNX9CNDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);