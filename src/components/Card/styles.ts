import { AntDesign } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;

  border-radius: 5px;

  margin: 16px auto;

  background-color: ${({ theme }) => theme.colors.background};

  opacity: ${({ condition }) => (condition === "INACTIVE" ? 0.5 : 0)};
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: ${RFValue(150)}px;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const ContentTitleFav = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 ${RFValue(10)}px;
  margin-top: ${RFValue(6)}px;
`;

export const ContentTitle = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(5)}px;
`;

export const IconFav = styled(AntDesign)`
  font-size: ${RFValue(18)}px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-left: ${RFValue(10)}px;
  margin-top: ${RFValue(17)}px;
`;
export const ContentOtherInfos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 ${RFValue(10)}px;
  margin-top: ${RFValue(38)}px;
`;

export const Year = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
export const Km = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
export const Color = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
export const Line = styled.View`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.primary};
  margin-top: ${RFValue(23)}px;
  opacity: 0.2;
`;

export const Region = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  margin: ${RFValue(15)}px auto;
`;
