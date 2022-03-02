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
    setScore: {
      reducer(state, action) {
        let change;
        switch (action.payload.voteType) {
          case "up":
            change = 1;
            break;
          case "down":
            change = -1;
            break;
          case 0:
            change = state.posts[action.payload.id].voteType == 1 ? -1 : 1;
            break;
        }
        state.posts[action.payload.id].score = action.payload.score;
        state.posts[action.payload.id].voteType =
          action.payload.voteType == 0 ? 0 : change;
      },
      prepare(postId, voteType, score) {
        return { payload: { id: postId, voteType: voteType, score } };
      },
    },
  },
});

export const { addPosts, setFilters, setSort, setScore } = slice.actions;

export default slice.reducer;

export const getSort = (state) => state.post.sort;
