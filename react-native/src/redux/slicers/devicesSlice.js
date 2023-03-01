import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  addedDevices: [],
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    adding: (state, action) => {
      state.addedDevices.push({ ...action.payload });
    },
  },
});
