import "react-native-gesture-handler";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import Navigator from "./routes/drawer";
import { View } from "react-native";

const getFonts = () =>
  Font.loadAsync({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const onFontsLoaded = useCallback(() => {
    setFontLoaded(true);
  }, []);
  useEffect(() => {
    SplashScreen.hideAsync();
    getFonts().then(onFontsLoaded);
  }, []);
  return <View style={{ flex: 1 }}>{fontLoaded && <Navigator />}</View>;
}
