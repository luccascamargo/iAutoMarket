import { AntDesign } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${RFValue(15)}px;

  flex-direction: row;
  ${Platform.OS === "ios"
    ? css`
        align-items: flex-end;
      `
    : css`
        align-items: center;
      `}
`;

export const ContentInfos = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.Image``;

export const ImageProfile = styled.Image`
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  border-radius: ${RFValue(50)}px;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin-left: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
`;

export const ContentBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-bottom: ${RFValue(10)}px;
`;

export const Box = styled(RectButton)`
  width: ${RFValue(135)}px;
  height: ${RFValue(135)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(5)}px;

  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;

  justify-content: flex-end;
`;

export const BoxTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  margin-top: ${RFValue(5)}px;
`;

export const BoxTitleTwo = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;

export const ContentPlans = styled.View`
  width: 100%;
  align-items: flex-start;
`;

export const TitlePlans = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin-left: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
`;
