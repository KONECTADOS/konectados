import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8IhlWbUcSxLdxVfcy5FwOkGSDQSmh_B8",
  authDomain: 'konectados-9636e.firebaseapp.com',
  databaseURL: "https://konectados-9636e-default-rtdb.firebaseio.com",
  projectId: 'konectados-9636e',
  storageBucket: 'konectados-9636e.appspot.com',
  messagingSenderId: '194009395013',
  appId: '1:194009395013:web:4d1cc1a17caeaddbc5182c',
  measurementId: "G-LTT5V24J51"
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app);
// Get a reference to the database service
