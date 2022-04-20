import { createSlice } from '@reduxjs/toolkit';

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: null,
    fetchingRecipes: false,
  },
  reducers: {
    setFetchingRecipes: (state, action) => {
      state.fetchingRecipes = action.payload;
    }
  },
});

export const { setFetchingRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
