import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createRecipe, getAllRecipes, getRecipeById, softDeleteRecipe, updateRecipe } from '../../services/recipes/recipeService';

export const getRecipesAsync = createAsyncThunk(
  'recipes/getRecipes',
  async () => {
    const response = await getAllRecipes();
    return response.data;
  }
);

export const getRecipeByIdAsync = createAsyncThunk(
  'recipes/getRecipeById',
  async (id) => {
    const response = await getRecipeById(id);
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

export const updateRecipeAsync = createAsyncThunk(
  'recipes/updateRecipe',
  //recipe has the "data" and the "id"
  async (recipe) => {
    const { body, id } = recipe;
    const response = await updateRecipe(body, id);
    return response.data;
  },
);

export const softDeleteRecipeAsync = createAsyncThunk(
  'recipes/softDeleteRecipe',
  //recipe has the "data" and the "id"
  async (id) => {
    const response = await softDeleteRecipe(id);
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
    currentRecipe: null,
    fetchingRecipes: false,
    fetchingRecipe: false,
    creatingRecipe: false,
    updatingRecipe: false,
    softDeletingRecipe: false,
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
      .addCase(getRecipeByIdAsync.pending, (state) => {
        state.fetchingRecipe = true;
      })
      .addCase(getRecipeByIdAsync.fulfilled, (state, action) => {
        state.currentRecipe = { ...action.payload, id: action.meta.arg, rawMaterialId: action.meta.arg };
        state.fetchingRecipe = false;
      })
      .addCase(getRecipeByIdAsync.rejected, (state) => {
        state.fetchingRecipe = false;
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
      .addCase(updateRecipeAsync.pending, (state) => {
        state.updatingRecipe = true;
      })
      .addCase(updateRecipeAsync.fulfilled, (state, action) => {
        state.recipes = state.recipes.map((recipe) => {
          if(recipe.id === action.meta.arg.id){
            //spread old recipe and overwrite data with new updated recipe's spread data
            return {
              ...recipe,
              ...action.payload
            };
          }
          else return recipe;
        })
        state.updatingRecipe = false;
      })
      .addCase(updateRecipeAsync.rejected, (state) => {
        state.updatingRecipe = false;
      })
      .addCase(softDeleteRecipeAsync.pending, (state) => {
        state.softDeletingRecipe = true;
      })
      .addCase(softDeleteRecipeAsync.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((recipe) => recipe.id !== action.meta.arg);
        state.softDeletingRecipe = false;
      })
      .addCase(softDeleteRecipeAsync.rejected, (state) => {
        state.softDeletingRecipe = false;
      })
  },
});

export const {
  setFetchingRecipes
} = recipesSlice.actions;

export default recipesSlice.reducer;
