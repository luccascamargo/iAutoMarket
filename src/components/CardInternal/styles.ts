import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 60,
  },
})`
  width: 100%;
  border-radius: 5px;

  margin: 0 auto;

  position: relative;
  z-index: 99999;
`;

export const ContentHeader = styled.View`
  padding-top: ${Platform.OS === "ios" ? RFValue(30) : 0}px;
  width: 100%;
  height: ${RFValue(90)}px;

  padding: 0 ${RFValue(20)}px;
  padding-bottom: ${RFValue(15)}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(45)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const IconClose = styled(AntDesign)`
  font-size: ${RFValue(35)}px;
  color: ${({ theme }) => theme.colors.background};
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: ${RFValue(300)}px;
`;

export const ContentTitleFav = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(15)}px;
`;

export const ContentTitle = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const IconFav = styled(AntDesign)`
  font-size: ${RFValue(18)}px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-left: ${RFValue(20)}px;
  margin-top: ${RFValue(17)}px;
`;

export const MainFeatures = styled.View`
  width: 100%;
  padding: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(10)}px;
`;
export const Feature = styled.View`
  width: ${RFPercentage(18)}px;
  margin-top: ${RFValue(15)}px;
`;

export const FeatureTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const FeatureValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const Line = styled.View`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.white};
  margin-top: ${RFValue(15)}px;
`;

export const ContentDescription = styled.View`
  width: 100%;
  margin-top: ${RFValue(15)}px;
  padding: 0 ${RFValue(20)}px;
`;

export const TitleDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(5)}px;
`;

export const ContentFipe = styled.View`
  width: 100%;
  padding: ${RFValue(20)}px;

  flex-direction: column;
`;
export const TitleFipe = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
export const PriceFipe = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  margin-top: ${RFValue(10)}px;
`;

export const TextMonth = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(5)}px;
`;

export const FeaturesTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const ContentFeatures = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const OptionalTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
