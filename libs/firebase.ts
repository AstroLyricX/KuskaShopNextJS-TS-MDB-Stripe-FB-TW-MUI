// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_Ae7BXIsRtT9-4QZ-fHDheQ6IvNob8Tg",
  authDomain: "kuska-shop-e1b47.firebaseapp.com",
  projectId: "kuska-shop-e1b47",
  storageBucket: "kuska-shop-e1b47.appspot.com",
  messagingSenderId: "381477203110",
  appId: "1:381477203110:web:bffd4e988bb11328e05867",
  measurementId: "G-VERW6CK5LF",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
