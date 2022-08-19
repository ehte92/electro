import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import colors from "../assets/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import CarouselCardItem, {
  sliderHeight,
  sliderWidth,
} from "../components/CarouselCardItem";
import PaginationItem from "../components/PaginationItem";
import Button from "../components/Button";
import { useState } from "react";
import IconButton from "../components/IconButton";

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
      <View style={styles.carouselContainer}>
        {/* Linear gradient white to light grey */}
        <LinearGradient
          colors={["#f5f5f5", colors.grey]}
          style={styles.carouselGradient}
        />
        <View style={styles.carousel}>
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
        </View>
        <View style={styles.paginationContainer}>
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
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.category}>{item.product_category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
          }}
        >
          {item.short_description.replace(regex, "")}
        </Text>
        <Text style={styles.price}>{item.price_display}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.counterSection}>
            <IconButton
              name="minuscircle"
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              color={colors.accent}
              size={32}
            />
            <Text style={styles.quantity}>{quantity}</Text>
            <IconButton
              name="pluscircle"
              onPress={() => {
                setQuantity(quantity + 1);
              }}
              color={colors.accent}
              size={32}
            />
          </View>
          <View style={styles.addToCartSection}>
            <Button
              icon={
                <MaterialIcons
                  name={addToCartButtonPressed ? "check" : "add-shopping-cart"}
                  size={24}
                  color="white"
                />
              }
              title={
                addToCartButtonPressed
                  ? "Added to cart"
                  : item.add_to_cart_button_text
              }
              type="filled"
              onPress={() => {
                setAddToCartButtonPressed(true);
              }}
              style={{
                shadowOffset: { width: 10, height: 10 },
                shadowColor: "black",
                shadowOpacity: 1,
                elevation: 3,
                borderRadius: 30,
              }}
            />
          </View>
        </View>
        <View style={styles.goToCartSection}>
          <Button
            icon={
              <MaterialIcons name="shopping-cart" size={24} color="white" />
            }
            title="Go to cart"
            type="filled"
            style={{
              shadowOffset: { width: 10, height: 10 },
              shadowColor: "black",
              shadowOpacity: 1,
              elevation: 3,
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    height: sliderHeight + 50,
    width: sliderWidth,
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
  },
  carouselGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    alignSelf: "center",
    zIndex: 1,
    marginTop: -20,
    marginBottom: 10,
    transform: [{ scaleX: 0.5 }],
  },
  innerContainer: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  category: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: colors.grey,
  },
  name: {
    fontSize: 32,
    fontFamily: "Poppins-Medium",
    marginTop: 5,
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontFamily: "Poppins-Medium",
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "Poppins-Medium",
    color: colors.black,
    width: 30,
    backgroundColor: colors.greyLight,
    textAlign: "center",
    borderRadius: 2,
    marginHorizontal: 6,
    paddingVertical: 5,
  },
  counterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  addToCartSection: {
    alignSelf: "flex-end",
    marginHorizontal: 40,
  },
  goToCartSection: {
    alignSelf: "center",
    width: "100%",
  },
});
