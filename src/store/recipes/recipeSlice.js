import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
    name:'recipe',
    initialState: JSON.parse(localStorage.getItem('myRecipes')) || [],
    reducers:{
        addRecipe:(state, {payload}) => {
            state.push(payload);
        },
        editRecipe:(state, {payload}) => {
            const index = state.findIndex(i => i.id === payload.id)
            if(!index)
                state.splice(state.indexOf(index), 1, payload);
        },
        deleteRecipe:(state, {payload}) => {
            const foundRecipe = state.find((recipe) => recipe.id === payload);
            if (foundRecipe) 
                state.splice(state.indexOf(foundRecipe), 1);
        },
    }
})

export const { addRecipe,editRecipe, deleteRecipe} = recipeSlice.actions;