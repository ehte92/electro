import { Entypo, Ionicons } from "@expo/vector-icons";
import { Box, IconButton, Image, Text } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import {
  getAsyncCart,
  removeAsyncCart,
  updateAsyncCart,
} from "../store/cartSlice";

const { width } = Dimensions.get("window");
const height = Dimensions.get("window").height;

const CardHeight = height * 0.15;

export default function CartCard({
  index,
  name,
  price,
  quantity,
  quantityConfig,
  image,
}) {
  const dispatch = useDispatch();
  const [quantityCart, setQuantityCart] = useState(quantity);
  const updateQuantity = () => {
    const data = {
      key: index,
      quantity: quantityCart,
    };
    dispatch(updateAsyncCart(data));
    dispatch(getAsyncCart());
  };
  const removeItemFromCart = () => {
    const data = {
      key: index,
    };
    dispatch(removeAsyncCart(data));
    dispatch(getAsyncCart());
  };
  useEffect(() => {
    updateQuantity();
  }, [quantityCart]);
  return (
    <Box
      flexDirection="row"
      rounded="lg"
      shadow={2}
      height={CardHeight}
      bg="white"
      m={2}
      p={2}
      key={index}
    >
      <Box>
        <Image
          source={{ uri: image }}
          style={{ width: 90, height: 90 }}
          alt="product"
        />
      </Box>
      <Box flexDirection="column" marginLeft="5">
        <Text fontFamily="heading" fontSize="md" fontWeight="600">
          {name}
        </Text>
        <Box
          flexDirection="row"
          marginTop="auto"
          width={width - 150}
          justifyContent="space-between"
          alignContent="center"
        >
          <Box flexDir="row" alignItems="center" alignContent="center">
            <IconButton
              variant="ghost"
              _icon={{
                as: Entypo,
                name: "minus",
                color: "primary.300",
                size: "md",
              }}
              _pressed={{
                bg: "primary.300:alpha.20",
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: "2xl",
                },
              }}
              onPress={() => {
                if (quantityCart > 1) {
                  setQuantityCart(quantityCart - 1);
                }
              }}
            />
            <Text
              fontSize={"md"}
              fontFamily={"body"}
              fontweight={700}
              color="black"
              textAlign={"center"}
              marginX={2}
            >
              {quantityCart}
            </Text>
            <IconButton
              variant="ghost"
              _icon={{
                as: Entypo,
                name: "plus",
                color: "primary.300",
                size: "md",
              }}
              _pressed={{
                bg: "primary.300:alpha.20",
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: "2xl",
                },
              }}
              onPress={() => {
                if (quantityCart <= quantityConfig.max_value) {
                  setQuantityCart(quantityCart + 1);
                }
              }}
            />
          </Box>
          <IconButton
            variant="ghost"
            _icon={{
              as: Ionicons,
              name: "trash-outline",
              color: "primary.300",
              size: "md",
            }}
            _pressed={{
              bg: "primary.300:alpha.20",
              _ios: {
                _icon: {
                  size: "2xl",
                },
              },
            }}
            _ios={{
              _icon: {
                size: "2xl",
              },
            }}
            onPress={() => {
              removeItemFromCart();
            }}
          />
          <Box alignSelf="center">
            <Text fontFamily="body" fontSize="xl" fontWeight="600">
              {price}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
