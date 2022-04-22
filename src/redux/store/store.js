import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../reducers/recipesSlice';
import commonReducer from '../reducers/commonSlice';
import authReducer from '../reducers/authSlice'

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    common: commonReducer,
    auth: authReducer
  },
});

export default store;
