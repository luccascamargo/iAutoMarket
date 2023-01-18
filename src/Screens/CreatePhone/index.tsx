import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import { Masks } from "react-native-mask-input";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import {
  Container,
  ContentInfos,
  Title,
  ContentLogin,
  InputPhone,
} from "./styles";

export function CreatePhone() {
  const [phone, setPhone] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Calma aí!",
        "Você precisa adicionar um número de telefone para cadastrar um anúncio",
        [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Sair do app", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleUserUpdate = async () => {
    try {
      const data = {
        phone,
        email: user.attributes.email,
        name: user.attributes.given_name + user.attributes.family_name,
      };
      await axios.put("http://localhost:3333/user", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentInfos>
          <Title>Adicione seu número de telefone</Title>

          <ContentLogin>
            <InputPhone
              placeholder="Código"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(unmasked, masked) => {
                setPhone(masked);
              }}
              mask={Masks.BRL_PHONE}
            />

            <Button title="Confirmar" onPress={handleUserUpdate} />
          </ContentLogin>
        </ContentInfos>
      </Container>
    </TouchableNativeFeedback>
  );
}
