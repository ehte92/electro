import { Button, StyleSheet, Text, View } from "react-native";

export default function WishlistScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Wishlist Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
