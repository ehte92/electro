import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import colors from "../assets/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import CarouselCardItem, {
  sliderHeight,
  sliderWidth,
} from "../components/CarouselCardItem";
import PaginationItem from "../components/PaginationItem";
import { useState } from "react";
import IconButton from "../components/IconButton";
import { Box, Button, FlatList, Icon, ScrollView, Text } from "native-base";

const { width, height } = Dimensions.get("screen");

export default function ProductDetailsScreen({ navigation, route }) {
  const [quantity, setQuantity] = useState(1);
  const [addToCartButtonPressed, setAddToCartButtonPressed] = useState(false);
  const { item } = route.params;
  const progressValue = useSharedValue(0);
  const regex = /(<([^>]+)>)/gi;
  const data = [
    {
      imgUrl: item.images[0],
    },
    {
      imgUrl: item.images[0],
    },
    {
      imgUrl: item.images[0],
    },
  ];
  const tabData = [
    {
      title: "Description",
      content: item.description.replace(regex, ""),
    },
    {
      title: "Reviews",
      content:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
  ];
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <Box
        height={sliderHeight + 50}
        width={sliderWidth}
        transform={[{ scaleX: 2 }]}
        borderBottomStartRadius={200}
        borderBottomEndRadius={200}
        overflow="hidden"
      >
        <LinearGradient
          colors={["#f5f5f5", colors.grey]}
          style={styles.carouselGradient}
        />
        <Box
          flex={1}
          transform={[{ scaleX: 0.5 }]}
          alignItems="center"
          justifyContent="center"
        >
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <CarouselCardItem item={item} index={index} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              progressValue.value = nativeEvent.contentOffset.x / width;
            }}
          />
        </Box>
        <Box
          flexDir={"row"}
          justifyContent="space-between"
          width={100}
          alignSelf="center"
          zIndex={1}
          mb={5}
          transform={[{ scaleX: 0.5 }]}
        >
          {data.length > 1 &&
            data.map((item, index) => {
              return (
                <PaginationItem
                  index={index}
                  length={item.length}
                  animValue={progressValue}
                  isRotate={false}
                  backgroundColor={colors.black}
                  key={index}
                />
              );
            })}
        </Box>
      </Box>
      <Box mt={50} mx={30}>
        <Text fontSize="md" fontFamily="body" color="muted400">
          {item.product_category}
        </Text>
        <Text fontSize="32" fontFamily="body" fontWeight={600} my={2}>
          {item.name}
        </Text>
        <Text fontFamily="body">
          {item.short_description.replace(regex, "")}
        </Text>
        <Text fontSize="32" fontFamily="body" fontWeight={600}>
          {item.price_display}
        </Text>
        <Box flexDir="row" justifyContent="space-between" alignItems="center">
          <Box
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
          >
            <IconButton
              name="minuscircle"
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              color={"primary.300"}
              size={8}
            />
            <Text
              fontSize={"md"}
              fontFamily={"body"}
              fontweight={700}
              color="black"
              width={8}
              bg="muted.400"
              textAlign={"center"}
              borderRadius={2}
              mx={2}
              py={1}
            >
              {quantity}
            </Text>
            <IconButton
              name="pluscircle"
              onPress={() => {
                setQuantity(quantity + 1);
              }}
              color={"primary.300"}
              size={8}
            />
          </Box>
          <Box alignSelf={"flex-end"} width="60%">
            <Button
              leftIcon={
                <Icon
                  as={
                    <MaterialIcons
                      name={
                        addToCartButtonPressed ? "check" : "add-shopping-cart"
                      }
                    />
                  }
                  color="white"
                  size={5}
                />
              }
              onPress={() => {
                setAddToCartButtonPressed(true);
              }}
              rounded="full"
              width="100%"
              bg="primary.300"
              shadow={3}
              marginBottom={2}
              _text={{
                color: "white",
                fontFamily: "heading",
                fontWeight: 700,
                fontSize: "md",
                lineHeight: "lg",
              }}
            >
              {addToCartButtonPressed
                ? "Added to cart"
                : item.add_to_cart_button_text}
            </Button>
          </Box>
        </Box>
        <Box my={3} alignSelf={"center"} width="100%">
          <Button
            leftIcon={
              <Icon
                as={<MaterialIcons name="shopping-cart" />}
                color="white"
                size={5}
              />
            }
            rounded="full"
            width="100%"
            bg="primary.300"
            shadow={3}
            marginBottom={2}
            _text={{
              color: "white",
              fontFamily: "heading",
              fontWeight: 700,
              fontSize: "md",
              lineHeight: "lg",
            }}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            Go to cart
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
});
