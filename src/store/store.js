import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { recipeSlice } from "./recipes/recipeSlice"

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        recipe: recipeSlice.reducer,
    }
})