import { createSlice } from '@reduxjs/toolkit';
import { LIGHT_THEME } from '../../common/config/config';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    showSnackbar: true,
    snackbarText: 'aa',
    snackbarType: 'aaa',
    navbarDropdownOpen: false,
    theme: LIGHT_THEME,
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
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  },
});

export const {
  openSnackbar,
  closeSnackbar,
  setNavbarDropdownOpen,
  setTheme,
} = commonSlice.actions;

export default commonSlice.reducer;
