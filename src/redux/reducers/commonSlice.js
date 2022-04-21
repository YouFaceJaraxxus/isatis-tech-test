import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    showSnackbar: false,
    snackbarText: '',
    snackbarType: '',
    navbarDropdownOpen: false,
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.showSnackbar = true;
      state.snackbarText = action.payload.text;
      state.snackbarType = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.showSnackbar = false;
      state.snackbarText = '';
      state.snackbarType = '';
    },
    setNavbarDropdownOpen: (state, action) => {
      state.navbarDropdownOpen = action.payload;
    }
  },
});

export const {
  openSnackbar,
  closeSnackbar,
  setNavbarDropdownOpen
} = commonSlice.actions;

export default commonSlice.reducer;
