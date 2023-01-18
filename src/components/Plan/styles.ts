import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface PlanProps {
  background: string;
  color: string;
  borderColor?: string;
  disable?: boolean;
}

interface ButtonProps {
  onClick?: () => any;
}

export const Container = styled.View<PlanProps>`
  width: 85%;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  margin-left: ${RFValue(20)}px;
  margin-top: ${RFValue(16)}px;

  padding: ${RFValue(20)}px;
`;

export const ButtonSubscription = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  margin-top: ${RFValue(15)}px;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
`;

export const Title = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
`;

export const SubTitle = styled.Text`
  margin-top: ${RFValue(10)}px;

  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 500;
`;
export const Price = styled.Text`
  margin-top: ${RFValue(30)}px;

  font-size: ${RFValue(34)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;
export const PriceDescription = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 500;
`;
export const Features = styled.View`
  margin-top: ${RFValue(20)}px;
`;
export const Feature = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(5)}px;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
export const FeatureTitle = styled.Text<PlanProps>`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;

  opacity: ${({ disable }) => (disable ? 0.7 : 1)};
  margin-left: ${({ disable }) => (disable ? RFValue(24) : RFValue(0))}px;
`;
