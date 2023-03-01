import moment from "moment";
import "moment/locale/pt-br";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NewsCard({ item, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.containerImg}>
        <Image
          style={{ width: 110, height: 110 }}
          source={{ uri: item.image }}
        />
      </View>
      <View
        style={{
          width: "70%",
          height: "75%",
          marginLeft: 10,
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "montserrat-medium",
            marginBottom: 8,
          }}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: 12, fontFamily: "montserrat-regular" }}>{`${
          item.publisher
        } • ${moment(item.date).fromNow()}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    width: "98%",
    height: 160,
    borderRadius: 20,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#fff",
    width: 110,
    height: 110,
    overflow: "hidden",
  },
});
