import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";

const width = Dimensions.get("window").width;
const imageW = width * 0.5;
const imageH = imageW * 1.2;
export const sliderWidth = width;
export const sliderHeight = imageH;

export default function CarouselCardItem({ item, index }) {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
  },
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 16,
    marginVertical: 16,
  },
});
