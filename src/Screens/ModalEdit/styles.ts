import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: flex-start;
  justify-content: flex-end;

  padding-bottom: ${RFValue(15)}px;
  padding-left: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentReset = styled.TouchableOpacity`
  position: absolute;
  bottom: ${RFValue(10)}px;
  right: ${RFValue(15)}px;
  padding: ${RFValue(5)}px;
`;

export const TitleReset = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(12)}px;
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
`;

export const TitleSelect = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ContentButtonGroup = styled.View`
  width: 100%;
  margin-top: ${RFValue(16)}px;
`;

export const ButtonGroup = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentCheckBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(16)}px;
`;
export const CheckBoxTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  margin-left: ${RFValue(16)}px;
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

export const TextInformation = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  padding: 0 ${RFValue(10)}px;
`;

export const ButtonSelectImages = styled.TouchableOpacity`
  width: 90%;
  padding: ${RFValue(15)}px;

  background: ${({ theme }) => theme.colors.white};
  border-radius: ${RFValue(5)}px;

  align-items: center;
  justify-content: center;
`;

export const TextSelectImages = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ContainerImage = styled.View`
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;

  position: relative;
`;

export const BoxImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${RFValue(10)}px;
`;

export const IconClose = styled(AntDesign)`
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 10;
`;

export const Separator = styled.View`
  width: ${RFValue(15)}px;
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
  font-family: ${({ theme }) => theme.fonts.regular};
  color: red;
`;

export const TextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
`;
