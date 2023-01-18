import { AntDesign } from "@expo/vector-icons";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

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
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContainerTextClean = styled.View`
  width: 100%;
  padding: ${RFValue(15)}px ${RFValue(20)}px;
  padding-bottom: ${RFValue(5)}px;
  display: flex;
  align-items: flex-end;
`;
export const TextClean = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ListingCards = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 30,
  },
})`
  width: 100%;
  padding-left: ${RFValue(5)}px;
  padding-right: ${RFValue(5)}px;
`;

export const ContentEditing = styled.View`
  position: absolute;
  right: ${RFValue(5)}px;
  top: ${RFValue(5)}px;

  padding: ${RFValue(4)}px ${RFValue(20)}px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentMessage = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  width: 80%;
  text-align: center;
`;

export const Icon2 = styled(AntDesign)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(5)}px;
`;

export const ContainerModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #0056e14c;
`;
export const ContentModal = styled.View`
  background-color: #ffffff;
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(15)}px;
  width: auto;

  align-items: center;
  justify-content: center;
`;

export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const ButtonModal = styled.TouchableOpacity`
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(10)}px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(10)}px;
`;

export const TextRemove = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: red;
`;

export const TextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
`;
