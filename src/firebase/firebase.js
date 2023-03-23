import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCNX9QFQP7N-WK8bcXtO3bU8tmh5ImZLH8",
  authDomain: "shopsites-9ba0c.firebaseapp.com",
  projectId: "shopsites-9ba0c",
  storageBucket: "shopsites-9ba0c.appspot.com",
  messagingSenderId: "498975275683",
  appId: "1:498975275683:web:cc60be7ea11e32b9ce9d16",
  measurementId: "G-8E27R6KEXJ"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db=getFirestore(app);

