import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ColorPicker, {
  Preview,
  OpacitySlider,
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from "reanimated-color-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  FAB,
  Portal,
  Modal,
  TextInput,
  useTheme,
  Button,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  roomAdded,
  deviceAdded,
  roomRemoved,
  roomTemporary,
  deviceRemoved,
} from "../redux/slicers/roomsSlice";
import devicesAll from "../../devices";
import ElectricalDevices from "../components/electricalDevices";
import ListRooms from "../components/listRooms";

export default function Calculator({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [nameInput, setNameInput] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  let color;

  const rooms = useSelector((state) => state.rooms);

  const generateRandomColor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  const deviceAddedHandler = (id) => {
    dispatch(deviceAdded(id));
  };

  const deviceRemoveHandler = (id) => {
    dispatch(deviceRemoved(id));
  };
  const roomAddedHandler = () => {
    setOpen(false);
    setNameInput("");
    dispatch(roomAdded(nameInput));
  };
  const dismissHandler = () => {
    setOpen(false);
    setOpenColor(false);
    dispatch(roomRemoved());
  };
  const pressHandler = () => {
    setOpen(true);
    color = generateRandomColor();
    setCurrentColor(color);
    dispatch(roomTemporary());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FAB style={styles.fab} icon="plus" size="large" onPress={pressHandler} />

      <Portal>
        <Modal
          visible={open}
          onDismiss={dismissHandler}
          contentContainerStyle={{
            ...styles.modal,
            backgroundColor: theme.colors.elevation.level3,
          }}
        >
          <View style={{ width: "100%", height: "100%" }}>
            {openColor ? (
              <View
                style={{
                  height: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableRipple
                    onPress={() => {
                      setCurrentColor(color);
                      setOpenColor(false);
                    }}
                  >
                    <MCIcons name="arrow-left" size={25} />
                  </TouchableRipple>
                  <Text>Personalização</Text>
                </View>
                <View style={{ height: "100%" }}>
                  <ColorPicker
                    sliderThickness={30}
                    thumbSize={40}
                    thumbShape="pill"
                  >
                    <Preview
                      textStyle={{ fontSize: 18 }}
                      colorFormat="hex"
                      hideInitialColor
                    />
                    <Text>Hue:</Text>
                    <HueSlider />
                    <Text>Brightness:</Text>
                    <BrightnessSlider />
                  </ColorPicker>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>Novo cômodo</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 25,
                  }}
                >
                  <TextInput
                    label="Nome"
                    value={nameInput}
                    onChangeText={(text) => setNameInput(text)}
                    style={{
                      backgroundColor: theme.colors.elevation.level3,
                      width: "70%",
                    }}
                  />
                  <TouchableRipple
                    style={{
                      backgroundColor: currentColor,
                      width: 40,
                      height: 40,
                      borderColor: "#696969",
                      borderWidth: 1,
                      borderRadius: 30,
                    }}
                    onPress={() => setOpenColor(true)}
                  >
                    <Text> </Text>
                  </TouchableRipple>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginHorizontal: "auto",
                    flexWrap: "wrap",
                  }}
                >
                  {devicesAll.map((device) => {
                    return (
                      <ElectricalDevices
                        item={device}
                        addedHandler={deviceAddedHandler}
                        removedHandler={deviceRemoveHandler}
                        theme={theme}
                        temporary={rooms.temporary}
                      />
                    );
                  })}
                </View>
                <Button
                  disabled={nameInput == "" || nameInput == null}
                  icon="check"
                  onPress={() => roomAddedHandler()}
                >
                  Criar cômodo
                </Button>
              </View>
            )}
          </View>
        </Modal>
      </Portal>

      <ListRooms rooms={rooms} devicesAll={devicesAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  modal: {
    padding: 30,
    borderRadius: 30,
    width: "90%",
    height: "70%",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "montserrat-semibold",
    fontSize: 25,
    alignSelf: "center",
    marginBottom: 25,
  },
});
