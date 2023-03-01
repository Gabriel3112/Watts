import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>User</Text>
      </View>
    </SafeAreaView>
  );
}
