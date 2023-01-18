import { Container, Title, Icon } from "./styles";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function ButtonSelect({ title, onPress, group, error, disable }: any) {
  return (
    <Container
      onPress={onPress}
      disable={disable}
      group={group}
      error={error}
      style={shadowContent}
      disabled={disable}
    >
      <Title>{title}</Title>
      <Icon name="down" error={error} />
    </Container>
  );
}
