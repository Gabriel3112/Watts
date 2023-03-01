import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ProgressBar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Webview({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  const { url } = route.params;
  console.log(url);
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{ marginEnd: 10 }}
          onPress={() => navigation.navigate("NewsTab")}
        >
          <MCIcons name="arrow-left" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={{ color: "#fff", fontSize: 15 }}>
          {currentURL}
        </Text>
      </View>
      {loading && (
        <ProgressBar progress={progress} color={theme.colors.primary} />
      )}
      <WebView
        source={{ uri: url }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onNavigationStateChange={(webState) => {
          setCurrentURL(webState.url);
          setLoading(webState.loading);
        }}
      />
    </SafeAreaView>
  );
}
