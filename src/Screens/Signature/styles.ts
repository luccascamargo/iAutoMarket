import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : 0}px;
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${RFValue(15)}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  left: ${RFValue(20)}px;
  bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Content = styled.View`
  margin-top: ${RFValue(20)}px;
  width: 100%;
  padding: 0 ${RFValue(20)}px;
`;
export const ContentText = styled.View``;
export const Text1 = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
export const Text2 = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const ContentGerenciar = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: ${RFValue(15)}px;
`;

export const Gerenciar = styled.TouchableOpacity``;

export const GerenciarTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
`;
