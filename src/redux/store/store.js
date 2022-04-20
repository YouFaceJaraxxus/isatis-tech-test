import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../reducers/recipesSlice';
import commonReducer from '../reducers/commonSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    common: commonReducer,
  },
});

export default store;
