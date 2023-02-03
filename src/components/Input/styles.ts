import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TextInput)`
  width: 90%;

  padding: 15px;

  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.light};

  border-radius: 5px;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  margin: 7px 0;
`;
