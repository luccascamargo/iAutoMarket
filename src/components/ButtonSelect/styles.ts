import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { css } from "styled-components";
import { Platform } from "react-native";

interface ButtonProps {
  group?: Boolean;
  error: Boolean;
  disable?: Boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: ${({ group }) => (group ? "48%" : "90%")};
  height: ${RFValue(40)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: ${RFValue(5)}px;

  padding: 0 ${RFValue(20)}px;

  margin-top: ${RFValue(5)}px;
  background: ${({ theme }) =>
    Platform.OS === "ios" ? theme.colors.background : theme.colors.white};

  ${({ error }) =>
    error &&
    css`
      border-width: ${RFValue(1)}px;
      border-color: ${({ theme }) => theme.colors.error};
    `}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(AntDesign)<ButtonProps>`
  font-size: ${RFValue(12)}px;
  color: #cccccc;

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.error};
    `}
`;
