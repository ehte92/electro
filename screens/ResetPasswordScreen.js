import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";
import Button from "../components/Button";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    navigation.navigate("Login");
  };
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
        <Text style={styles.header}>Restore Password</Text>
        <TextInput
          label="Email Address"
          iconPosition="left"
          icon={
            <MaterialIcons name="alternate-email" size={24} color="black" />
          }
          placeholder="Enter Email"
          value={email.value || ""}
          error={email.error}
          onChangeText={(value) => setEmail({ value: value, error: "" })}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          returnKeyType="done"
        />
        <Text style={styles.description}>
          You will receive email with password reset link.
        </Text>
        <Button
          title="Send Instructions"
          type="outlined"
          onPress={sendResetPasswordEmail}
          style={{ marginTop: 16 }}
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
    //justifyContent: "center",
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
  description: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
});
