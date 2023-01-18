import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContentCreateWithSocials {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : RFValue(20)}px;
`;

export const ContentInfos = styled.View`
  width: 100%;
  padding: 0 27px;

  align-items: flex-start;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(32)}px;

  margin-bottom: ${RFValue(30)}px;
`;

export const ContentBack = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(50)}px;
  padding-left: ${RFValue(20)}px;
`;

export const ContentLogin = styled.View`
  width: 100%;
  align-items: center;
`;

export const TextReset = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(13)}px;
`;

export const ContentReset = styled.TouchableOpacity`
  margin: ${RFValue(30)}px 0;
  align-items: center;
  justify-content: center;
`;

export const ContentSeparator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${RFValue(20)}px;
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

export const ContentCreateWithSocials = styled.TouchableOpacity<ContentCreateWithSocials>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(15)}px;
  margin-top: ${RFValue(8)}px;
  border-radius: ${RFValue(5)}px;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
`;

export const Photo = styled.Image`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  position: absolute;
  left: ${RFValue(15)}px;
`;

export const TextCreateAccount = styled.Text<ContentCreateWithSocials>`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme, color }) => (color ? color : theme.colors.title)};
  font-size: ${RFValue(14)}px;
`;

export const SocialText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(14)}px;

  margin-left: ${RFValue(30)}px;
`;

export const TextHidePass = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(11)}px;
`;
