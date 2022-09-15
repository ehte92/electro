import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  Divider,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Background from "../components/Background";
import CartCard from "../components/CartCard";
import { getAsyncCart } from "../store/cartSlice";

const { width } = Dimensions.get("screen");

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCart.cart.products);
  const subTotalPrice = useSelector(
    (state) => state.getCart.cart.cart_total_display
  );
  const totalPrice = useSelector(
    (state) => state.getCart.cart.order_total_display
  );
  const totalQuantity = useSelector(
    (state) => state.getCart.cart.total_quantity_in_cart
  );
  const shippingFee = useSelector(
    (state) => state.getCart.cart.shipping_fee_display
  );
  const additionalFeeLabel = useSelector(
    (state) => state.getCart.cart.additional_fee_label
  );
  const additionalFee = useSelector(
    (state) => state.getCart.cart.additional_fee
  );
  useEffect(() => {
    dispatch(getAsyncCart());
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowBackIcon size="5" ml="4" mr="2" color="black" />
        </Pressable>
      ),
    });
  }, []);
  return (
    <Background>
      {cart && cart.length ? (
        <Box flex={1}>
          <ScrollView
            // height={height - 200}
            showsVerticalScrollIndicator={false}
          >
            <Box>
              {cart.map((item) => {
                return (
                  <CartCard
                    name={item.product_title}
                    price={item.product_price_display}
                    quantity={item.quantity}
                    quantityConfig={item.qty_config}
                    image={item.featured_src}
                    index={item.key}
                  />
                );
              })}
            </Box>
            <Box p={4}>
              <KeyboardAvoidingView behavior="padding">
                <Input
                  placeholder="Enter Coupon Code"
                  variant="filled"
                  bg="white"
                  w={width * 0.9}
                  InputRightElement={
                    <Button
                      variant="solid"
                      bg="primary.300"
                      _text={{ color: "white" }}
                      h="full"
                    >
                      Apply
                    </Button>
                  }
                />
              </KeyboardAvoidingView>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop={4}
              >
                <Text fontFamily="body" fontWeight="400">
                  Subtotal
                </Text>
                <Text fontFamily="body" fontSize="md" fontWeight="600">
                  {subTotalPrice}
                </Text>
              </Box>
              <Divider my="2" />
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Text fontFamily="body" fontWeight="400">
                  Shipping
                </Text>
                <Text fontFamily="body" fontSize="md" fontWeight="600">
                  {shippingFee ? shippingFee : "Free"}
                </Text>
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Text fontFamily="body" fontWeight="400">
                  {additionalFeeLabel}
                </Text>
                <Text fontFamily="body" fontSize="md" fontWeight="600">
                  {additionalFee}
                </Text>
              </Box>
              <Divider my="2" />
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop={2}
                marginBottom={4}
              >
                <Text fontFamily="body" fontWeight="400">
                  Total ({totalQuantity} items)
                </Text>
                <Text fontFamily="body" fontSize="md" fontWeight="600">
                  {totalPrice}
                </Text>
              </Box>
            </Box>
          </ScrollView>
          <Box justifyContent={"center"} alignItems={"center"}>
            <Button
              w="90%"
              bg="primary.300"
              size={"lg"}
              _text={{ color: "white" }}
              rounded="xl"
              margin={2}
              // onPress={() => navigation.navigate("Checkout")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Center>
          {/* <EmptyCart width={width - 60} height={width - 60} /> */}
          <Text fontFamily="heading" fontsize="xl" fontWeight={500}>
            Your cart is empty
          </Text>
          <Text fontFamily="body" fontsize="lg" fontWeight={400}>
            Be sure to fill your cart with something you like
          </Text>
        </Center>
      )}
    </Background>
  );
}
