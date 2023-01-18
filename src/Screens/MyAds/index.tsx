import { useCallback, useEffect, useRef, useState } from "react";

import {
  ContentHeader,
  Icon,
  Title,
  Container,
  ListingCards,
  ContainerModal,
  ContentModal,
  TitleModal,
  ButtonModal,
  TextRemove,
  ButtonCancel,
  TextModal,
} from "./styles";
import {
  Animated,
  Dimensions,
  Text,
  View,
  Modal,
  Alert,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AdDetails } from "../../components/AdDetails";
import { Card } from "../../components/Card";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const urlAPI =
  Platform.OS === "ios" ? "http://localhost:3333" : "http://192.168.1.3:3333";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function MyAds() {
  const navigation = useNavigation();

  const [cardInfos, setCardInfos] = useState({});
  const [dataItem, setDataItem] = useState<any>({});

  const [ref, setRef] = useState<any>(null);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [advertsActive, setAdvertsActive] = useState([]);
  const [advertsInactive, setAdvertsInactive] = useState([]);
  const [advertsRequested, setAdvertsRequested] = useState([]);

  const x = useRef(new Animated.Value(0)).current;

  const theme = useTheme();
  const { user } = useAuth();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    axios
      .get(`${urlAPI}/advertPerUser/${user.id}/active`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setAdvertsActive(response.data);
      })
      .catch((err) => console.log(err));
  }, [refreshing]);

  useEffect(() => {
    axios
      .get(`${urlAPI}/advertPerUser/${user.id}/inactive`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setAdvertsInactive(response.data);
      })
      .catch((err) => console.log(err));
  }, [refreshing]);

  useEffect(() => {
    axios
      .get(`${urlAPI}/advertPerUser/${user.id}/requested`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setAdvertsRequested(response.data);
      })
      .catch((err) => console.log(err));
  }, [refreshing]);

  const handleOpenAd = (data: any) => {
    setOpenModalOptions(false);
    setCardInfos(data);
    setOpenModalDetails(true);
  };

  const handleDeleteAdvert = async (id: any) => {
    await axios
      .delete(`${urlAPI}/delete-advert`, {
        headers: {
          Accept: "application/json",
        },
        data: {
          id,
        },
      })
      .then(() => {
        Alert.alert("Anuncio excluido com sucesso");
        setOpenModalOptions(false);
        onRefresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <ContentHeader>
        <Icon name="arrowleft" onPress={navigation.goBack} />
        <Title>Meus anúncios</Title>
      </ContentHeader>

      <View
        style={{
          width: width,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.white,
        }}
      >
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            ref.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(14),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
            }}
          >
            Ativos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            ref.scrollTo({
              x: width,
              animated: true,
            });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(14),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
              marginLeft: 10,
            }}
          >
            Em aprovação
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            ref.scrollToEnd({
              animated: true,
            });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(14),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
            }}
          >
            Inativos
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            height: 4,
            width: width / 3,
            borderRadius: 15,
            marginTop: -3,
            marginBottom: 20,
          },
          {
            transform: [
              {
                translateX: x.interpolate({
                  inputRange: [0, width],
                  outputRange: [0, width / 3],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={(ref: any) => setRef(ref)}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], {
          useNativeDriver: true,
        })}
      >
        <View
          style={{
            width: width,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {advertsActive.length > 0 ? (
            <ListingCards
              data={advertsActive || []}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <View key={item.id}>
                  <Card
                    data={item}
                    onPress={() => {
                      setDataItem(item);
                      setOpenModalOptions(true);
                    }}
                  />
                </View>
              )}
            />
          ) : (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Nenhum anuncio
            </Text>
          )}
        </View>
        <View
          style={{
            width: width,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {advertsRequested.length > 0 ? (
            <ListingCards
              data={advertsRequested || []}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <View key={item.id}>
                  <Card
                    data={item}
                    onPress={() => {
                      setDataItem(item);
                      setOpenModalOptions(true);
                    }}
                  />
                </View>
              )}
            />
          ) : (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Nenhum anuncio
            </Text>
          )}
        </View>
        <View
          style={{
            width: width,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {advertsInactive.length > 0 ? (
            <ListingCards
              data={advertsInactive || []}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <View key={item.id}>
                  <Card
                    data={item}
                    onPress={() => {
                      setDataItem(item);
                      setOpenModalOptions(true);
                    }}
                  />
                </View>
              )}
            />
          ) : (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Nenhum anuncio
            </Text>
          )}
        </View>
      </Animated.ScrollView>

      <Modal visible={openModalOptions} transparent animationType="fade">
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal style={shadowContent}>
                <TitleModal>Opções do anúncio</TitleModal>
                <ButtonModal onPress={() => handleOpenAd(dataItem)}>
                  <Text>Ver anuncio</Text>
                </ButtonModal>
                <ButtonModal
                  onPress={() => {
                    setOpenModalOptions(false);
                    navigation.navigate("editAdvert", { dataItem });
                  }}
                >
                  <Text>Editar</Text>
                </ButtonModal>
                <ButtonModal onPress={() => handleDeleteAdvert(dataItem.id)}>
                  <TextRemove>Excluir</TextRemove>
                </ButtonModal>
                <ButtonCancel onPress={() => setOpenModalOptions(false)}>
                  <TextModal>Cancelar</TextModal>
                </ButtonCancel>
              </ContentModal>
            </ContainerModal>
          </View>
        </GestureHandlerRootView>
      </Modal>

      <Modal visible={openModalDetails}>
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <AdDetails setOpenModal={setOpenModalDetails} data={cardInfos} />
        </GestureHandlerRootView>
      </Modal>
    </Container>
  );
}
