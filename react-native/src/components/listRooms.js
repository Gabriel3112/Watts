import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function ListRooms({ rooms, devicesAll }) {
  const theme = useTheme();
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      {rooms.all.length != 0 ? (
        <View style={styles.chartContainer}>
          <PieChart
            style={styles.chart}
            data={rooms.all}
            width={(screenWidth * 90) / 100}
            height={220}
            chartConfig={chartConfig}
            accessor={"totalConsumption"}
            backgroundColor={theme.colors.elevation.level1}
            center={[0, 0]}
            hasLegend={true}
          />
          <View style={styles.info}>
            <Text style={styles.fontInfo}>Cômodo</Text>
            <Text style={styles.fontInfo}>Consumo(KWh)</Text>
          </View>
          {rooms.all.map(({ name, totalConsumption }) => {
            return (
              <View key={name} style={styles.card}>
                <Text style={styles.titleCard}>{name}</Text>
                <Text style={styles.titleCard}>{totalConsumption}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Não há cômodos</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontFamily: "montserrat-semibold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    marginTop: 10,
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  titleCard: {
    fontSize: 40,
    fontFamily: "montserrat-regular",
  },
  chartContainer: { justifyContent: "center", alignItems: "center" },
  chart: { borderRadius: 12 },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth,
    padding: 10,
  },
  fontInfo: {
    fontSize: 15,
    fontFamily: "montserrat-semibold",
  },
});
