import { configureStore } from "@reduxjs/toolkit";
import tanrsactionReducer from "./Features/transaction/transactionSlice";



export const store = configureStore({
    reducer:{
        transaction:tanrsactionReducer
    }
})