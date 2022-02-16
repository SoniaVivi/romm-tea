import { createSlice } from "@reduxjs/toolkit";

const emptyState = { name: "", theme: "light" };

export const slice = createSlice({
  name: "user",
  initialState: emptyState,
  reducers: {
    setUserName: {
      reducer(state, action) {
        state.name = action.payload.name;
      },
      prepare(name = "") {
        return { payload: { name } };
      },
    },
    toggleTheme: {
      reducer(state) {
        state.theme = state.theme == "light" ? "dark" : "light";
      },
      prepare() {
        return { payload: {} };
      },
    },
  },
});

export const { setUserName, toggleTheme } = slice.actions;

export default slice.reducer;
