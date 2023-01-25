import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface OptionProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(50)}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${RFValue(10)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const SelectButton = styled.TouchableOpacity`
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
`;

export const TextSelect = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ListOptions = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  width: 100%;
  height: ${RFValue(40)}px;
  padding: 0 ${RFPercentage(3)}px;

  justify-content: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.background};
`;

export const TextOption = styled.Text<OptionProps>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.text};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Separator = styled.View`
  width: 100%;
  height: ${RFValue(1)}px;
  background-color: ${({ theme }) => theme.colors.text};
  opacity: 0.2;
`;
