import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContentCreateWithSocials {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentInfos = styled.View`
  width: 100%;
  padding: 0 27px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(32)}px;

  margin-bottom: ${RFValue(30)}px;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(30)}px;
  padding-left: ${RFValue(20)}px;
`;

export const ContentLogin = styled.View`
  width: 100%;
  align-items: center;
`;

export const TextReset = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  margin: ${RFValue(30)}px auto;
`;

export const ContentSeparator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: ${RFValue(30)}px 0 ${RFValue(20)}px 0;
`;

export const Separator = styled.View`
  width: 130px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.title};
`;

export const TextSeparator = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
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
  font-size: ${RFValue(15)}px;

  margin-left: ${RFValue(30)}px;
`;

export const TextHidePass = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(11)}px;
`;
