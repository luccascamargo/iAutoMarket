import { AntDesign } from "@expo/vector-icons";
import { FlatList, Platform } from "react-native";
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

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled.TouchableOpacity`
  position: absolute;
  left: ${RFValue(20)}px;
  bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentFilters = styled.View`
  align-items: center;
  margin: ${RFValue(5)}px 0;
`;

export const Filter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-radius: 5px;
`;

export const TitleFilter = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ListingCards = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 10,
  },
})`
  width: 100%;

  padding-left: ${RFValue(5)}px;
  padding-right: ${RFValue(5)}px;
`;

export const ContentEditing = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(0)}px;
  bottom: ${RFValue(15)}px;

  padding: ${RFValue(0)}px ${RFValue(10)}px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.white};

  transform: rotate(90deg);
`;
export const TitleEditing = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
`;

export const ContentOptions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  padding: ${RFValue(15)}px 0;
`;

export const Option = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(11)}px;
`;

export const IconEditing = styled(AntDesign)`
  font-size: ${RFValue(15)}px;
`;

export const ContainerModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  font-family: ${({ theme }) => theme.fonts.medium};
  color: red;
`;

export const TextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`;
