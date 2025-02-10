import { configureStore } from "@reduxjs/toolkit";
import PasteReducer from './PasteSlice.js'
 export const store = configureStore({
    reducer:{
      paste : PasteReducer,
    },
 })

 
