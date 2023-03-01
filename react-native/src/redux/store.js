import { configureStore } from "@reduxjs/toolkit";
import roomsSlice from "./slicers/roomsSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsSlice,
  },
});
