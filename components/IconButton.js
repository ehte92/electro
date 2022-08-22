import { AntDesign } from "@expo/vector-icons";
import { Box, Icon, Pressable } from "native-base";

export default function IconButton({ name, color, size, onPress, style }) {
  return (
    <Box
      alignSelf={"center"}
      justifyContent={"center"}
      my={2}
      rounded={"full"}
      shadow={3}
    >
      <Pressable
        paddingBottom={1}
        android_ripple={{
          color: "muted.400",
          borderless: true,
        }}
        onPress={onPress}
      >
        <Icon
          as={AntDesign}
          name={name}
          color={color}
          size={size}
          bg="white"
          rounded="full"
        />
      </Pressable>
    </Box>
  );
}
