import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import {
  Container,
  ContentHeader,
  Icon,
  Title,
  Content,
  ContentText,
  Text1,
  Text2,
  ContentGerenciar,
  Gerenciar,
  GerenciarTitle,
} from "./styles";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Signature({ route }) {
  console.log(route.params.signature);
  const navigation = useNavigation();
  const { user } = useAuth();
  return (
    <Container>
      <ContentHeader elevation={10} style={shadowContent}>
        <Icon name="arrowleft" onPress={navigation.goBack} />
        <Title>Minhas assinaturas</Title>
      </ContentHeader>
      <Content>
        <ContentText>
          <Text1>Olá, {user?.attributes.given_name}</Text1>
          <Text2>Estamos felizes por voce fazer parte do Pro</Text2>
        </ContentText>
        <ContentGerenciar>
          <Gerenciar>
            <GerenciarTitle>Gerenciar</GerenciarTitle>
          </Gerenciar>
        </ContentGerenciar>
      </Content>
    </Container>
  );
}
