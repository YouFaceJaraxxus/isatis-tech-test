import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllRecipes } from '../../services/recipes/recipeService';

// First, create the thunk
export const getRecipesAsync = createAsyncThunk(
  'recipes/getRecipes',
  async () => {
    const response = await getAllRecipes();
    return response.data
  }
)

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    fetchingRecipes: false,
  },
  reducers: {
    setFetchingRecipes: (state, action) => {
      state.fetchingRecipes = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipesAsync.fulfilled, (state, action) => {
      //we can't get arrays from firebase, only objects, which we can turn into arrays and manipulate as arrays
      state.recipes = Object.values(action.payload);
    })
  },
});

export const {
  setFetchingRecipes 
} = recipesSlice.actions;

export default recipesSlice.reducer;
