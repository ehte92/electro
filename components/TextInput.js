import { Box, Icon, Input, Text } from "native-base";
import { useState } from "react";
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

  const getBorderColor = () => {
    if (error) {
      return "danger500";
    }

    if (focused) {
      return "primary300";
    } else {
      return "muted400";
    }
  };
  return (
    <Box width="100%">
      {label && (
        <Text fontSize={"sm"} fontFamily="body" fontWeight={500} mb={1}>
          {label}
        </Text>
      )}
      <Box>
        <Input
          variant="rounded"
          leftElement={
            icon &&
            iconPosition === "left" && (
              <Icon as={icon} size={5} ml={2} color="black" />
            )
          }
          rightElement={
            icon &&
            iconPosition === "right" && (
              <Icon as={icon} size={5} mr={2} color="black" />
            )
          }
          borderColor={
            error ? colors.danger : focused ? colors.accent : colors.grey
          }
          borderWidth={2}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          selectionColor={colors.accent}
          underlineColorAndroid={"transparent"}
          {...props}
        />
      </Box>
      {error && (
        <Text
          fontSize={"sm"}
          fontFamily="body"
          fontWeight={500}
          pt={1}
          color={colors.danger}
        >
          {error}
        </Text>
      )}
    </Box>
  );
}
