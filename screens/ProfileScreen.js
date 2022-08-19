import styled from "@emotion/native";
import { Dimensions, Platform } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Container from "../components/Container";

const Image = styled.Image`
  width: 110px;
  height: 110px;
  margin-bottom: 8px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-family: "Poppins-Medium";
  padding-vertical: 8px;
`;

const Text = styled.Text`
  font-size: 15px;
  font-family: "Poppins-Regular";
  line-height: 21px;
  text-align: center;
  margin-bottom: 12px;
`;

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

export default function ProfileScreen({ navigation }) {
  return (
    <Background>
      <Container
        style={{
          marginTop: isIphoneX() ? 88 : 64,
        }}
      >
        <Image source={require("../assets/images/login_logo.png")} />
        <Header>Get Started</Header>
        <Text>
          Hello there! Sign in to your account or sign up to get started.
        </Text>
        <Button
          title="LOGIN"
          type="filled"
          style={{
            shadowOffset: { width: 10, height: 10 },
            shadowColor: "black",
            shadowOpacity: 1,
            elevation: 3,
          }}
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="SIGN UP"
          type="outlined"
          onPress={() => navigation.navigate("Signup")}
        />
      </Container>
    </Background>
  );
}
