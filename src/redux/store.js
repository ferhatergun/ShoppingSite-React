import { configureStore } from "@reduxjs/toolkit";
import SepetSlice from './sepet'




export const store = configureStore ({

    reducer:{
        sepet:SepetSlice
    }
})