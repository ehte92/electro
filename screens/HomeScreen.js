import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Center,
  Divider,
  FlatList,
  Icon,
  Input,
  Select,
  Spinner,
  Text,
  useDisclose,
} from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Background from "../components/Background";
import ProductCard from "../components/ProductCard";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url =
        "https://www.dev.wp.uruvak.com/wp-json/uruvak/v1/shop/products";
      const response = await fetch(url);
      const json = await response.json();
      setProductList(json.data);
      setSortList(json.sort);
      setFilterList(json.filters);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Background>
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner color="primary.300" size="lg" />
        </Box>
      ) : (
        <>
          <Input
            placeholder="Search"
            marginY={4}
            marginX={2}
            rounded="xl"
            height={9}
            InputLeftElement={
              <Icon as={Ionicons} name="ios-search" color="gray.700" ml={2} />
            }
            bg="muted.200"
          />
          <Box flexDir={"row"}>
            <Select
              marginX={2}
              placeholder={sortList.length > 0 ? sortList[0].label : "Sort"}
              height={9}
              width={width - 60}
              minWidth="200"
              borderWidth={0}
              borderBottomWidth={2}
              borderBottomColor="primary.300"
              placeholderTextColor="black"
              fontFamily="body"
              fontWeight={400}
              fontSize="sm"
            >
              {sortList.map((item, index) => (
                <Select.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              ))}
            </Select>
            <Icon
              as={Ionicons}
              name="ios-filter-sharp"
              color="black"
              size="lg"
              pt={1}
              onPress={() => navigation.navigate("Filter", { filterList })}
            />
          </Box>
          <FlatList
            data={productList}
            renderItem={({ item }) => (
              <ProductCard
                name={item.name}
                category={item.product_category}
                imageSource={item.thumbnail}
                price={item.price_display}
                onPress={() => navigation.navigate("ProductDetails", { item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </>
      )}
    </Background>
  );
}
