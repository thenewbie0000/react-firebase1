import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBY846p8xjN-9LUmN72duL94VaN5OIwcxY",
  authDomain: "fir-course-af488.firebaseapp.com",
  projectId: "fir-course-af488",
  storageBucket: "fir-course-af488.appspot.com",
  messagingSenderId: "243230889274",
  appId: "1:243230889274:web:8d32dc51bdff9760baac03",
  measurementId: "G-LNL57Z353C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);