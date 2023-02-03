import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : 0}px;
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${Platform.OS === "ios" ? RFValue(15) : 0}px;
  background-color: ${({ theme }) => theme.colors.background};

  flex-direction: row;
  ${Platform.OS === "ios"
    ? css`
        align-items: flex-end;
      `
    : css`
        align-items: center;
      `}
`;

export const ContentWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentFilters = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const InputFind = styled.TextInput`
  width: ${RFPercentage(30)}px;
  padding: 8px;

  font-size: ${RFValue(16)}px;

  border-radius: 5px;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const IconFilter = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ListingCards = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
  padding-left: ${RFValue(5)}px;
  padding-right: ${RFValue(5)}px;
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

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(18)}px;
  margin-top: ${RFValue(10)}px;
`;

export const ImageProfile = styled.Image`
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  border-radius: ${RFValue(50)}px;
  margin-left: ${RFValue(10)}px;
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
