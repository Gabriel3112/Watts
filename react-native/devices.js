import FreezerOutline from "./assets/icons/Freezer-Outlined.svg";
import FreezerFilled from "./assets/icons/Freezer-Filled.svg";

import MicrowaveOutline from "./assets/icons/Microwave-outlined.svg";
import MicrowaveFilled from "./assets/icons/Microwave-filled.svg";

import WashingMachineFilled from "./assets/icons/WashingMachine-Filled.svg";
import WashingMachineOutline from "./assets/icons/WashingMachine-Outlined.svg";

const devices = [
  {
    id: 0,
    name: "Freezer",
    IconOutline: FreezerOutline,
    IconFilled: FreezerFilled,
    consumption: 150,
  },
  {
    id: 1,
    name: "Microondas",
    IconOutline: MicrowaveOutline,
    IconFilled: MicrowaveFilled,
    consumption: 350,
  },
  {
    id: 2,
    name: "Lavadora",
    IconOutline: WashingMachineOutline,
    IconFilled: WashingMachineFilled,
    consumption: 50,
  },
];

export default devices;
