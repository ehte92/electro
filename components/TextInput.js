import { useState } from "react";
import { View, TextInput as Input, Text, StyleSheet } from "react-native";
import colors from "../assets/theme/colors";

export default function TextInput({
  onChangeText,
  label,
  value,
  iconPosition,
  icon,
  style,
  error,
  description,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === "left") {
        return "row";
      } else if (iconPosition === "right") {
        return "row-reverse";
      }
    }
  };
  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }

    if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          { alignItems: icon ? "center" : "baseline" },
          { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
        ]}
      >
        <View style={styles.icon}>{icon && icon}</View>
        <Input
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          selectionColor="#f3e008"
          underlineColorAndroid={"transparent"}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
    width: "100%",
  },
  wrapper: {
    height: 42,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    width: "100%",
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
    paddingTop: 4,
  },
});
