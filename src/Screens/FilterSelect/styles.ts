import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;

  padding: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentReset = styled.TouchableOpacity.attrs({
  hitSlop: { top: 30, left: 30, bottom: 30, right: 30 },
})``;

export const TitleReset = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContainerForms = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : "height",
  keyboardVerticalOffset: 10,
})`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentForm = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 20,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})`
  width: 100%;
`;

export const ContentButtonSelect = styled.View`
  width: 100%;
  align-items: center;
  padding-top: ${RFValue(13)}px;
  padding-bottom: ${RFValue(13)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentGroupSelect = styled.View`
  width: 90%;
  flex-direction: row;

  justify-content: space-between;
`;

export const TitleSelect = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const InputPrice = styled(MaskInput)`
  width: 90%;

  padding: ${RFValue(15)}px;

  font-size: ${RFValue(13)}px;

  border-radius: ${RFValue(5)}px;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  margin: 7px 0;
`;

export const TextModalKm = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
