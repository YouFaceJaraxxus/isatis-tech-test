import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    showSnackbar: false,
    snackbarText: '',
    snackbarType: '',
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
    }
  },
});

export const {
  openSnackbar,
  closeSnackbar
} = commonSlice.actions;

export default commonSlice.reducer;
