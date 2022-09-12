import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Modal, StyleSheet } from "react-native";
import colors from "../assets/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import CarouselCardItem, {
  sliderHeight,
  sliderWidth,
} from "../components/CarouselCardItem";
import { useRef, useState } from "react";
import IconButton from "../components/IconButton";
import { Box, Button, FlatList, Icon, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import TabItem from "../components/TabItem";
import SwiperFlatList from "react-native-swiper-flatlist";
import ImageViewer from "react-native-image-zoom-viewer";
import fetcher from "../helpers/network";

const { width, height } = Dimensions.get("screen");

export default function ProductDetailsScreen({ navigation, route }) {
  const [quantity, setQuantity] = useState(1);
  const [addToCartButtonPressed, setAddToCartButtonPressed] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const flatListRef = useRef(null);
  const { item } = route.params;
  const regex = /(<([^>]+)>)/gi;
  const data = item.images;
  const galleryData = data.map((image) => ({
    url: image,
  }));
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
  const onPress = () => {
    setOpenModal(true);
  };
  const handleAddToCart = () => {
    setCartLoading(true);
    const url = `/wp-json/uruvak/v1/cart/add`;
    const promise = fetcher();
    promise
      .post(url, {
        product_id: item.id,
        quantity: quantity,
      })
      .then(({ data }) => {
        console.log(data);
        setCartLoading(false);
        setAddToCartButtonPressed(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        <SwiperFlatList
          data={data}
          renderItem={({ item, index }) => (
            <Box
              flex={1}
              transform={[{ scaleX: 0.5 }]}
              alignItems="center"
              justifyContent="center"
            >
              <CarouselCardItem item={item} index={index} onPress={onPress} />
            </Box>
          )}
          showPagination
          paginationStyle={{
            justifyContent: "center",
            width: 100,
            alignSelf: "center",
            paddingTop: 5,
            transform: [{ scaleX: 0.5 }],
          }}
          paginationStyleItem={{
            width: 10,
            height: 10,
          }}
        />
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
              onPress={handleAddToCart}
              rounded="full"
              width="100%"
              bg="primary.300"
              shadow={3}
              marginBottom={2}
              isLoading={cartLoading}
              isLoadingText="Adding to cart"
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
      <Box>
        <Box>
          <Button.Group
            isAttached
            variant="unstyled"
            space={0}
            alignSelf="center"
            width="90%"
          >
            {tabData.map((item, index) => {
              return (
                <Button
                  key={index}
                  width="50%"
                  _text={{
                    color: "black",
                    fontFamily: "heading",
                    fontWeight: 700,
                    fontSize: "md",
                    lineHeight: "lg",
                  }}
                  borderBottomWidth={2}
                  borderBottomColor={
                    index === activeTab ? "primary.300" : "white"
                  }
                  _pressed={{
                    bg: "primary.300",
                  }}
                  onPress={() => {
                    setActiveTab(index);
                    flatListRef.current.scrollToIndex({
                      animated: true,
                      index: index,
                    });
                  }}
                >
                  {item.title}
                </Button>
              );
            })}
          </Button.Group>
          <FlatList
            ref={flatListRef}
            data={tabData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TabItem item={item} index={index} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              setActiveTab(nativeEvent.contentOffset.x / width);
            }}
          />
        </Box>
      </Box>
      <Modal
        visible={openModal}
        transparent={true}
        onRequestClose={() => setOpenModal(false)}
      >
        <ImageViewer
          imageUrls={galleryData}
          enableSwipeDown={true}
          onSwipeDown={() => setOpenModal(false)}
        />
      </Modal>
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
