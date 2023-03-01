import { createSlice } from "@reduxjs/toolkit";
import devicesAll from "../../../devices";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: { temporary: {}, all: [] },
  reducers: {
    roomTemporary(state) {
      state.temporary = {
        name: null,
        id: state.all.length + 1,
        devices: [],
        totalConsumption: 0,
        color: null,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    },
    roomRemoved(state, action) {
      state.temporary = {};
    },
    roomAdded(state, action) {
      state.temporary.name = action.payload;

      let consumptionSingle = 0;
      state.temporary.devices.map((device) => {
        consumptionSingle =
          consumptionSingle +
          devicesAll.find((all) => all.id == device.id).consumption;
      });
      state.temporary.totalConsumption = consumptionSingle;

      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      state.temporary.color = "#" + randomColor;
      state.all.push(state.temporary);
    },
    deviceAdded(state, action) {
      const device = state.temporary.devices.find(
        (d) => d.id == action.payload
      );
      device
        ? (device.quantity += 1)
        : state.temporary.devices.push({
            id: action.payload,
            quantity: 1,
          });
    },
    deviceRemoved(state, action) {
      const device = state.temporary.devices.find(
        (d) => d.id == action.payload
      );

      if (device) {
        if (device.quantity == 1) {
          state.temporary.devices.splice(
            state.temporary.devices.findIndex((d) => d.id == action.payload),
            1
          );
          console.log(state.temporary.devices);
          return;
        }
        device.quantity -= 1;
      }
    },
  },
});

export const {
  roomAdded,
  deviceAdded,
  deviceRemoved,
  roomRemoved,
  roomTemporary,
} = roomsSlice.actions;
export default roomsSlice.reducer;
