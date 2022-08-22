import { Button, Heading, Image, Text } from "native-base";
import Background from "../components/Background";
import Container from "../components/Container";

export default function ProfileScreen({ navigation }) {
  return (
    <Background>
      <Container>
        <Image
          source={require("../assets/images/login_logo.png")}
          size="xl"
          mt="8"
          alt="logo"
        />
        <Heading fontSize={24} fontFamily="heading" fontWeight={600} py={6}>
          Get Started
        </Heading>
        <Text
          fontSize="md"
          fontFamily="body"
          fontWeight={400}
          lineHeight="md"
          textAlign="center"
          mb={8}
        >
          Hello there! Sign in to your account or sign up to get started.
        </Text>
        <Button
          width="100%"
          borderRadius={20}
          bg="primary.300"
          shadow={3}
          marginBottom={8}
          _text={{
            color: "white",
            fontFamily: "heading",
            fontWeight: 700,
            fontSize: "md",
            lineHeight: "lg",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          LOGIN
        </Button>
        <Button
          width="100%"
          borderRadius={20}
          variant="outline"
          borderColor="primary.300"
          borderWidth={2}
          _text={{
            color: "primary.300",
            fontFamily: "heading",
            fontWeight: 700,
            fontSize: "md",
            lineHeight: "lg",
          }}
          onPress={() => navigation.navigate("Signup")}
        >
          SIGN UP
        </Button>
      </Container>
    </Background>
  );
}
