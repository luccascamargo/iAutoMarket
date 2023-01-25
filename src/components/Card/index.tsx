import { Spinner } from "native-base";
import { Image, View } from "react-native";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
  return (
    <Container {...props} style={shadowContent}>
      <ImageCard
        onError={() => (
          <Image source={require("../../assets/image-default.jpg")} />
        )}
        onLoad={() => <Spinner size={"lg"} color={theme.colors.primary} />}
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
