import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
        <View style={[styles.loaderSection]}>
          {loading && (
            <ActivityIndicator
              color={type === "outlined" ? colors.accent : colors.secondary}
            />
          )}
          {icon && <View style={styles.iconSection}>{icon}</View>}
          {title && (
            <Text
              style={[
                styles.text,
                {
                  paddingLeft: loading ? 5 : 0,
                  color: type === "outlined" ? colors.black : colors.white,
                },
              ]}
            >
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
  iconSection: {
    marginRight: 10,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    lineHeight: 26,
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
