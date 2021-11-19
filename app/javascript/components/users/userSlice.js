import { createSlice } from "@reduxjs/toolkit";

const emptyState = { name: "" };

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
  },
});

export const { setUserName } = slice.actions;

export default slice.reducer;
