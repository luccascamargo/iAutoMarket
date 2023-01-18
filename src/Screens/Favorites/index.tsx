import { Card } from "../../components/Card";
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
import { AdDetails } from "../../components/AdDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function Favorites({ navigation }: any) {
  const dataKey = "@serramotors:advert";
  const [openModal, setOpenModal] = useState(false);
  const [cardInfos, setCardInfos] = useState<any>({});
  const [advertsFavorites, setAdvertsFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleModalOptions, setIsVisibleModalOptions] = useState(false);

  const handleOpenAd = () => {
    setIsVisibleModalOptions(false);
    setOpenModal(true);
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
      Alert.alert("Lista de favoritos excluída");
      setAdvertsFavorites([]);
    } catch (e) {
      Alert.alert("Não foi possível limpar os favoritos");
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
        <Icon name="arrowleft" onPress={navigation.goBack} />
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            Sem anúncios no momento, recarregue a página para atualizar
          </Message>
          <Icon2 name="arrowdown" />
        </ContentMessage>
      )}

      <Modal visible={openModal} animationType="slide">
        <AdDetails setOpenModal={setOpenModal} data={cardInfos} />
      </Modal>

      <Modal visible={isVisibleModalOptions} transparent>
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal>
                <TitleModal>Opções</TitleModal>
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
