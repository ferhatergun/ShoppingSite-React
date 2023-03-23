import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const initialState ={
    auth:auth

}

const userslice =createSlice({

    name:'user',
  /*   initialState: useAuthState(auth) , */
})