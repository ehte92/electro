import { Ionicons } from "@expo/vector-icons";
import axios, { CancelToken as ICancelToken } from "axios";
import { Box, FlatList, Icon, Input, Select, Spinner } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Background from "../components/Background";
import ProductCard from "../components/ProductCard";
import fetcher from "../helpers/network";

const { width } = Dimensions.get("window");
const { CancelToken } = axios;

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [orderby, setOrderby] = useState("popularity");

  useEffect(() => {
    fetchData();
  }, [currentPage, orderby]);

  const fetchData = async () => {
    if (currentPage === 1) {
      setLoading(true);
    }
    const url = `wp-json/uruvak/v1/shop/products?page=${currentPage}&order_by=${orderby}`;
    const source = CancelToken.source();
    const promise = fetcher();
    promise
      .get(url, {
        cancelToken: source.token,
      })
      .then(({ data }) => {
        setProductList((prev) => [...prev, ...data.data]);
        setSortList(data.sort);
        setFilterList(data.filters);
        setTotalPage(data.max_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: HomeScreen.js ~ line 36 ~ promise ~ error",
          error
        );
      });
    promise.cancel = () => {
      source.cancel("Operation canceled by the user.");
    };
  };

  const loadMoreItems = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleSort = (sort) => {
    setOrderby(sort);
    setProductList([]);
    setCurrentPage(1);
  };

  return (
    <Background>
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
          defaultValue="popularity"
          marginX={2}
          height={10}
          width={width - 60}
          minWidth="200"
          borderWidth={0}
          borderBottomWidth={2}
          borderBottomColor="primary.300"
          placeholderTextColor="black"
          fontFamily="body"
          fontWeight={400}
          fontSize="sm"
          onValueChange={(itemValue) => handleSort(itemValue)}
        >
          {sortList.map((item, index) => (
            <Select.Item label={item.label} value={item.value} key={index} />
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
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner color="primary.300" size="lg" />
        </Box>
      ) : (
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
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListFooterComponent={() => {
            if (currentPage < totalPage) {
              return (
                <Box
                  justifyContent="center"
                  alignItems="center"
                  flex={1}
                  height={50}
                >
                  <Spinner color="primary.300" size="lg" />
                </Box>
              );
            }
            return null;
          }}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.3}
        />
      )}
    </Background>
  );
}
