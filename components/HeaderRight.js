import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function HeaderRight({ navigation, hideProfile, hideCart }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      {hideProfile ? null : (
        <Pressable
          style={{
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <AntDesign name="user" size={24} color="black" />
        </Pressable>
      )}
      {hideCart ? null : (
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <AntDesign name="shoppingcart" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
}
