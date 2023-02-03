import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(30)}px;
`;
export const ContentUser = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const ImageUser = styled.Image`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;

  border-radius: ${RFValue(50)}px; ;
`;
export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.white};

  margin: ${RFValue(20)}px 0;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
`;
export const Locale = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
`;

export const ContentUserInfo = styled.View`
  margin-left: ${RFValue(15)}px;
  width: ${RFValue(200)}px;
`;

export const Email = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(5)}px;
`;

export const TextContact = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ContentButtons = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;

  margin-top: ${RFValue(20)}px;
`;

export const ButtomContact = styled.TouchableOpacity`
  width: 70%;
  padding: ${RFValue(12)}px;

  background-color: ${({ theme }) => theme.colors.background};

  border-radius: ${RFValue(15)}px;

  align-items: center;
  justify-content: center;

  margin-top: ${RFValue(20)}px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
