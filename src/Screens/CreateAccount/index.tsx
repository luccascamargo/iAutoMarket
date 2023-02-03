import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Container,
  ContentInfos,
  Title,
  ContentSeparator,
  Separator,
  TextSeparator,
  TextCreateAccount,
  ContentLogin,
  TextHidePass,
} from "./styles";

const { width } = Dimensions.get("screen");

export function CreateAccount() {
  const [showPass, setShowPass] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const handleShowPass = () => {
    if (password !== "") {
      setShowPass(!showPass);
    }
  };

  async function signUp() {
    try {
      setLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      setLoading(false);
      navigation.navigate("confirmAccount", { email });
    } catch (error) {
      setLoading(false);
      console.log("erro ao se inscrever:", error);
      Alert.alert("Erro ao se inscrever, entre em contato conosco");
    }
  }

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContentInfos>
          <Title>Crie sua conta na SerraMotors</Title>

          <ContentLogin>
            <Input
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="name"
              autoComplete="name"
              keyboardType="default"
              onChangeText={setFirstName}
              placeholderTextColor={theme.colors.text}
            />

            <Input
              placeholder="Sobrenome"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="name"
              autoComplete="name"
              keyboardType="default"
              onChangeText={setLastName}
              placeholderTextColor={theme.colors.text}
            />

            <Input
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholderTextColor={theme.colors.text}
            />

            <Input
              placeholder="Senha"
              onChangeText={setPassword}
              secureTextEntry={showPass}
              keyboardType="visible-password"
              placeholderTextColor={theme.colors.text}
            />

            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <TextHidePass onPress={handleShowPass}>
                {showPass ? "Mostrar senha" : "Esconder Senha"}
              </TextHidePass>
            </View>

            <Button
              title="Cadastrar"
              onPress={signUp}
              disabled={loading && true}
            />
          </ContentLogin>

          <ContentSeparator>
            <Separator />
            <TextSeparator>ou</TextSeparator>
            <Separator />
          </ContentSeparator>

          {/* <ContentCreateWithSocials color="#4285F4">
            <Photo
              source={{
                uri: 'https://res.cloudinary.com/serramotors/image/upload/v1649558212/Google_aolzsx.png',
              }}
            />
            <SocialText>Entrar com Google</SocialText>
          </ContentCreateWithSocials>

          <ContentCreateWithSocials 
            color="rgb(35, 116, 225)" 
          >
            <Photo
              source={{
                uri: 'https://res.cloudinary.com/serramotors/image/upload/v1649558212/Google_aolzsx.png',
              }}
            />
            <SocialText>Entrar com Facebook</SocialText>
          
          </ContentCreateWithSocials>
          
          <ContentCreateWithSocials color="rgb(37, 37, 37)">
            <Photo
              source={{
                uri: 'https://res.cloudinary.com/serramotors/image/upload/v1649558212/Google_aolzsx.png',
              }}
            />
            <SocialText>Iniciar sessão com Apple</SocialText>
          </ContentCreateWithSocials> */}

          <View style={styles.ContentText}>
            <TextCreateAccount>Já tem uma conta? </TextCreateAccount>

            <TextCreateAccount
              color={theme.colors.primary}
              onPress={() => navigation.navigate("login")}
            >
              Entre agora
            </TextCreateAccount>
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
