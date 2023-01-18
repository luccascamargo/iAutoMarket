import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
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

export const ContentChangeUser = styled.View`
  width: 100%;

  padding: ${RFValue(10)}px;

  align-items: center;
`;

export const TitleInput = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentButtonSelect = styled.View`
  width: 100%;
  align-items: center;
  padding-top: ${RFValue(5)}px;
  padding-bottom: ${RFValue(13)}px;
`;

export const TitleSelect = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const InputEdit = styled(MaskInput)`
  width: 90%;

  padding: ${RFValue(15)}px;

  font-size: ${RFValue(13)}px;

  border-radius: ${RFValue(5)}px;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  margin: 7px 0;
`;
