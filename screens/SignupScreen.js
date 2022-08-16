import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import { confirmPasswordValidator } from "../helpers/confirmPasswordValidator";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Button from "../components/Button";
import colors from "../assets/theme/colors";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  const onSignupPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value
    );
    if (emailError || passwordError || confirmPasswordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      return;
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image
            source={require("../assets/images/login_logo.png")}
            style={styles.image}
          />
          <Text style={styles.header}>Create Account</Text>
          <TextInput
            label="Email"
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
            returnKeyType="next"
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
            autoCapitalize="none"
            secureTextEntry={isSecureEntry}
            returnKeyType="next"
          />
          <TextInput
            label="Confirm Password"
            iconPosition="right"
            icon={
              <Pressable
                onPress={() => {
                  setIsSecureEntry2((prev) => !prev);
                }}
              >
                {isSecureEntry2 ? (
                  <Ionicons name="eye" size={24} color="black" />
                ) : (
                  <Ionicons name="eye-off" size={24} color="black" />
                )}
              </Pressable>
            }
            placeholder="Confirm Password"
            value={confirmPassword.value || ""}
            error={confirmPassword.error}
            onChangeText={(value) =>
              setConfirmPassword({ value: value, error: "" })
            }
            autoCapitalize="none"
            secureTextEntry={isSecureEntry2}
            returnKeyType="done"
          />
          <Button title="Sign Up" type="filled" onPress={onSignupPressed} />
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Login</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: colors.primary,
  },
});
