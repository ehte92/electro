import { AntDesign } from "@expo/vector-icons";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#feee00",
        }}
      >
        <ImageBackground
          source={require("../assets/images/menu_bg.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../assets/images/user-profile.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold" }}>John Doe</Text>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <Pressable onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="sharealt" size={22} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 15,
                fontFamily: "Poppins-Regular",
              }}
            >
              Tell a friend
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="logout" size={22} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 15,
                fontFamily: "Poppins-Regular",
              }}
            >
              Sign Out
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
