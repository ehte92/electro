import { Box, FlatList, Icon, Image, useAccessibleColors } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import PaginationItem from "./PaginationItem";

const { width, height } = Dimensions.get("window");

export default function GallaryView({ item }) {
  const topRef = useRef(null);
  const [index, setIndex] = useState(0);
  const progressValue = useSharedValue(0);

  return (
    <Box safeArea>
      <FlatList
        ref={topRef}
        data={item}
        keyExtractor={(index) => index.toString()}
        pagingEnabled
        horizontal
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          progressValue.value = nativeEvent.contentOffset.x / width;
        }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imgUrl }}
            width={width - 50}
            height={height - 300}
            rounded="lg"
            marginX={2}
            alt="product"
            resizeMode="contain"
            key={index}
          />
        )}
      />
      <Box flexDir={"row"} justifyContent="space-between">
        <Icon
          as={Ionicons}
          name="arrow-back-circle"
          color="black"
          size={12}
          onPress={() => {
            if (index > 0) {
              topRef.current.scrollToIndex({ index: index - 1 });
              setIndex(index - 1);
            }
          }}
        />
        <Box
          flexDir={"row"}
          justifyContent="space-between"
          width={100}
          alignSelf="center"
          transform={[{ scaleX: 0.5 }]}
        >
          {item.length > 1 &&
            item.map((data, index) => {
              return (
                <PaginationItem
                  index={index}
                  length={data.length}
                  animValue={progressValue}
                  isRotate={false}
                  backgroundColor={"black"}
                  key={index}
                />
              );
            })}
        </Box>
        <Icon
          as={Ionicons}
          name="arrow-forward-circle"
          color="black"
          size={12}
          onPress={() => {
            if (index < item.length - 1) {
              topRef.current.scrollToIndex({ index: index + 1 });
              setIndex(index + 1);
            }
          }}
        />
      </Box>
    </Box>
  );
}
