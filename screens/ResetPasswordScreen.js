import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";
import Background from "../components/Background";
import Container from "../components/Container";
import { Button, Heading, Image, Text } from "native-base";

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
      <Container>
        <Image
          source={require("../assets/images/login_logo.png")}
          size="xl"
          alt="logo"
        />
        <Heading fontSize={24} fontFamily="heading" fontWeight={600} py={4}>
          Welcome back
        </Heading>
        <TextInput
          label="Username or Email"
          iconPosition="left"
          icon={<MaterialIcons name="alternate-email" />}
          placeholder="Enter Email"
          value={email.value || ""}
          error={email.error}
          onChangeText={(value) => setEmail({ value: value, error: "" })}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <Text fontSize="xs" fontFamily="body" fontWeight="400" mb={3}>
          You will receive email with password reset link.
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
          onPress={sendResetPasswordEmail}
        >
          Send Instructions
        </Button>
      </Container>
    </Background>
  );
}
