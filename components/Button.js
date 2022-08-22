import { Box, Spinner, Text } from "native-base";
import { Pressable, StyleSheet, View } from "react-native";
import colors from "../assets/theme/colors";

export default function Button({
  title,
  type,
  icon,
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
        <Box flexDir="row">
          {loading && <Spinner color={type === "filled" ? "white" : "black"} />}
          {icon && <Box mr={2}>{icon}</Box>}
          {title && (
            <Text
              fontFamily="Poppins-Medium"
              fontSize="md"
              lineHeight="lg"
              pl={loading ? 5 : 0}
              color={type === "outlined" ? "black" : "white"}
            >
              {loading ? "Please wait..." : title}
            </Text>
          )}
        </Box>
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
  outlined: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  filled: {
    backgroundColor: colors.accent,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  danger: {
    backgroundColor: colors.danger,
  },
});
