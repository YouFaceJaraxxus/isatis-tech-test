import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllRawMaterials, getRawMaterialById } from '../../services/rawMaterials/rawMaterialsService';

export const getRawMaterialsAsync = createAsyncThunk(
  'rawMaterials/getRawMaterials',
  async () => {
    const response = await getAllRawMaterials();
    return response.data;
  }
);

export const getRawMaterialByIdAsync = createAsyncThunk(
  'rawMaterials/getRawMaterialById',
  async (id) => {
    const response = await getRawMaterialById(id);
    return response.data;
  }
);

const getArrayFromObject = (recipeObject) => Object.entries(recipeObject)
  .map(([key, value]) => {
    return {
      id: key,
      ...value
    }
  });

export const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    rawMaterials: [],
    currentRawMaterial: null,
    fetchingRawMaterials: false,
    fetchingRawMaterial: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getRawMaterialsAsync.pending, (state) => {
      state.fetchingRawMaterials = true;
    })
      .addCase(getRawMaterialsAsync.fulfilled, (state, action) => {
        //we can't get arrays from firebase, only objects, which we can turn into arrays and manipulate as arrays
        state.rawMaterials = getArrayFromObject(action.payload);
        state.fetchingRawMaterials = false;
      })
      .addCase(getRawMaterialsAsync.rejected, (state) => {
        state.fetchingRawMaterials = false;
      })
      .addCase(getRawMaterialByIdAsync.pending, (state) => {
        state.fetchingRawMaterial = true;
      })
      .addCase(getRawMaterialByIdAsync.fulfilled, (state, action) => {
        state.currentRawMaterial = { ...action.payload, id: action.meta.arg };
        state.fetchingRawMaterial = false;
      })
      .addCase(getRawMaterialByIdAsync.rejected, (state) => {
        state.fetchingRawMaterial = false;
      })
  },
});

export default rawMaterialsSlice.reducer;
