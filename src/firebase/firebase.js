import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD_ZixiIjEqzyaTEpVUh3XbwYMGOaYixLM",
  authDomain: "fakestore-2fd5f.firebaseapp.com",
  projectId: "fakestore-2fd5f",
  storageBucket: "fakestore-2fd5f.appspot.com",
  messagingSenderId: "745596801896",
  appId: "1:745596801896:web:800b1b827bc947584cfcdd",
  measurementId: "G-2GLNQHVH12"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db=getFirestore(app);

