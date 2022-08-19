import { useState } from "react";
import {
  Dimensions,
  Platform,
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
import Background from "../components/Background";
import Container from "../components/Container";
import styled from "@emotion/native";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

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
    <Background>
      <ScrollView>
        <Container
          style={{
            marginTop: isIphoneX() ? 88 : 64,
          }}
        >
          <Image source={require("../assets/images/login_logo.png")} />
          <Header>Create Account</Header>
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
          <Row>
            <Text style={{
              fontFamily: "Poppins-Regular",
            }}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Link>Login</Link>
            </Pressable>
          </Row>
        </Container>
      </ScrollView>
    </Background>
  );
}

const Image = styled.Image`
  width: 110px;
  height: 110px;
  margin-bottom: 8px;
`;
const Header = styled.Text`
  font-size: 24px;
  font-family: "Poppins-Medium"
  padding-vertical: 12px;
`;
const Row = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;
const Link = styled.Text`
  font-family: "Poppins-Medium"
  color: ${colors.primary};
`;
