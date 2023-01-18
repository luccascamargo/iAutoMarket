import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;

  padding: ${RFValue(15)}px;
`;

export const ContentPages = styled.View`
  width: 100%;
`;

export const Page = styled.TouchableOpacity`
  width: 100%;
  padding: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.background};

  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(5)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ContentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: ${RFValue(10)}px;
`;
