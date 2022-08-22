import { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TextInput from "../components/TextInput";
import { confirmPasswordValidator } from "../helpers/confirmPasswordValidator";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Background from "../components/Background";
import Container from "../components/Container";
import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";

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
          <TextInput
            label="Password"
            iconPosition="right"
            icon={
              <Pressable onPress={() => setIsSecureEntry(!isSecureEntry)}>
                <Icon
                  as={<Ionicons name={isSecureEntry ? "eye" : "eye-off"} />}
                  size={5}
                  mr="2"
                  color="black"
                />
              </Pressable>
            }
            placeholder="Enter Password"
            value={password.value || ""}
            error={password.error}
            onChangeText={(value) => setPassword({ value: value, error: "" })}
            type={isSecureEntry ? "password" : "text"}
            returnKeyType="next"
          />
          <TextInput
            label="Re-enter Password"
            iconPosition="right"
            icon={
              <Pressable onPress={() => setIsSecureEntry2(!isSecureEntry2)}>
                <Icon
                  as={<Ionicons name={isSecureEntry2 ? "eye" : "eye-off"} />}
                  size={5}
                  mr="2"
                  color="black"
                />
              </Pressable>
            }
            placeholder="Confirm Password"
            value={confirmPassword.value || ""}
            error={confirmPassword.error}
            onChangeText={(value) =>
              setConfirmPassword({ value: value, error: "" })
            }
            type={isSecureEntry2 ? "password" : "text"}
            returnKeyType="done"
          />
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
            onPress={onSignupPressed}
          >
            SIGN UP
          </Button>
          <Box flexDirection="row">
            <Text fontFamily="body" fontWeight={400}>
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text fontFamily="body" fontWeight={400} color="primary.300">
                Login
              </Text>
            </Pressable>
          </Box>
        </Container>
      </ScrollView>
    </Background>
  );
}
