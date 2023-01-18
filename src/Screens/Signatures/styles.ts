import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentHeader = styled.View`
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : 0}px;
  width: 100%;
  height: ${Platform.OS === "ios" ? RFValue(100) : RFValue(60)}px;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${RFValue(15)}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  left: ${RFValue(20)}px;
  bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Content = styled.View`
  align-items: center;
  margin-top: ${RFValue(20)}px;
  padding: 0 ${RFValue(20)}px;
  flex: 1;
`;
export const ListPlans = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 20,
  },
})``;
export const BoxPlan = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(10)}px 0;
`;
export const ContentPlan = styled.View``;
export const TitlePlan = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
