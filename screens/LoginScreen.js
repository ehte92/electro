import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import TextInput from "../components/TextInput";
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
      <ScrollView>
        <Container>
          <Image
            source={require("../assets/images/login_logo.png")}
            size="xl"
            mt="6"
            alt="logo"
          />
          <Heading fontSize={24} fontFamily="heading" fontWeight={600} py={8}>
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
            returnKeyType="done"
            mb="-2"
          />
          <Box width="100%" alignItems="flex-end">
            <Pressable
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text
                fontSize="sm"
                fontFamily="body"
                fontWeight={500}
                color="darkBlue.500"
              >
                Forgot your Password?
              </Text>
            </Pressable>
          </Box>
          <Button
            width="100%"
            borderRadius={20}
            bg="primary.300"
            shadow={3}
            marginY="2"
            _text={{
              color: "white",
              fontFamily: "heading",
              fontWeight: 700,
              fontSize: "md",
              lineHeight: "lg",
            }}
            onPress={onLoginPressed}
          >
            LOGIN
          </Button>
          <Box flexDir="row">
            <Text fontFamily="body">Don't have account?</Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                fontFamily="body"
                fontWeight={500}
                color="darkBlue.500"
                ml={1}
              >
                Sign up
              </Text>
            </Pressable>
          </Box>
        </Container>
      </ScrollView>
    </Background>
  );
}
