import { Box, Text } from "native-base";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default function TabItem({ item, index }) {
  return (
    <Box flex={1} p={4} width={width} key={index}>
      <Text mt={4} maxW={width}>
        {item.content}
      </Text>
    </Box>
  );
}
