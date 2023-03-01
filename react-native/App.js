import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { combinedDefaultTheme, combinedDarkTheme } from "./src/theme";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./src/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import TabButton from "./src/components/tabButton";

//Screens
import NewsScreen from "./src/screen/news";
import CalculatorScreen from "./src/screen/calculator";
import UserScreen from "./src/screen/user";
import WebviewScreen from "./src/screen/webview";
import AddRooms from "./src/screen/addRooms";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabArr = [
  {
    route: "News",
    label: "Notícias",
    icon: "newspaper-variant",
    iconOutline: "newspaper-variant-outline",
    component: NewsScreen,
  },
  {
    route: "Calculator",
    label: "Consumo",
    icon: "calculator-variant",
    iconOutline: "calculator-variant-outline",
    component: CalculatorScreen,
  },
  {
    route: "User",
    label: "User",
    icon: "account-circle",
    iconOutline: "account-circle-outline",
    component: UserScreen,
  },
];

const TabNavigationComponent = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        elevation: 0,
        borderTopWidth: 0,
      },
      tabBarBackground: null,
    }}
  >
    {TabArr.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,

            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      );
    })}
  </Tab.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    "montserrat-thin": require("./assets/fonts/Montserrat-Thin.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={combinedDefaultTheme}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer theme={combinedDefaultTheme}>
            <Stack.Navigator
              initialRouteName="NewsTab"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="NewsTab" component={TabNavigationComponent} />
              <Stack.Screen name="Webview" component={WebviewScreen} />
              <Stack.Screen name="AddRooms" component={AddRooms} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
