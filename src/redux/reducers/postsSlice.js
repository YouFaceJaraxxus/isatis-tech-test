import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    fetchingPosts: false,
  },
  reducers: {
    setFetchingPosts: (state, action) => {
      state.fetchingPosts = action.payload;
    }
  },
});

export const { setFetchingPosts } = postsSlice.actions;

export default postsSlice.reducer;
