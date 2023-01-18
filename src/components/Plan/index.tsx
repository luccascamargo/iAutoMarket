import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import axios from "axios";
import { useState } from "react";
import { Modal, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../Button";

import {
  ButtonSubscription,
  Container,
  Feature,
  FeatureTitle,
  Features,
  Price,
  PriceDescription,
  SubTitle,
  Title,
  TextButton,
  Icon,
} from "./styles";
import { Spinner } from "native-base";

interface featuresProps {
  key: number;
  label: string;
  disable: boolean;
}

interface PlanProps {
  background: string;
  color: string;
  price: string;
  title: string;
  subTitle: string;
  borderColor?: string;
  lookUpKey: string;
  features: Array<featuresProps>;
}

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Plan({ ...props }: PlanProps) {
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  const handleSubscription = async () => {
    try {
      setLoading(true);
      if (!user) {
        navigation.navigate("login");
        setLoading(false);
        return;
      }

      if (user?.stripePlan !== "DEFAULT") {
        handleModal();
        setLoading(false);
        return;
      }

      const config = {
        customer_id: user?.customer_id,
        key: props.lookUpKey,
      };

      const { data } = await axios.post(
        "http://localhost:3333/create-checkout-session",
        config
      );

      setLoading(false);
      Linking.openURL(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Container {...props} style={shadowContent} elevation={10}>
      <Title>{props.title}</Title>
      <SubTitle>{props.subTitle}</SubTitle>
      <Price>{props.price}</Price>
      <PriceDescription>por mes</PriceDescription>

      <Features>
        {props.features.map((feature: featuresProps) => (
          <Feature key={feature.key}>
            {!feature.disable && (
              <Icon name="check" color={theme.colors.primary} />
            )}
            <FeatureTitle disable={feature.disable ? true : false}>
              {feature.label}
            </FeatureTitle>
          </Feature>
        ))}
      </Features>

      <ButtonSubscription onPress={handleSubscription}>
        <TextButton style={loading && { marginRight: 10 }}>
          Contrate agora
        </TextButton>
        {loading && <Spinner size={"sm"} color={theme.colors.white} />}
      </ButtonSubscription>

      <Modal visible={open} animationType="slide" presentationStyle="formSheet">
        <GestureHandlerRootView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Text>
            Para contratar outro plano voce primeiramente deve cancelar seu
            plano atual
          </Text>
          <Button
            title="Gerenciar assinaturas"
            onPress={() => {
              handleModal();
              navigation.navigate("signatures");
            }}
          />
          <Button title="Ok" onPress={handleModal} />
        </GestureHandlerRootView>
      </Modal>
    </Container>
  );
}