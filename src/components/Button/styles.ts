import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 90%;

  padding: 15px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.primary};

  margin-top: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
