import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentInfos = styled.View`
  width: 100%;
  padding: 0 27px;
  margin-top: ${RFPercentage(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(32)}px;

  margin-bottom: ${RFValue(30)}px;
`;

export const ContentLogin = styled.View`
  align-items: center;
`;

export const TextReset = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
  margin: ${RFValue(30)}px auto;
`;

export const ContentSeparator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${RFValue(45)}px;
`;

export const Separator = styled.View`
  width: 130px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.title};
`;

export const TextSeparator = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ContentCreateWithSocials = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: ${RFValue(37)}px;
`;
export const Photo = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
`;

export const TextCreateAccount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
  margin: 0 auto;
`;
