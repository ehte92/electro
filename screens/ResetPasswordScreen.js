import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";
import Button from "../components/Button";
import Background from "../components/Background";
import Container from "../components/Container";
import styled from "@emotion/native";
import { Dimensions, Platform } from "react-native";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

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
    <Background>
      <Container
        style={{
          marginTop: isIphoneX() ? 88 : 64,
        }}
      >
        <Image source={require("../assets/images/login_logo.png")} />
        <Header>Restore Password</Header>
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
        <Description>
          You will receive email with password reset link.
        </Description>
        <Button
          title="Send Instructions"
          type="filled"
          onPress={sendResetPasswordEmail}
          style={{ marginTop: 16 }}
        />
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
const Description = styled.Text`
  font-size: 12px;
  font-family: "Poppins-Regular";
  color: black;
  text-align: center;
`;
