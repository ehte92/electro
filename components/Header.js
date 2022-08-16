import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function CustomHeader({ navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      {/* <MaterialIcons
        name="menu"
        size={28}
        style={styles.icon}
        onPress={openMenu}
      /> */}
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>electro</Text>
      </View>
      <View style={styles.rightArea}>
        <AntDesign name="user" size={24} style={styles.icon} />
        <AntDesign name="shoppingcart" size={24} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rightArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
