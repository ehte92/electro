import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import colors from "../assets/theme/colors";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
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
        <Text style={styles.header}>Welcome back</Text>
        <TextInput
          label="Username or Email"
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
        />
        <TextInput
          label="Password"
          iconPosition="right"
          icon={
            <Pressable
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}
            >
              {isSecureEntry ? (
                <Ionicons name="eye" size={24} color="black" />
              ) : (
                <Ionicons name="eye-off" size={24} color="black" />
              )}
            </Pressable>
          }
          placeholder="Enter Password"
          value={password.value || ""}
          error={password.error}
          onChangeText={(value) => setPassword({ value: value, error: "" })}
          secureTextEntry={isSecureEntry}
          returnKeyType="done"
        />
        <View style={styles.forgotPassword}>
          <Pressable
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text style={styles.forgot}>Forgot your Password?</Text>
          </Pressable>
        </View>
        <Button
          title="LOGIN"
          type="filled"
          onPress={onLoginPressed}
        />
        <View style={styles.row}>
          <Text>Don't have account?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Sign up</Text>
          </Pressable>
        </View>
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: colors.secondary,
    marginLeft: 4,
  },
});
