// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0wq975HsHAzRErOr3qE2HsUJBOfN6ONw",
  authDomain: "mindx-todolist.firebaseapp.com",
  projectId: "mindx-todolist",
  storageBucket: "mindx-todolist.appspot.com",
  messagingSenderId: "955746888868",
  appId: "1:955746888868:web:b2fdf2deff220526f30a31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const subscriptions = [];

export { auth, db, subscriptions };
