import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  posts: {},
  filters: { tags: [], title: "" },
  sort: "new",
};

export const slice = createSlice({
  name: "post",
  initialState: emptyState,
  reducers: {
    addPosts: {
      reducer(state, action) {
        action.payload.posts.forEach(
          (post) =>
            (state.posts[post.id] = {
              ...post,
              temperature: Number(post.temperature),
              time: post?.time?.map((time) => Number(time)),
            })
        );
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
    setSort: {
      reducer(state, action) {
        state.sort = action.payload.sort;
      },
      prepare(sort = "") {
        return { payload: { sort } };
      },
    },
  },
});

export const { addPosts, setFilters, setSort } = slice.actions;

export default slice.reducer;

export const getSort = (state) => state.post.sort;
