import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import { Masks } from "react-native-mask-input";

import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
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
      const options = {
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        data: {
          phone,
          email: user.attributes.email,
          name: user.attributes.given_name + user.attributes.family_name,
        },
      };
      await api.put("user", options);
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
