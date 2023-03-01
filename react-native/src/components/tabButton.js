import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text, useTheme } from "react-native-paper";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const theme = useTheme();

  const offSet = useSharedValue(0);
  const flexing = useSharedValue(0);

  const styleBar = useAnimatedStyle(() => {
    return {
      paddingEnd: offSet.value,
    };
  });

  const containerBar = useAnimatedStyle(() => {
    return {
      flex: flexing.value,
    };
  });

  useEffect(() => {
    if (focused) {
      offSet.value = withTiming(10, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      flexing.value = withTiming(1, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
    } else {
      offSet.value = 0;
      flexing.value = withTiming(0.8, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [focused]);

  return (
    <Animated.View
      style={[containerBar, { justifyContent: "center", alignItems: "center" }]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animated.View
          style={[
            styleBar,
            { backgroundColor: focused ? theme.colors.primaryContainer : null },
            styles.btn,
          ]}
        >
          <MCIcons
            name={focused ? item.icon : item.iconOutline}
            size={30}
            color={theme.colors.buttonTabBar}
          />
          {focused && (
            <Text
              style={{
                color: theme.colors.buttonTabBar,
                fontWeight: "bold",
              }}
            >
              {item.label}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 8,
    paddingStart: 8,
  },
});

export default TabButton;
