import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

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

export const ContentStamp = styled.View`
  position: absolute;
  top: ${RFValue(10)}px;
  left: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(5)}px;
  z-index: 1;
`;
export const Stamp = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(10)}px;
`;
