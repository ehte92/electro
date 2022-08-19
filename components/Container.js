import styled from "@emotion/native";

export default function Container({ children, ...props }) {
  return (
    <ContainerComponent behavior="padding" {...props}>
      {children}
    </ContainerComponent>
  );
}

const ContainerComponent = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 20px;
  width: 100%;
  max-width: 340px;
  align-self: center;
  align-items: center;
`;
