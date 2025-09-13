// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8qXyvLWcIAyJfYrUYLrGoWOtT7jgx0Xw",
  authDomain: "petocloud-83e39.firebaseapp.com",
  projectId: "petocloud-83e39",
  storageBucket: "petocloud-83e39.firebasestorage.app",
  messagingSenderId: "146951337424",
  appId: "1:146951337424:web:bba016118043241b4375d5",
  measurementId: "G-2ECV8SR1WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)


// let analytics;
// if (typeof window !== "undefined") {
//   const { getAnalytics, isSupported } = require("firebase/analytics");
//   isSupported().then(supported => {
//     if (supported) analytics = getAnalytics(app);
//   });
// }

let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics, isSupported } = require("firebase/analytics");
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
