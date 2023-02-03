import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components";
import ImageView from "react-native-image-viewing";

import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";

import {
  Container,
  ContentTitleFav,
  ContentTitle,
  Title,
  Description,
  Icon,
  Price,
  Line,
  MainFeatures,
  Feature,
  FeatureTitle,
  FeatureValue,
  IconFav,
  ContentDescription,
  TitleDescription,
  FeaturesTitle,
  ContentFeatures,
  OptionalTitle,
} from "./styles";
import axios from "axios";
import { Spinner } from "native-base";
import { useAuth } from "../../contexts/AuthContext";

const width = Dimensions.get("screen").width;

export function CardInternal({ data }) {
  const [favorite, setFavorite] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const dataKey = "@serramotors:advert";
  const theme = useTheme();

  useEffect(() => {
    const getCompare = async (advert) => {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const newCurrentData = currentData?.find(
        (favorite) => favorite.id === advert.id
      );

      if (newCurrentData) {
        setFavorite(true);
      }
    };

    getCompare(data);
  });

  const handleSaveStorage = async (value) => {
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const isEqual = currentData?.filter(
        (favorite) => favorite.id === value.id
      );
      const listDifference = currentData?.filter(
        (favorite) => favorite.id !== value.id
      );

      if (isEqual.length === 1) {
        await AsyncStorage.setItem(dataKey, JSON.stringify(listDifference));
        setFavorite(false);
        Alert.alert("Anúncio removido dos seus favoritos");
        return;
      }

      const AdvertFormatted = [...currentData, value];

      await AsyncStorage.setItem(dataKey, JSON.stringify(AdvertFormatted));
      setFavorite(true);
      Alert.alert("Anúncio adicionado nos seus favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenGallery = (index) => {
    setIndex(index);
    setIsVisible(true);
  };

  return (
    <Container>
      <View style={{ height: 400 }}>
        <Swiper
          loop={false}
          index={index}
          showsButtons={Platform.OS === "ios" ? false : true}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          dotColor={theme.colors.text}
          activeDotColor={theme.colors.primary}
          nextButton={
            <Icon name="right" style={{ color: theme.colors.primary }} />
          }
          prevButton={
            <Icon name="left" style={{ color: theme.colors.primary }} />
          }
        >
          {data?.photos?.map((photo, index) => (
            <View key={photo.id}>
              <RectButton
                style={styles.page}
                onPress={() => handleOpenGallery(index)}
              >
                <Image
                  onError={() => (
                    <Image source={require("../../assets/image-default.jpg")} />
                  )}
                  onLoad={() => (
                    <Spinner size={"lg"} color={theme.colors.primary} />
                  )}
                  style={{ width: width, height: "100%" }}
                  source={{ uri: photo.uri }}
                />
              </RectButton>
            </View>
          ))}
        </Swiper>
      </View>

      <ImageView
        images={data.photos}
        imageIndex={index}
        visible={visible}
        doubleTapToZoomEnabled
        swipeToCloseEnabled
        onRequestClose={() => setIsVisible(false)}
      />

      <ContentTitleFav>
        <ContentTitle>
          <Title>{data.board}</Title>
          <Description>{data.model}</Description>
        </ContentTitle>
        {favorite ? (
          <IconFav
            name="heart"
            color={theme.colors.primary}
            onPress={() => handleSaveStorage(data)}
          />
        ) : (
          <IconFav name="hearto" onPress={() => handleSaveStorage(data)} />
        )}
      </ContentTitleFav>

      <Price>
        {Number(data.price).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </Price>

      <Line />

      <MainFeatures>
        <FeaturesTitle>Principais informações</FeaturesTitle>
        <ContentFeatures>
          <Feature>
            <FeatureTitle>Ano</FeatureTitle>
            <FeatureValue>{data.year_model}</FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Km</FeatureTitle>
            <FeatureValue>
              {Number(data.mileage).toLocaleString("pt-BR")}
            </FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Cor</FeatureTitle>
            <FeatureValue>{data.color}</FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Cidade</FeatureTitle>
            <FeatureValue>{data.city}</FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Estado</FeatureTitle>
            <FeatureValue>{data.state}</FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Portas</FeatureTitle>
            <FeatureValue>{data.doors}</FeatureValue>
          </Feature>
          <Feature>
            <FeatureTitle>Câmbio</FeatureTitle>
            <FeatureValue>{data.transmission}</FeatureValue>
          </Feature>
        </ContentFeatures>
      </MainFeatures>
      <Line />

      {data?.description && (
        <ContentDescription>
          <TitleDescription>Descrição</TitleDescription>
          <Description>{data?.description}</Description>
        </ContentDescription>
      )}

      <Line />

      <MainFeatures>
        <FeaturesTitle>Opcionais</FeaturesTitle>
        <ContentFeatures>
          {data?.optionals.length === 0 ? (
            <Feature>
              <OptionalTitle>Nenhum opcional listado</OptionalTitle>
            </Feature>
          ) : (
            data?.optionals.map((optional) => (
              <Feature key={optional.id}>
                <OptionalTitle>{optional.name}</OptionalTitle>
              </Feature>
            ))
          )}
          {}
        </ContentFeatures>
      </MainFeatures>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: "400",
            textAlign: "center",
            fontFamily: theme.fonts.medium,
          }}
        >
          Anuncio criado em{" "}
          {new Date(data.created_at).toLocaleDateString("pt-BR", {
            dateStyle: "full",
          })}
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
