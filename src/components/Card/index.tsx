import { View } from "react-native";
import {
  Container,
  ImageCard,
  ContentTitleFav,
  ContentTitle,
  Title,
  Description,
  Price,
  ContentOtherInfos,
  Year,
  Km,
  Color,
  Line,
  Region,
} from "./styles";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Card({ data, children, ...props }: any) {
  return (
    <Container {...props} style={shadowContent}>
      <ImageCard
        source={{
          uri: `${data?.photos[0]?.uri}`,
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
        <Year>{data.year_model}</Year>
        <Km>{Number(data.mileage).toLocaleString("pt-BR")} km</Km>
        <Color>{data.color}</Color>
      </ContentOtherInfos>

      <Line />

      <Region>{data.city}</Region>
      {children}
    </Container>
  );
}
