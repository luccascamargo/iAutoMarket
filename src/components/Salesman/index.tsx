import React from "react";
import * as Linking from "expo-linking";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Container,
  ContentUser,
  Name,
  Line,
  Email,
  ContentUserInfo,
  TextContact,
  ButtomContact,
  ButtonText,
  ContentButtons,
} from "./styles";
import { useRef } from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Salesman() {
  const { user } = useAuth();

  const handleWhats = () => {
    let url =
      "whatsapp://send?text=testando mensagem" + "&phone=55" + user.phone;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp aberto");
      })
      .catch(() => {
        alert("Verifique se o Whatsapp está instalado no seu dispositivo");
      });
  };

  const handleMail = () => {
    Linking.openURL("mailto:" + user.attributes.email)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const theme = useTheme();
  const sheetRef = useRef(null);
  const snapPoints = ["15%", "55%", "70%"];

  return (
    <Container>
      <ContentUser>
        <View
          style={{
            width: RFValue(80),
            height: RFValue(80),
            borderRadius: 50,
            backgroundColor: theme.colors.white,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(40),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
            }}
          >
            {user.attributes.given_name[0]?.toUpperCase()}
          </Text>
        </View>
        <ContentUserInfo>
          <Name>
            {user.attributes.given_name + user.attributes.family_name}
          </Name>
          <Email>{user.attributes.email}</Email>
        </ContentUserInfo>
      </ContentUser>

      <Line />

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}
      >
        <BottomSheetView>
          <TextContact style={{ paddingLeft: 20, marginTop: 20 }}>
            Entrar em contato
          </TextContact>

          <ContentButtons>
            <ButtomContact
              style={shadowContent}
              elevation={10}
              onPress={handleWhats}
            >
              <ButtonText>Entrar via WhatsApp</ButtonText>
            </ButtomContact>
            <ButtomContact
              style={shadowContent}
              elevation={10}
              onPress={handleMail}
            >
              <ButtonText>Entrar via E-mail</ButtonText>
            </ButtomContact>
            <ButtomContact style={shadowContent} elevation={10}>
              <ButtonText>Entrar via telefone</ButtonText>
            </ButtomContact>
          </ContentButtons>
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
}
