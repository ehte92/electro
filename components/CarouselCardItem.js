import { Center, Image } from "native-base";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const imageW = width * 0.5;
const imageH = imageW * 1.2;
export const sliderWidth = width;
export const sliderHeight = imageH;

export default function CarouselCardItem({ item, index }) {
  return (
    <Center width={width} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        width={imageW}
        height={imageH}
        rounded="lg"
        marginY={2}
        alt="product"
        resizeMode="contain"
      />
    </Center>
  );
}
