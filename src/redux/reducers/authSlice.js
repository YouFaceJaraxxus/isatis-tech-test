import { createSlice } from '@reduxjs/toolkit';
import { USER_LOCAL_STORAGE_KEY } from '../../common/config/config';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    //this one starts as false, we check the local storage in the root of the app and then set this to true
    //if we haven't checked if logged in, the user is in a "0" permission state and will be sent to the Main comp.
    checkedIsLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.checkedIsLoggedIn = true;
      const userLocalStorageObject = {
        isLogged: action.payload
      };
      if(action.payload === true){
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userLocalStorageObject));
      } else {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userLocalStorageObject));
      }
    },
    setCheckedIsLoggedIn: (state, action) => {
      state.checkedIsLoggedIn = action.payload;
    }
  }
});

export const {
  setLoggedIn,
  setCheckedIsLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;