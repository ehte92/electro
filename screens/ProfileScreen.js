import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";
import Button from "../components/Button";

export default function ProfileScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/images/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../assets/images/login_logo.png")}
          style={styles.image}
        />
        <Text style={styles.header}>Get Started</Text>
        <Text style={styles.text}>
          Hello there! Sign in to your account or sign up to get started.
        </Text>
        <Button
          title="LOGIN"
          type="filled"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="SIGN UP"
          type="outlined"
          onPress={() => navigation.navigate("Signup")}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
  },
});
