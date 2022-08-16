import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { color } from "react-native-reanimated";
import colors from "../assets/theme/colors";

export default function Button({
  title,
  type,
  disabled,
  danger,
  loading,
  style,
  onPress,
}) {
  const getBgStyle = () => {
    if (disabled) {
      return styles.disabled;
    }
    if (type === "outlined") {
      return styles.outlined;
    }
    if (type === "filled") {
      return styles.filled;
    }
    if (danger) {
      return styles.danger;
    }
  };
  return (
    <View style={[styles.buttonContainer, getBgStyle(), style]}>
      <Pressable
        style={styles.button}
        disabled={disabled}
        onPress={onPress}
        android_ripple={{
          color: colors.grey,
          borderless: true,
        }}
      >
        <View style={[styles.loaderSection]}>
          {loading && (
            <ActivityIndicator
              color={type === "outlined" ? colors.primary : colors.secondary}
            />
          )}
          {title && (
            <Text style={[styles.text, { paddingLeft: loading ? 5 : 0 }]}>
              {loading ? "Please wait..." : title}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 20,
    marginVertical: 10,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  loaderSection: {
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  outlined: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  filled: {
    backgroundColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  danger: {
    backgroundColor: colors.danger,
  },
});
