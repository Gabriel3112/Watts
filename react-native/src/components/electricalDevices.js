import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ElectricalDevices({
  item,
  addedHandler,
  removedHandler,
  theme,
  temporary,
}) {
  const heightOffset = useSharedValue(100);
  const { IconFilled, IconOutline, id, name } = item;
  const device =
    temporary.devices != undefined
      ? temporary.devices.find((d) => d.id == id)
      : undefined;

  const quantity = device != undefined ? device.quantity : 0;

  const quantityShow = useAnimatedStyle(() => {
    return {
      height: heightOffset.value,
    };
  });

  useEffect(() => {
    if (quantity == 0) {
      heightOffset.value = withTiming(100, { duration: 500 });
    }
  }, [quantity]);

  return (
    <Animated.View
      style={[
        styles.containerDevice,
        quantityShow,
        { backgroundColor: theme.colors.card },
      ]}
    >
      <TouchableRipple
        onPress={() => {
          addedHandler(id);
          heightOffset.value = withTiming(120, { duration: 500 });
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={2}>{name}</Text>

          {quantity > 0 ? (
            <IconFilled
              width="50"
              height="50"
              fill={theme.colors.buttonTabBar}
            />
          ) : (
            <IconOutline
              width="50"
              height="50"
              fill={theme.colors.buttonTabBar}
            />
          )}
        </View>
      </TouchableRipple>
      {quantity > 0 && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>{quantity}</Text>
          <TouchableRipple onPress={() => removedHandler(id)}>
            <MCIcons name="minus" color={theme.colors.error} size={25} />
          </TouchableRipple>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerDevice: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    width: 100,
  },
});
