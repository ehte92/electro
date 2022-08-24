import { Center, Image, Modal, Pressable } from "native-base";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const imageW = width * 0.5;
const imageH = imageW * 1.2;
export const sliderWidth = width;
export const sliderHeight = imageH;

export default function CarouselCardItem({ item, onPress, index }) {
  return (
    <Center width={width} key={index}>
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: item }}
          width={imageW}
          height={imageH}
          rounded="lg"
          marginY={2}
          alt="product"
          resizeMode="contain"
        />
      </Pressable>
    </Center>
  );
}
