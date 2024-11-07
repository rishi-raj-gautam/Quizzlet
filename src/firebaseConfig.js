import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyACdjPV8KMmer8i-PZF8WbBVV8rdgGEwXk",
  authDomain: "quizlet-d3fc9.firebaseapp.com",
  projectId: "quizlet-d3fc9",
  storageBucket: "quizlet-d3fc9.firebasestorage.app",
  messagingSenderId: "49292765285",
  appId: "1:49292765285:web:13acc8a29c0f92a3a2be8c",
  measurementId: "G-24WN7VBHZZ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
