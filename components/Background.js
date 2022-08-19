import styled from "@emotion/native";

export default function Background({ children, ...props }) {
  return (
    <BackgroundComponent
      source={require("../assets/images/background_dot.png")}
      resizeMode="repeat"
      {...props}
    >
      {children}
    </BackgroundComponent>
  );
}

const BackgroundComponent = styled.ImageBackground`
  flex: 1;
  width: 100%;
`;
