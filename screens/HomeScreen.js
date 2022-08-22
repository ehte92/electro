import { FlatList } from "native-base";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import ProductCard from "../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://www.dev.wp.uruvak.com/wp-json/uruvak/v1/shop/products";
      const response = await fetch(url);
      const json = await response.json();
      setProductList(json.data);
    };
    fetchData();
  }, []);

  return (
    <Background>
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
    </Background>
  );
}
