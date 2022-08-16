import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RootDrawer from "./drawer";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import HeaderRight from "../components/HeaderRight";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            //   onPress={navigation.openDrawer()}
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
        <Stack.Screen name="Root" component={RootDrawer} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
