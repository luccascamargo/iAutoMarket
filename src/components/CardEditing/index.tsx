import {
  Container,
  ImageCard,
  ContentTitleFav,
  ContentTitle,
  Title,
  Description,
  IconFav,
  Price,
  ContentOtherInfos,
  Year,
  Km,
  Color,
  Line,
  Region,
} from "./styles";

export function CardEditing({ data, children, handleCloseModalDetails }) {
  return (
    <Container onPress={handleCloseModalDetails}>
      <ImageCard
        source={{
          uri: `https://res.cloudinary.com/serramotors/image/upload/v1649725816/punto_v793l9.png`,
        }}
      />

      <ContentTitleFav>
        <ContentTitle>
          <Title>{data.board}</Title>
          <Description>{data.model}</Description>
        </ContentTitle>
      </ContentTitleFav>

      <Price>
        {Number(data.price).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </Price>

      <ContentOtherInfos>
        <Year>{data.yearModel}</Year>
        <Km>{Number(data.mileage).toLocaleString("pt-BR")} km</Km>
        <Color>{data.color}</Color>
      </ContentOtherInfos>

      <Line />

      <Region>{data.locale}</Region>
      {children}
    </Container>
  );
}
