import styled from "@emotion/native";
import colors from "../assets/theme/colors";

export default function ProductCard({
  name,
  category,
  imageSource,
  price,
  onPress,
}) {
  return (
    <Container>
      <Button
        onPress={onPress}
        android_ripple={{
          color: colors.grey,
          borderless: true,
        }}
      >
        <InnerContainer>
          <Text>{category}</Text>
          <Header>{name}</Header>
          <Image
            source={{
              uri: imageSource,
            }}
          />
          <Price>{price}</Price>
        </InnerContainer>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-vertical: 4px;
  margin-horizontal: 10px;
  border-radius: 8px;
  elevation: 4;
  background-color: white;
  overflow: hidden;
`;
const Button = styled.Pressable`
  flex: 1;
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 8px;
  margin: 8px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 110px;
  height: 110px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const Header = styled.Text`
  font-size: 16px;
  font-family: "Poppins-Medium";
  color: ${colors.secondary};
  margin-bottom: 8px;
  align-self: flex-start;
`;

const Text = styled.Text`
  font-size: 15px;
  font-family: "Poppins-Regular";
  align-self: flex-start;
  color: ${colors.grey};
`;

const Price = styled.Text`
  font-size: 18px;
  font-family: "Poppins-Medium";
  align-self: flex-start;
`;
