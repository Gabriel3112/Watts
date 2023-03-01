import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  VirtualizedList,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useTheme, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { URL_API } from "@env";
import NewsContent from "../components/newsLoader";
import NewsCard from "../components/newsCard";

export default function News({ navigation }) {
  const theme = useTheme();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (page = 1) => {
    if (loading || finalPage) return;

    setLoading(true);

    try {
      const response = await fetch(URL_API + `/news/get?page=${page}`);
      const data = await response.json();

      if (data.length > 0) {
        setNews([...news, ...data]);
        setPage(page + 1);
      } else {
        setFinalPage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);

    try {
      const response = await fetch(URL_API + `/news/get?page=1`);
      const data = await response.json();
      setNews([...data]);
      setPage(2);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Webview", {
            url: item.link,
          })
        }
      >
        <NewsCard item={item} theme={theme} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VirtualizedList
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            <Text style={styles.title}>TÓPICOS </Text>
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              EM ALTA{" "}
            </Text>
            <MCIcons
              name="trending-up"
              size={45}
              color={theme.colors.primary}
            />
          </View>
        )}
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onEndReached={finalPage ? false : async () => await fetchNews(page)}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              await onRefresh();
            }}
          />
        }
        ListFooterComponent={finalPage ? false : <NewsContent />}
        getItemCount={(data) => data.length}
        getItem={(item, index) => item[index]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-semibold",
    fontSize: 30,
  },
});
