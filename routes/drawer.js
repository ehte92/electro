import { AntDesign } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./homeStack";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../screens/ProfileScreen";
import WishlistScreen from "../screens/WishlistScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#f3e008",
          drawerActiveTintColor: "#000",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: 25,
            fontSize: 15,
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <AntDesign name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color }) => (
              <AntDesign name="user" size={22} color={color} />
            ),
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
          }}
        />
        <Drawer.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            drawerIcon: ({ color }) => (
              <AntDesign name="heart" size={22} color={color} />
            ),
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
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
