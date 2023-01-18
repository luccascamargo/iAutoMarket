import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, ContentInfos, Title, ContentLogin } from "./styles";

export function ForgotPassword({ route }) {
  const { email } = route.params;
  const [inputEmail, setInputEmail] = useState(email);
  const [code, setCode] = useState(null);
  const [newPass, setNewPass] = useState(null);

  const navigation = useNavigation();

  const handleReset = async () => {
    Auth.forgotPasswordSubmit(email, code, newPass)
      .then((data) => {
        Alert.alert("Senha alterada com sucesso!");
        navigation.navigate("login");
      })
      .catch((err) => {
        Alert.alert("Algo de errado aconteceu, tenta novamente mais tarde");
      });
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentInfos>
          <Title>Altere sua senha:</Title>

          <ContentLogin>
            <Input
              placeholder="Usuário ou E-mail"
              value={inputEmail}
              onChangeText={(event) => setInputEmail(event)}
            />

            <Input
              placeholder="Código"
              value={code}
              onChangeText={(event) => setCode(event)}
            />

            <Input
              placeholder="Nova senha"
              value={newPass}
              onChangeText={(event) => setNewPass(event)}
            />

            <Button title="Redefinir" onPress={handleReset} />
          </ContentLogin>
        </ContentInfos>
      </Container>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
});
