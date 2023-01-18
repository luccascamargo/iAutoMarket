import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal } from "react-native";
import { AdDetails } from "../../components/AdDetails";
import { Card } from "../../components/Card";
import {
  ContentHeader,
  Container,
  IconFilter,
  ListingCards,
  ContentWrap,
  ContentMessage,
  Message,
  Icon,
  ContentFilters,
} from "./styles";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Search({ route }) {
  const [openModal, setOpenModal] = useState(false);
  const [cardInfos, setCardInfos] = useState({});

  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { adverts } = route.params;

  const handleOpenAd = (data: any) => {
    setCardInfos(data);
    setOpenModal(true);
  };

  const handleModalLogin = () => {
    if (user) {
      navigation.navigate("profile");
    } else {
      navigation.navigate("login");
    }
  };

  return (
    <Container>
      <ContentHeader style={shadowContent} elevation={10}>
        <ContentWrap>
          <ContentFilters>
            <IconFilter name="filter" onPress={() => navigation.goBack()} />
          </ContentFilters>
          {user ? (
            <RectButton
              onPress={() => navigation.navigate("profile")}
              style={{
                width: RFValue(30),
                height: RFValue(30),
                backgroundColor: theme.colors.white,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: RFValue(15),
              }}
            >
              <Text
                style={{
                  color: theme.colors.title,
                  fontSize: RFValue(15),
                  fontFamily: theme.fonts.medium,
                }}
              >
                {user.attributes.given_name[0]?.toUpperCase()}
              </Text>
            </RectButton>
          ) : (
            <IconFilter name="user" onPress={handleModalLogin} />
          )}
        </ContentWrap>
      </ContentHeader>

      {adverts !== undefined ? (
        <ListingCards
          data={adverts}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <Card data={item} onPress={() => handleOpenAd(item)} />
          )}
        />
      ) : (
        <ContentMessage>
          <Message>Nenhum anúncio encontrado</Message>
          <AntDesign
            name="frowno"
            size={24}
            color={theme.colors.primary}
            style={{ marginTop: 10 }}
          />
        </ContentMessage>
      )}

      <Modal visible={openModal} animationType="slide">
        <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
          <AdDetails setOpenModal={setOpenModal} data={cardInfos} />
        </GestureHandlerRootView>
      </Modal>
    </Container>
  );
}
