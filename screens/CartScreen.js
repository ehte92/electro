import { Button, StyleSheet, Text, View } from "react-native";

export default function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Cart Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("HomeScreen")} />
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
