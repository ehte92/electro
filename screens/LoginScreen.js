import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Platform, Pressable, Text } from "react-native";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import colors from "../assets/theme/colors";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import styled, { css } from "@emotion/native";
import Background from "../components/Background";
import Container from "../components/Container";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

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
    <Background>
      <Container
        style={{
          marginTop: isIphoneX() ? 88 : 64,
        }}
      >
        <Image source={require("../assets/images/login_logo.png")} />
        <Header>Welcome back</Header>
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
        <ForgotPasswordView>
          <Pressable
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <ForgotText>Forgot your Password?</ForgotText>
          </Pressable>
        </ForgotPasswordView>
        <Button title="LOGIN" type="filled" onPress={onLoginPressed} />
        <SignupView>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
            }}
          >
            Don't have account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={css`
                font-family: "Poppins-Medium";
                color: ${colors.secondary};
                margin-left: 4px;
              `}
            >
              Sign up
            </Text>
          </Pressable>
        </SignupView>
      </Container>
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
  font-family: "Poppins-Medium";
  padding-vertical: 12px;
`;
const ForgotPasswordView = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 16px;
`;
const ForgotText = styled.Text`
  font-size: 13px;
  font-family: "Poppins-Regular";
  color: ${colors.secondary};
`;
const SignupView = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;
