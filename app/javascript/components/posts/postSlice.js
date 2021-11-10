import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "post",
  initialState: { posts: {} },
  reducers: {
    addPosts: {
      reducer(state, action) {
        action.payload.posts.forEach((post) => (state[post.id] = post));
      },
      prepare(posts) {
        if (posts.constructor === Array) {
          return { payload: { posts } };
        } else {
          return { payload: { posts: [posts] } };
        }
      },
    },
  },
});

export const { addPosts } = slice.actions;

export default slice.reducer;
