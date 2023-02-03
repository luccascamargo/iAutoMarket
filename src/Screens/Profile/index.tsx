import { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { EditProfile } from "../../components/EditProfile";
import { useTheme } from "styled-components";

import {
  Container,
  ContentHeader,
  Title,
  ContentPages,
  Page,
  ContentTitle,
  ContentImage,
  Logout,
  ContentEdit,
  Icon,
  TitleButtonEdit,
} from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { Auth } from "aws-amplify";
import { Spinner } from "native-base";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Profile({ navigation }: any) {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, SignOut } = useAuth();

  async function signOut() {
    try {
      setLoading(true);
      setTimeout(async () => {
        await Auth.signOut();
        SignOut();
        setLoading(false);
      }, 3000);
    } catch (error) {
      Alert.alert("Algo de errado aconteceu", error);
    }
  }

  const handleOpenModalEditProfile = () => {
    setOpenModal(!openModal);
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
      <ContentEdit>
        <TouchableOpacity
          onPress={handleOpenModalEditProfile}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        >
          <TitleButtonEdit>Editar</TitleButtonEdit>
        </TouchableOpacity>
      </ContentEdit>
      <ContentHeader>
        <ContentImage>
          <Text
            style={{
              fontSize: RFValue(40),
              fontFamily: theme.fonts.medium,
              color: theme.colors.title,
            }}
          >
            {user.attributes.given_name[0].toUpperCase()}
          </Text>
        </ContentImage>
        <Title>Minha conta</Title>
      </ContentHeader>

      <ContentPages>
        <Page
          onPress={() => navigation.navigate("myAds")}
          style={shadowContent}
        >
          <ContentTitle>Meus anúncios</ContentTitle>
          <Icon name="arrowright" />
        </Page>
        <Page
          onPress={() => navigation.navigate("favorites")}
          style={shadowContent}
        >
          <ContentTitle>Anúncios salvos</ContentTitle>
          <Icon name="arrowright" />
        </Page>
        <Page
          onPress={() => navigation.navigate("signatures")}
          style={shadowContent}
        >
          <ContentTitle>Assinaturas</ContentTitle>
          <Icon name="arrowright" />
        </Page>
      </ContentPages>

      <Logout onPress={signOut}>Sair</Logout>

      <Modal visible={openModal} animationType="slide">
        <EditProfile
          handleOpenModalEditProfile={handleOpenModalEditProfile}
          setOpenModal={setOpenModal}
          email={user.attributes.email}
          phone={user.phone}
          name={user.attributes.given_name}
          familyName={user.attributes.family_name}
        />
      </Modal>
    </Container>
  );
}
