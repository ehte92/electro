import { Box, Heading, Image, Pressable, Text } from "native-base";

export default function ProductCard({
  name,
  category,
  imageSource,
  price,
  onPress,
}) {
  return (
    <Box flex={1} margin={2} rounded="lg" shadow={4} bg="white">
      <Pressable
        flex={1}
        onPress={onPress}
        android_ripple={{
          color: "muted.300",
          borderless: true,
        }}
      >
        <Box flex={1} p={2} m={2} justifyContent="center" alignItems="center">
          <Text
            fontSize="sm"
            fontFamily="body"
            fontWeight={300}
            color="muted.400"
            alignSelf="flex-start"
          >
            {category}
          </Text>
          <Heading
            fontSize="lg"
            fontFamily="heading"
            fontWeight={600}
            color="darkBlue.500"
            alignSelf="flex-start"
            mb={2}
          >
            {name}
          </Heading>
          <Image
            source={{
              uri: imageSource,
            }}
            size="xl"
            alt={name}
            mb={2}
            rounded="lg"
          />
          <Text
            fontSize="lg"
            fontFamily="body"
            fontWeight={600}
            alignSelf="flex-start"
          >
            {price}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
}
