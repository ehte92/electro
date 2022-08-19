import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import colors from "../assets/theme/colors";

export default function IconButton({ name, color, size, onPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        android_ripple={{
          color: colors.grey,
          borderless: true,
        }}
        style={styles.button}
        onPress={onPress}
      >
        <AntDesign name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 50,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    borderRadius: 30,
  },
  button: {
    paddingRight: 2,
    paddingBottom: 2,
  },
});
