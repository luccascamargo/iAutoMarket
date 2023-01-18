import { AntDesign } from "@expo/vector-icons";
import MaskInput from "react-native-mask-input";
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

export const ContentLogin = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextReset = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  margin: ${RFValue(30)}px auto;
`;

export const ResendConfirmationContent = styled.TouchableOpacity`
  margin-top: ${RFValue(30)}px;
`;
export const TitleResend = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(12)}px;
`;

export const InputPhone = styled(MaskInput)`
  width: 90%;

  padding: ${RFValue(15)}px;

  font-size: ${RFValue(13)}px;

  border-radius: ${RFValue(5)}px;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  margin: 7px 0;
`;
