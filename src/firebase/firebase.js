import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:YOUR İNFORMATİON
  authDomain: YOUR İNFORMATİON
  projectId: YOUR İNFORMATİON
  storageBucket: YOUR İNFORMATİON
  messagingSenderId: YOUR İNFORMATİON
  appId: YOUR İNFORMATİON
  measurementId:YOUR İNFORMATİON
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db=getFirestore(app);

