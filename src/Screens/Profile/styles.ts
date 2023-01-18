import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentEdit = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;

  padding: ${RFValue(15)}px;
`;

export const TitleButtonEdit = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${RFValue(225)}px;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${RFValue(15)}px;

  align-items: center;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ImageUser = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${RFValue(50)}px;
`;

export const ContentImage = styled.View`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;
  border-radius: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  margin-top: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  margin-top: ${RFValue(10)}px;
`;

export const Region = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  margin-top: ${RFValue(3)}px;
`;

export const ContentPages = styled.View`
  width: 100%;
  margin-top: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Page = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(5)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CountFav = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Logout = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: red;

  margin-top: ${RFValue(50)}px;
`;
