// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfyxg71aKJUM59O9nskI07UUt9LTvEqrc",
  authDomain: "xpc-test.firebaseapp.com",
  databaseURL: "https://xpc-test.firebaseio.com",
  projectId: "xpc-test",
  storageBucket: "xpc-test.appspot.com",
  messagingSenderId: "682092196520",
  appId: "1:682092196520:web:0c36e20228657e0e1c889d",
  measurementId: "G-SNSD3RVTCF",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
