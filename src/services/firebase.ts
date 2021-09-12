import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0Bks9hxg6RRajBAKsuNVN18boxErSd0U",
  authDomain: "konectados-dev.firebaseapp.com",
  databaseURL: "https://konectados-dev-default-rtdb.firebaseio.com",
  projectId: "konectados-dev",
  storageBucket: "konectados-dev.appspot.com",
  messagingSenderId: "650767692405",
  appId: "1:650767692405:web:4ef4e9e57e3e192d553e3c",
  measurementId: "G-LJPX2L7MJE"
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
// Get a reference to the database service


export async function setSetup(){
  const database = getDatabase();
  set(ref(database, 'setups/' + '001'), {
    nome: 'Setup',
    email: 'rafamira675@gmail.com',
  });
}