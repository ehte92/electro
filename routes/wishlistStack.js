import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import HeaderRight from "../components/HeaderRight";
import WishlistScreen from "../screens/WishlistScreen";

const Stack = createStackNavigator();

export const WishlistStack = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            style={{
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={openMenu}
          />
        ),
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerStyle: {
          backgroundColor: "#f3e008",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 35,
          marginLeft: 20,
        },
        headerTitle: "electro",
      })}
    >
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};
