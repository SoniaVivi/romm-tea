import { createSlice } from "@reduxjs/toolkit";

const emptyState = { posts: {}, filters: { tags: [], title: "" } };

export const slice = createSlice({
  name: "post",
  initialState: emptyState,
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
    setFilters: {
      reducer(state, action) {
        state.filters.title = action.payload.title;
        state.filters.tags = action.payload.tags;
      },
      prepare(title = "", tags = []) {
        return { payload: { title, tags } };
      },
    },
  },
});

export const { addPosts, setFilters } = slice.actions;

export default slice.reducer;
