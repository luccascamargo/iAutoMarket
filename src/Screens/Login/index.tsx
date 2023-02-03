import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import {
  Container,
  ContentInfos,
  Title,
  TextReset,
  ContentSeparator,
  Separator,
  TextSeparator,
  TextCreateAccount,
  ContentLogin,
  TextHidePass,
  ContentReset,
} from "./styles";

const { width } = Dimensions.get("screen");

export function Login() {
  const [showPass, setShowPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { SignIn } = useAuth();
  const theme = useTheme();

  const navigation = useNavigation();

  const handleShowPass = () => {
    if (password !== "") {
      setShowPass(!showPass);
    }
  };

  async function signIn() {
    if (email === "" || password === "") {
      Alert.alert("Por favor, insira um endereço de e-mail valido.");
      return;
    }
    try {
      setLoading(true);
      const user = await Auth.signIn({ username: email, password });
      await api.post("create-customer", {
        data: {
          firstName: `${user.attributes.given_name} ${user.attributes.family_name}`,
          email: user.attributes.email,
        },
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
      });
      SignIn(user);
      setLoading(false);
      navigation.navigate("profile");
    } catch (error) {
      Auth.signOut();
      Alert.alert(
        "Algo de errado aconteceu, tente novamente ou entre em contato com nosso suporte"
      );
      console.log("error signing in", error);
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    if (email === "") {
      return Alert.alert("Digite seu e-mail");
    }

    await Auth.forgotPassword(email)
      .then(() => {
        Alert.alert("Um código foi enviado para o seu e-mail");
        navigation.navigate("forgotPassword", { email });
      })
      .catch((err) => {
        Alert.alert("Algo de errado aconteceu, tenta novamente mais tarde");
      });
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentInfos>
          <Title>Faça seu login</Title>

          <ContentLogin>
            <Input
              placeholder="Usuário ou E-mail"
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholderTextColor={theme.colors.text}
            />

            <Input
              placeholder="Senha"
              placeholderTextColor={theme.colors.text}
              onChangeText={setPassword}
              secureTextEntry={showPass}
            />

            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <TextHidePass onPress={handleShowPass}>
                {showPass ? "Mostrar senha" : "Esconder Senha"}
              </TextHidePass>
            </View>

            <Button
              title="Entrar"
              onPress={signIn}
              disabled={loading && true}
            />
          </ContentLogin>

          <View style={{ width: "100%" }}>
            <ContentReset onPress={handleResetPassword}>
              <TextReset>Esqueci minha senha</TextReset>
            </ContentReset>
          </View>

          {/* <ContentSeparator>
            <Separator />
            <TextSeparator>ou</TextSeparator>
            <Separator />
          </ContentSeparator>

          <TouchableOpacity
            style={{ backgroundColor: "#4285F4" }}
            onPress={handleGoogle}
          >
            <Text>Entrar com Google</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: "rgb(35, 116, 225)" }}>
            <Text>Entrar com Facebook</Text>
          </View>

          <View style={{ backgroundColor: "rgb(37, 37, 37)" }}>
            <Text>Iniciar sessão com Apple</Text>
          </View> */}

          <View style={styles.ContentText}>
            <TextCreateAccount>Não tem uma conta? </TextCreateAccount>

            <TouchableOpacity
              onPress={() => navigation.navigate("createAccount")}
            >
              <TextCreateAccount style={{ color: theme.colors.primary }}>
                Crie agora
              </TextCreateAccount>
            </TouchableOpacity>
          </View>
        </ContentInfos>
      </Container>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  ContentText: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -27,
    marginTop: 30,
  },
});
