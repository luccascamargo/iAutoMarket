import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { Alert, Keyboard, TouchableNativeFeedback } from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Container,
  ContentInfos,
  Title,
  ContentLogin,
  ResendConfirmationContent,
  TitleResend,
} from "./styles";

export function ConfirmAccount({ route }) {
  const [code, setCode] = useState("");
  const { email } = route.params;

  const theme = useTheme();

  const navigation = useNavigation();

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate("login");
    } catch (error) {
      console.log("Algo de errado aconteceu", error);
      Alert.alert("Algo de errado aconteceu");
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("Código reenviando com sucesso");
    } catch (err) {
      Alert.alert("Erro ao reenviar o código");
      navigation.navigate("createAccount");
    }
  }

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentInfos>
          <Title>Confirme sua conta</Title>

          <ContentLogin>
            <Input
              placeholder="Código"
              onChangeText={setCode}
              keyboardType="email-address"
              placeholderTextColor={theme.colors.text}
            />

            <Button title="Confirmar" onPress={confirmSignUp} />

            <ResendConfirmationContent onPress={resendConfirmationCode}>
              <TitleResend>Reenviar codigo</TitleResend>
            </ResendConfirmationContent>
          </ContentLogin>
        </ContentInfos>
      </Container>
    </TouchableNativeFeedback>
  );
}
