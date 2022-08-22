import { KeyboardAvoidingView } from "native-base";

export default function Container({ children, ...props }) {
  return (
    <KeyboardAvoidingView
      flex="1"
      px="10"
      py="20"
      width="100%"
      alignSelf="center"
      alignItems="center"
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
