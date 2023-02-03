import { useNavigation } from "@react-navigation/native";
import { Alert, FlatList, Text } from "react-native";
import * as Linking from "expo-linking";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "styled-components";
import {
  Container,
  ContentHeader,
  Icon,
  Title,
  Content,
  BoxPlan,
  TitlePlan,
  ContentPlan,
  ListPlans,
  Description,
} from "./styles";
import { Separator } from "../../components/ModalSelect/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api } from "../../services/api";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const listPlans = [
  {
    key: 1,
    label: "Plano Pro: R$34,90/mes",
    disable: false,
  },
  {
    key: 2,
    label: "Plano Pro: R$34,90/mes",
    disable: false,
  },
  {
    key: 3,
    label: "Plano Pro: R$34,90/mes",
    disable: true,
  },
  {
    key: 4,
    label: "Plano Pro: R$34,90/mes",
    disable: true,
  },
];

export function Signatures() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleSubscription = async () => {
    try {
      setLoading(true);
      if (!user) {
        navigation.navigate("login");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        data: {
          customer_id: user?.customer_id,
        },
      };

      const { data } = await api.post("create-checkout-session", config);

      setLoading(false);
      Linking.openURL(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContentHeader elevation={10} style={shadowContent}>
        <Icon onPress={navigation.goBack}>
          <AntDesign name="arrowleft" color={theme.colors.primary} size={32} />
        </Icon>
        <Title>Minhas assinaturas</Title>
      </ContentHeader>
      <Content>
        <Description>
          Aqui você poderá gerenciar sua assinatura assim como alterar plano,
          forma de pagamentos e muito mais.
        </Description>
        <Button
          title="Gerencie"
          onPress={handleSubscription}
          disabled={loading && true}
        />
      </Content>
    </Container>
  );
}
