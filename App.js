import "react-native-gesture-handler";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { extendTheme, NativeBaseProvider } from "native-base";
import Navigator from "./routes/drawer";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

const getFonts = () =>
  Font.loadAsync({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

const newColorTheme = {
  primary: {
    50: "#fffae1",
    100: "#ffee9d",
    200: "#fee048",
    300: "#f9d000",
    400: "#e7c100",
    500: "#d3b000",
    600: "#bd9d00",
    700: "#a28700",
    800: "#806b00",
    900: "#4b3f00",
  },
};

const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Thin",
      },
      200: {
        normal: "Poppins-ExtraLight",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-SemiBold",
      },
      700: {
        normal: "Poppins-Bold",
      },
      800: {
        normal: "Poppins-ExtraBold",
      },
      900: {
        normal: "Poppins-Black",
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const onFontsLoaded = useCallback(() => {
    setFontLoaded(true);
  }, []);
  // useEffect(() => {
  //   getFonts().then(onFontsLoaded);
  //   SplashScreen.hideAsync();
  // }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
      })
        .then((res) => {
          console.log("FONTS LOADED");
          setFontLoaded(true);
          SplashScreen.hideAsync();
        })
        .catch((err) => {
          setFontLoaded(false);
          console.log(err);
        });
    }
    loadFonts();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#f9d000" />
        {fontLoaded && <Navigator />}
      </View>
    </NativeBaseProvider>
  );
}
