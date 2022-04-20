import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createRecipe, getAllRecipes } from '../../services/recipes/recipeService';

export const getRecipesAsync = createAsyncThunk(
  'recipes/getRecipes',
  async () => {
    const response = await getAllRecipes();
    return response.data;
  }
);

export const createRecipeAsync = createAsyncThunk(
  'recipes/createRecipe',
  async (recipe) => {
    const response = await createRecipe(recipe);
    return response.data;
  },
);

const getArrayFromObject = (recipeObject) => Object.entries(recipeObject)
  .map(([key, value]) => {
    return {
      id: key,
      rawMaterialId: key,
      ...value
    }
  });

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    fetchingRecipes: false,
    creatingRecipe: false,
  },
  reducers: {
    setFetchingRecipes: (state, action) => {
      state.fetchingRecipes = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipesAsync.pending, (state) => {
      state.fetchingRecipes = true;
    })
      .addCase(getRecipesAsync.fulfilled, (state, action) => {
        //we can't get arrays from firebase, only objects, which we can turn into arrays and manipulate as arrays
        state.recipes = getArrayFromObject(action.payload);
        state.fetchingRecipes = false;
      })
      .addCase(getRecipesAsync.rejected, (state) => {
        state.fetchingRecipes = false;
      })
      .addCase(createRecipeAsync.pending, (state) => {
        state.creatingRecipe = true;
      })
      .addCase(createRecipeAsync.fulfilled, (state, action) => {
        state.recipes = [...state.recipes, {
          id: action.payload.name,
          rawMaterialId: action.payload.name,
          ...action.meta.arg,
        }]
        state.creatingRecipe = false;
      })
      .addCase(createRecipeAsync.rejected, (state) => {
        state.creatingRecipe = false;
      })
  },
});

export const {
  setFetchingRecipes
} = recipesSlice.actions;

export default recipesSlice.reducer;
