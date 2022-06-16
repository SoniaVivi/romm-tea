import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  filters: { tags: [], title: "" },
  sort: "new",
};

export const slice = createSlice({
  name: "option",
  initialState: emptyState,
  reducers: {
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

export const { setFilters, setSort } = slice.actions;

export default slice.reducer;

export const getSort = (state) => state.option.sort;
