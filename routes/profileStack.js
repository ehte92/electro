import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderRight from "../components/HeaderRight";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../assets/theme/colors";

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
