import { Card } from "../../components/Card";
import { AntDesign } from "@expo/vector-icons";
import {
  ContentHeader,
  Title,
  Container,
  ListingCards,
  ContainerTextClean,
  TextClean,
  ContentMessage,
  Message,
  Icon,
  Icon2,
  ContainerModal,
  ContentModal,
  TitleModal,
  ButtonModal,
  TextModal,
  ButtonCancel,
  TextRemove,
} from "./styles";

import {
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { AdDetails } from "../AdDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function Favorites() {
  const dataKey = "@serramotors:advert";
  const [cardInfos, setCardInfos] = useState<any>({});
  const [advertsFavorites, setAdvertsFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleModalOptions, setIsVisibleModalOptions] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const handleOpenAd = () => {
    setIsVisibleModalOptions(false);

    navigation.navigate("advert", { dataItem: cardInfos });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [advertsFavorites]);

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      if (currentData.length === 0) {
        setIsLoading(false);
        return;
      }
      setAdvertsFavorites(currentData);
      setIsLoading(false);
    }
    loadData();
  }, [refreshing]);

  const handleCleanFavorites = async () => {
    try {
      await AsyncStorage.removeItem(dataKey);
      Alert.alert("Lista de favoritos exclu??da");
      setAdvertsFavorites([]);
    } catch (e) {
      Alert.alert("N??o foi poss??vel limpar os favoritos");
    }
  };

  const handleRemoveAdvertFavorite = async (id: any) => {
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const result = currentData.filter((obj: any) => obj.id !== id);

      await AsyncStorage.setItem(dataKey, JSON.stringify(result));
      setAdvertsFavorites(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <ContentHeader style={shadowContent}>
        <Title>Meus favoritos</Title>
        <Icon onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={32} color={theme.colors.primary} />
        </Icon>
      </ContentHeader>

      <ContainerTextClean>
        <TextClean onPress={() => handleCleanFavorites()}>
          Limpar favoritos
        </TextClean>
      </ContainerTextClean>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 30 }} />
      ) : (
        <ListingCards
          data={advertsFavorites}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }: any) => (
            <Card
              data={item}
              onPress={() => {
                setCardInfos(item);
                setIsVisibleModalOptions(true);
              }}
            />
          )}
        />
      )}

      {advertsFavorites.length === 0 && (
        <ContentMessage>
          <Message>
            Sem an??ncios no momento, recarregue a p??gina para atualizar
          </Message>
          <Icon2 name="arrowdown" />
        </ContentMessage>
      )}

      <Modal visible={isVisibleModalOptions} transparent>
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal>
                <TitleModal>Op????es</TitleModal>
                <ButtonModal onPress={() => handleOpenAd()}>
                  <TextModal>Ver anuncio</TextModal>
                </ButtonModal>
                <ButtonModal
                  onPress={() => handleRemoveAdvertFavorite(cardInfos.id)}
                >
                  <TextModal>Remover dos favoritos</TextModal>
                </ButtonModal>

                <ButtonCancel onPress={() => setIsVisibleModalOptions(false)}>
                  <TextRemove>Cancelar</TextRemove>
                </ButtonCancel>
              </ContentModal>
            </ContainerModal>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </Container>
  );
}
