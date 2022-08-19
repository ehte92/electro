import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HeaderRight from "../components/HeaderRight";
import SignupScreen from "../screens/SignupScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import colors from "../assets/theme/colors";

const Stack = createStackNavigator();

export const HomeStack = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={24}
            style={{
              margin: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={openMenu}
          />
        ),
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerStyle: {
          backgroundColor: colors.accent,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        },
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
          fontSize: 40,
          marginLeft: 10,
        },
        headerTitle: "electro",
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
