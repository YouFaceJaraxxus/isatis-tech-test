import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../reducers/recipesSlice';
import productsReducer from '../reducers/productsSlice';
import commonReducer from '../reducers/commonSlice';
import authReducer from '../reducers/authSlice';
import rawMaterialsReducer from '../reducers/rawMaterialsSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    products: productsReducer,
    common: commonReducer,
    auth: authReducer,
    rawMaterials: rawMaterialsReducer
  },
});

export default store;
