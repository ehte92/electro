import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default function FilterScreen({ navigation, route }) {
  const { filterList } = route.params;
  const colorList = filterList.items.pa_color.values;
  const sizeList = filterList.items.pa_size.values;
  const [colorValues, setColorValues] = useState([]);
  const [sizeValues, setSizeValues] = useState([]);

  return (
    <Box safeAreaTop flex={1}>
      <Box shadow={5}>
        <HStack
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <HStack alignItems="center">
            <IconButton
              icon={
                <Icon size="md" as={MaterialIcons} name="close" color="black" />
              }
              onPress={() => navigation.goBack()}
            />
            <Text color="black" fontSize="20" fontWeight="bold">
              Filter
            </Text>
          </HStack>
        </HStack>
      </Box>
      <ScrollView>
        <Box marginX={2}>
          <Text fontFamily="body" fontWeight={600} fontSize="20">
            {filterList.items.price_filter.label}
          </Text>
          <Box flexDir={"row"} width="100%" justifyContent={"space-between"}>
            <Input width="45%" mr={2} placeholder="Min" />
            <Input width="45%" placeholder="Max" />
          </Box>
          <Divider my={3} />
          <Box>
            <VStack space={2}>
              <HStack alignItems="baseline">
                <Heading fontFamily="heading" fontWeight={600} fontSize="20">
                  {filterList.items.pa_color.label}
                </Heading>
              </HStack>
              <VStack>
                <Box>
                  <Text>Selected: ({colorValues.length})</Text>
                </Box>
              </VStack>
              <Checkbox.Group
                accessibilityLabel="pick a color"
                onChange={(values) => {
                  setColorValues(values || []);
                }}
              >
                {colorList.map((color, index) => (
                  <Box maxW={width} padding={3} flexDir="row" key={index}>
                    <Text fontFamily="body" fontWeight={500} ml="2" width="90%">
                      {color.label}
                    </Text>
                    <Checkbox
                      value={color.value}
                      colorScheme={color.value}
                      size="md"
                      accessibilityLabel={color.label}
                    />
                  </Box>
                ))}
              </Checkbox.Group>
            </VStack>
          </Box>
          <Divider my={3} />
          <Box>
            <VStack space={2}>
              <HStack alignItems="baseline">
                <Heading fontFamily="heading" fontWeight={600} fontSize="20">
                  {filterList.items.pa_size.label}
                </Heading>
              </HStack>
              <VStack>
                <Box>
                  <Text>Selected: ({sizeValues.length})</Text>
                </Box>
              </VStack>
              <Checkbox.Group
                accessibilityLabel="pick a size"
                onChange={(values) => {
                  setSizeValues(values || []);
                }}
              >
                {sizeList.map((size, index) => (
                  <Box maxW={width} padding={3} flexDir="row" key={index}>
                    <Text fontFamily="body" fontWeight={500} ml="2" width="90%">
                      {size.label}
                    </Text>
                    <Checkbox
                      value={size.value}
                      size="md"
                      accessibilityLabel={size.label}
                    />
                  </Box>
                ))}
              </Checkbox.Group>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
      <Box flexDir="row" justifyContent="space-between" marginY={4}>
        <Button
          borderRadius={20}
          bg="primary.300"
          shadow={3}
          width="40%"
          _text={{
            color: "white",
            fontFamily: "heading",
            fontWeight: 700,
            fontSize: "md",
            lineHeight: "lg",
          }}
        >
          CLEAR
        </Button>
        <Button
          borderRadius={20}
          bg="primary.300"
          width="40%"
          shadow={3}
          _text={{
            color: "white",
            fontFamily: "heading",
            fontWeight: 700,
            fontSize: "md",
            lineHeight: "lg",
          }}
        >
          APPLY
        </Button>
      </Box>
    </Box>
  );
}
