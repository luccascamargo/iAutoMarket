import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  position: relative;
`;

export const ContentHeader = styled.View`
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : 0}px;
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;

  padding-bottom: ${RFValue(15)}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  position: relative;

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
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentScrollView = styled.ScrollView``;

export const ContentMenus = styled.View`
  align-items: center;
  margin: ${RFValue(5)}px 0;
`;

export const Menu = styled.Text``;

export const Filter = styled.TouchableOpacity`
  width: 50%;
  height: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px 0;
  margin-left: ${RFValue(5)}px;
`;

export const TitleSalesman = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const TitleVehicle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ListingCards = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 20,
  },
})`
  width: 100%;
`;

export const ContentEditing = styled.View`
  position: absolute;
  right: ${RFValue(5)}px;
  top: ${RFValue(5)}px;

  padding: ${RFValue(4)}px ${RFValue(20)}px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleEditing = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
`;

export const ContentWhats = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(20)}px;
  bottom: ${RFValue(55)}px;

  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;

  border-radius: ${RFPercentage(50)}px;
`;

export const ButtonWhats = styled.Image`
  background-color: #20b038;
  width: 100%;
  height: 100%;
  border-radius: ${RFPercentage(50)}px;
`;
