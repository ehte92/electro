import { Box } from "native-base";

export default function Background({ children, ...props }) {
  return (
    <Box flex="1" width="100%" bg="transparent" {...props}>
      {children}
    </Box>
  );
}
