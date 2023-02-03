import { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
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
import { AdDetails } from "../AdDetails";
import { Card } from "../../components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Spinner } from "native-base";
import { api } from "../../services/api";

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
  const [dataItem, setDataItem] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [ref, setRef] = useState<any>(null);
  const [openModalInactive, setOpenModalInactive] = useState(false);
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [openModalRequested, setOpenModalRequested] = useState(false);
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

  const handleDeleteAdvert = async (id: string) => {
    await api
      .delete("delete-advert", {
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
        setOpenModalInactive(false);
        setOpenModalRequested(false);
        onRefresh();
      })
      .catch((err) => console.log(err));
  };

  const handlePublishAdvert = async (id: string) => {
    setOpenModalInactive(false);

    try {
      setLoading(true);
      const { data } = await api.put("publish", {
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        data: {
          id,
          user_id: user.id,
        },
      });
      if (data.code === "ATPLAN") {
        setLoading(false);
        Alert.alert(data.message);
        navigation.navigate("signatures");
      }
      setLoading(false);
      onRefresh();
      Alert.alert("Seu anuncio vai ser analisado e logo estará ativo");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Algo de errado aconteceu. entre em contato com nosso suporte"
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner size="lg" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Container>
      <ContentHeader>
        <Icon onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={32} color={theme.colors.primary} />
        </Icon>
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
                <RefreshControl
                  tintColor={theme.colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
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
                <RefreshControl
                  tintColor={theme.colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <View key={item.id}>
                  <Card
                    condition="INACTIVE"
                    data={item}
                    onPress={() => {
                      setDataItem(item);
                      setOpenModalRequested(true);
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
                <RefreshControl
                  tintColor={theme.colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <View key={item.id}>
                  <Card
                    condition="INACTIVE"
                    data={item}
                    onPress={() => {
                      setDataItem(item);
                      setOpenModalInactive(true);
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

      <Modal visible={openModalRequested} transparent animationType="fade">
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal style={shadowContent}>
                <TitleModal>Opções do anúncio</TitleModal>
                <ButtonModal
                  onPress={() => {
                    setOpenModalRequested(false);

                    navigation.navigate("advert", { dataItem });
                  }}
                >
                  <TextModal
                    style={{
                      color: theme.colors.text,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Ver anuncio
                  </TextModal>
                </ButtonModal>
                <ButtonModal onPress={() => handleDeleteAdvert(dataItem.id)}>
                  <TextRemove>Excluir</TextRemove>
                </ButtonModal>
                <ButtonCancel onPress={() => setOpenModalRequested(false)}>
                  <TextModal>Cancelar</TextModal>
                </ButtonCancel>
              </ContentModal>
            </ContainerModal>
          </View>
        </GestureHandlerRootView>
      </Modal>

      <Modal visible={openModalOptions} transparent animationType="fade">
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal style={shadowContent}>
                <TitleModal>Opções do anúncio</TitleModal>
                <ButtonModal
                  onPress={() => {
                    setOpenModalOptions(false);

                    navigation.navigate("advert", { dataItem });
                  }}
                >
                  <TextModal
                    style={{
                      color: theme.colors.text,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Ver anuncio
                  </TextModal>
                </ButtonModal>
                <ButtonModal
                  onPress={() => {
                    setOpenModalOptions(false);
                    navigation.navigate("editAdvert", { dataItem });
                  }}
                >
                  <TextModal
                    style={{
                      color: theme.colors.text,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Editar
                  </TextModal>
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

      <Modal visible={openModalInactive} transparent animationType="fade">
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <ContainerModal>
              <ContentModal style={shadowContent}>
                <TitleModal>Opções do anúncio</TitleModal>
                <ButtonModal onPress={() => handlePublishAdvert(dataItem.id)}>
                  <TextModal>Publicar novamente</TextModal>
                </ButtonModal>
                <ButtonModal
                  onPress={() => {
                    setOpenModalInactive(false);

                    navigation.navigate("advert", { dataItem });
                  }}
                >
                  <TextModal>Ver anuncio</TextModal>
                </ButtonModal>
                <ButtonModal onPress={() => handleDeleteAdvert(dataItem.id)}>
                  <TextRemove>Excluir</TextRemove>
                </ButtonModal>
                <ButtonCancel onPress={() => setOpenModalInactive(false)}>
                  <TextModal>Cancelar</TextModal>
                </ButtonCancel>
              </ContentModal>
            </ContainerModal>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </Container>
  );
}
