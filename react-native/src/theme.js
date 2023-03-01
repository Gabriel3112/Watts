import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";
import merge from "deepmerge";
//Themes
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
  dark: NavigationDarkTheme,
});

export const combinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const combinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
//Changes
//
//Default Theme
combinedDefaultTheme.colors = {
  primary: "rgb(0, 86, 210)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(218, 226, 255)",
  onPrimaryContainer: "rgb(0, 24, 71)",
  secondary: "rgb(88, 94, 113)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(220, 226, 249)",
  onSecondaryContainer: "rgb(21, 27, 44)",
  tertiary: "rgb(115, 84, 113)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(254, 215, 249)",
  onTertiaryContainer: "rgb(43, 18, 43)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(254, 251, 255)",
  onBackground: "rgb(27, 27, 31)",
  surface: "rgb(254, 251, 255)",
  onSurface: "rgb(27, 27, 31)",
  surfaceVariant: "rgb(225, 226, 236)",
  onSurfaceVariant: "rgb(69, 70, 79)",
  outline: "rgb(117, 119, 128)",
  outlineVariant: "rgb(197, 198, 208)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(48, 48, 52)",
  inverseOnSurface: "rgb(242, 240, 244)",
  inversePrimary: "rgb(178, 197, 255)",
  elevation: {
    level0: "transparent",
    level1: "rgb(241, 243, 253)",
    level2: "rgb(234, 238, 251)",
    level3: "rgb(226, 233, 250)",
    level4: "rgb(224, 231, 250)",
    level5: "rgb(218, 228, 249)",
  },
  surfaceDisabled: "rgba(27, 27, 31, 0.12)",
  onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
  backdrop: "rgba(46, 48, 56, 0.4)",
  buttonTabBar: "#000217",
};
/*combinedDefaultTheme.colors.primary = "#0056d2";
combinedDefaultTheme.colors.onPrimary = "#ffffff";
combinedDefaultTheme.colors.primaryContainer = "#dae2ff";
combinedDefaultTheme.colors.onPrimaryContainer = "#001848";
combinedDefaultTheme.colors.background = "#fbfcfe";
combinedDefaultTheme.colors.onBackground = "#191c1e";
combinedDefaultTheme.colors.surface = "#fbfcfe";
combinedDefaultTheme.colors.onSurface = "#191c1e";
combinedDefaultTheme.colors.outline = "#757780";
combinedDefaultTheme.colors.onSurfaceVariant = "#45464f";
combinedDefaultTheme.colors.surfaceVariant = "#e1e2ec";
combinedDefaultTheme.colors.secondary = "#585e71";
combinedDefaultTheme.colors.onSecondary = "#ffffff";
combinedDefaultTheme.colors.secondaryContainer = "#dce2f9";
combinedDefaultTheme.colors.onSecondaryContainer = "#151b2c";
combinedDefaultTheme.colors.tertiary = "#735471";
combinedDefaultTheme.colors.onTertiary = "#ffffff";
combinedDefaultTheme.colors.tertiaryContainer = "#fed7f9";
combinedDefaultTheme.colors.onTertiaryContainer = "#2b122b";
combinedDefaultTheme.colors.error = "#ba1a1a";
combinedDefaultTheme.colors.onError = "#ffffff";
combinedDefaultTheme.colors.errorContainer = "#ffdad6";
combinedDefaultTheme.colors.onErrorContainer = "#410002";
combinedDefaultTheme.colors.buttonTabBar = "#000217";*/

//
//Dark Theme
combinedDarkTheme.colors = {
  primary: "rgb(178, 197, 255)",
  onPrimary: "rgb(0, 44, 114)",
  primaryContainer: "rgb(0, 64, 161)",
  onPrimaryContainer: "rgb(218, 226, 255)",
  secondary: "rgb(192, 198, 221)",
  onSecondary: "rgb(42, 48, 66)",
  secondaryContainer: "rgb(64, 70, 89)",
  onSecondaryContainer: "rgb(220, 226, 249)",
  tertiary: "rgb(225, 187, 221)",
  onTertiary: "rgb(65, 39, 65)",
  tertiaryContainer: "rgb(90, 61, 89)",
  onTertiaryContainer: "rgb(254, 215, 249)",
  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 180, 171)",
  background: "rgb(27, 27, 31)",
  onBackground: "rgb(228, 226, 230)",
  surface: "rgb(27, 27, 31)",
  onSurface: "rgb(228, 226, 230)",
  surfaceVariant: "rgb(69, 70, 79)",
  onSurfaceVariant: "rgb(197, 198, 208)",
  outline: "rgb(143, 144, 154)",
  outlineVariant: "rgb(69, 70, 79)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(228, 226, 230)",
  inverseOnSurface: "rgb(48, 48, 52)",
  inversePrimary: "rgb(0, 86, 210)",
  elevation: {
    level0: "transparent",
    level1: "rgb(35, 36, 42)",
    level2: "rgb(39, 41, 49)",
    level3: "rgb(44, 46, 56)",
    level4: "rgb(45, 47, 58)",
    level5: "rgb(48, 51, 62)",
  },
  surfaceDisabled: "rgba(228, 226, 230, 0.12)",
  onSurfaceDisabled: "rgba(228, 226, 230, 0.38)",
  backdrop: "rgba(46, 48, 56, 0.4)",
  buttonTabBar: "#d9dffa",
};
/*combinedDarkTheme.colors.primary = "#b2c5ff";
combinedDarkTheme.colors.onPrimary = "#002b73";
combinedDarkTheme.colors.primaryContainer = "#0040a1";
combinedDarkTheme.colors.onPrimaryContainer = "#dae2ff";
combinedDarkTheme.colors.secondary = "#c0c6dd";
combinedDarkTheme.colors.onSecondary = "#2a3042";
combinedDarkTheme.colors.secondaryContainer = "#404659";
combinedDarkTheme.colors.onSecondaryContainer = "#dce2f9";
combinedDarkTheme.colors.tertiary = "#e1bbdd";
combinedDarkTheme.colors.onTertiary = "#422741";
combinedDarkTheme.colors.tertiaryContainer = "#5a3d59";
combinedDarkTheme.colors.onTertiaryContainer = "#fed7f9";
combinedDarkTheme.colors.error = "#ffb4ab";
combinedDarkTheme.colors.onError = "#690005";
combinedDarkTheme.colors.errorContainer = "#93000a";
combinedDarkTheme.colors.onErrorContainer = "#ffdad6";
combinedDarkTheme.colors.background = "#1b1b1f";
combinedDarkTheme.colors.onBackground = "#e4e2e6";
combinedDarkTheme.colors.surface = "#1b1b1f";
combinedDarkTheme.colors.onSurface = "#e4e2e6";
combinedDarkTheme.colors.outline = "#8f909a";
combinedDarkTheme.colors.surfaceVariant = "#45464f";
combinedDarkTheme.colors.onSurfaceVariant = "#c5c6d0";
combinedDarkTheme.colors.buttonTabBar = "#d9dffa";*/
