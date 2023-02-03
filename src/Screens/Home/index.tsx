import { ScrollView, Text, TouchableOpacity } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import {
  Container,
  ContentHeader,
  Icon,
  Title,
  ContentBox,
  Box,
  BoxTitle,
  ContentInfos,
  BoxTitleTwo,
  ContentPlans,
  TitlePlans,
} from "./styles";

import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { Path } from "react-native-svg";
import { useAuth } from "../../contexts/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { Plan } from "../../components/Plan";
import { Badge, View } from "native-base";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const featuresEco = [
  {
    key: 1,
    label: "1 anuncio por usuario",
    disable: false,
  },
  {
    key: 2,
    label: "5 fotos por anuncio",
    disable: false,
  },
  {
    key: 3,
    label: "descricao detalhada",
    disable: true,
  },
  {
    key: 4,
    label: "anuncio no topo",
    disable: true,
  },
];

const featuresBasic = [
  {
    key: 1,
    label: "5 anuncios por usuario",
    disable: false,
  },
  {
    key: 2,
    label: "10 fotos por anuncio",
    disable: false,
  },
  {
    key: 3,
    label: "descricao detalhada",
    disable: false,
  },
  {
    key: 4,
    label: "anuncio no topo",
    disable: true,
  },
];

const featuresPro = [
  {
    key: 1,
    label: "sem limites de anuncio por usuario",
    disable: false,
  },
  {
    key: 2,
    label: "15 fotos por anuncio",
    disable: false,
  },
  {
    key: 3,
    label: "descricao detalhada",
    disable: false,
  },
  {
    key: 4,
    label: "anuncio no topo",
    disable: false,
  },
];

const IconLogo = () => (
  <Svg width="122" height="14" fill="none" viewBox="0 0 122 14">
    <Path
      fill="#06B6D4"
      d="M.288 13.96L3.6.52h2.624L2.912 13.96H.288zm6.516 0L10.116.52h2.624L9.428 13.96H6.804zm6.515 0L16.631.52h2.624l-3.312 13.44H13.32z"
    ></Path>
    <Path
      fill="#454655"
      d="M23.114 13L26.97 1.32h4.24l4 11.68h-2.72l-3.232-9.872.832.336h-2.064l.864-.336L25.738 13h-2.624zm2.928-2.896l.8-2.176h4.576l.816 2.176h-6.192zm13.367 3.168c-1.013 0-1.792-.325-2.336-.976-.544-.661-.816-1.653-.816-2.976V4.232h2.56v5.216c0 .47.134.843.4 1.12.267.277.624.416 1.072.416.459 0 .832-.144 1.12-.432.288-.288.432-.677.432-1.168V4.232h2.56V13H42.37V9.304h.176c0 .885-.117 1.627-.352 2.224-.224.587-.56 1.024-1.008 1.312-.448.288-1.002.432-1.664.432h-.112zm11.337-.16c-.886 0-1.6-.107-2.144-.32a2.254 2.254 0 01-1.2-1.104c-.246-.523-.368-1.227-.368-2.112V1.864h2.384v7.808c0 .416.106.736.32.96.224.213.538.32.944.32h1.296v2.16h-1.232zm-5.04-7.008V4.232h6.272v1.872h-6.272zm12.234 7.2c-.768 0-1.45-.117-2.048-.352a4.58 4.58 0 01-1.52-.992 4.324 4.324 0 01-.928-1.424 4.648 4.648 0 01-.32-1.712v-.368c0-.608.107-1.184.32-1.728.224-.555.544-1.04.96-1.456a4.559 4.559 0 011.536-.976c.597-.245 1.264-.368 2-.368.757 0 1.43.123 2.016.368.597.235 1.104.56 1.52.976.416.416.736.901.96 1.456.224.544.336 1.12.336 1.728v.368c0 .597-.107 1.168-.32 1.712a4.206 4.206 0 01-.944 1.424 4.403 4.403 0 01-1.504.992c-.597.235-1.285.352-2.064.352zm0-2.16c.501 0 .917-.107 1.248-.32.33-.213.581-.512.752-.896a2.96 2.96 0 00.272-1.28c0-.501-.09-.939-.272-1.312a2.179 2.179 0 00-.784-.912c-.33-.224-.736-.336-1.216-.336-.47 0-.875.112-1.216.336a2.179 2.179 0 00-.784.912c-.17.373-.256.81-.256 1.312 0 .47.085.896.256 1.28.17.384.427.683.768.896.341.213.752.32 1.232.32zM64.703 13V1.32h3.616l2.672 6.56h.304l2.64-6.56h3.68V13h-2.592V3.032l.368.032-3.088 7.568h-2.496l-3.104-7.568.4-.032V13h-2.4zm20.683 0v-2.592h-.432V7.592c0-.448-.107-.784-.32-1.008-.213-.224-.555-.336-1.024-.336a47.81 47.81 0 00-2.112.064c-.406.021-.773.043-1.104.064v-2.16c.245-.021.533-.043.864-.064a32.839 32.839 0 012.016-.064c.896 0 1.648.128 2.256.384.618.256 1.088.645 1.408 1.168.32.512.48 1.173.48 1.984V13h-2.032zm-2.8.224c-.63 0-1.184-.112-1.664-.336a2.618 2.618 0 01-1.104-.96c-.267-.427-.4-.933-.4-1.52 0-.64.165-1.163.496-1.568.33-.416.794-.72 1.392-.912.597-.203 1.285-.304 2.064-.304h1.872v1.424h-1.888c-.448 0-.795.112-1.04.336-.235.213-.352.507-.352.88 0 .352.117.64.352.864.245.213.592.32 1.04.32.288 0 .544-.048.768-.144.234-.107.427-.283.576-.528.15-.245.235-.587.256-1.024l.608.64c-.053.608-.203 1.12-.448 1.536a2.391 2.391 0 01-.992.96c-.416.224-.928.336-1.536.336zM89.59 13V4.232h2.032v3.76h-.048c0-1.237.261-2.192.784-2.864.533-.672 1.301-1.008 2.304-1.008h.336v2.208h-.64c-.704 0-1.248.192-1.632.576-.384.373-.576.917-.576 1.632V13h-2.56zm12.91 0l-2.768-4.096H98.5l3.568-4.672h2.688l-3.36 4.352.032-1.248L105.38 13h-2.88zm-6.176 0V1.32h2.56V13h-2.56zm13.907.304c-.747 0-1.408-.128-1.984-.384a4.242 4.242 0 01-1.424-1.024 4.932 4.932 0 01-.864-1.456 4.966 4.966 0 01-.288-1.664v-.32c0-.587.096-1.147.288-1.68.203-.544.491-1.03.864-1.456a3.928 3.928 0 011.392-1.008c.565-.256 1.205-.384 1.92-.384.939 0 1.728.213 2.368.64a4.097 4.097 0 011.488 1.648c.341.672.512 1.408.512 2.208v.864h-7.76V7.832h6.208l-.832.672c0-.523-.075-.97-.224-1.344-.149-.373-.373-.656-.672-.848-.288-.203-.651-.304-1.088-.304-.448 0-.827.101-1.136.304-.309.203-.544.501-.704.896-.16.384-.24.859-.24 1.424 0 .523.075.981.224 1.376.149.384.384.683.704.896.32.213.736.32 1.248.32.469 0 .853-.09 1.152-.272.299-.181.501-.405.608-.672h2.352a3.7 3.7 0 01-.752 1.568 3.812 3.812 0 01-1.408 1.072c-.565.256-1.216.384-1.952.384zm9.952-.192c-.885 0-1.6-.107-2.144-.32a2.254 2.254 0 01-1.2-1.104c-.245-.523-.368-1.227-.368-2.112V1.864h2.384v7.808c0 .416.107.736.32.96.224.213.539.32.944.32h1.296v2.16h-1.232zm-5.04-7.008V4.232h6.272v1.872h-6.272z"
    ></Path>
  </Svg>
);

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const { user } = useAuth();

  return (
    <Container>
      <ContentHeader style={shadowContent} elevation={10}>
        <ContentInfos>
          <IconLogo />
          {user ? (
            <View flexDirection={"row"} alignItems="center">
              {user?.stripePlan !== "DEFAULT" && (
                <Badge marginRight={"5"}>
                  <Text
                    style={{
                      color: theme.colors.title,
                      fontFamily: theme.fonts.medium,
                      fontSize: RFValue(10),
                    }}
                  >
                    {user?.stripePlan}
                  </Text>
                </Badge>
              )}

              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.white,
                  width: RFValue(30),
                  height: RFValue(30),
                  borderRadius: RFValue(15),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("profile")}
              >
                <Text
                  style={{
                    color: theme.colors.title,
                    fontFamily: theme.fonts.medium,
                    fontSize: RFValue(15),
                  }}
                >
                  {user.attributes.given_name[0].toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Icon name="user" />
            </TouchableOpacity>
          )}
        </ContentInfos>
      </ContentHeader>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getBottomSpace() + 30 }}
      >
        <Title>O que deseja fazer?</Title>

        <ContentBox>
          <Box
            style={shadowContent}
            //@ts-ignore
            elevation={10}
            onPress={() => {
              user
                ? navigation.navigate("myAds")
                : navigation.navigate("login");
            }}
          >
            <Icon name="car" color={theme.colors.primary} />
            <BoxTitle>Meus</BoxTitle>
            <BoxTitleTwo>anúncios</BoxTitleTwo>
          </Box>
          <Box
            //@ts-ignore
            elevation={10}
            style={shadowContent}
            onPress={() => navigation.navigate("search")}
          >
            <Icon name="search1" color={theme.colors.primary} />
            <BoxTitle>Buscar</BoxTitle>
            <BoxTitleTwo>anúncios</BoxTitleTwo>
          </Box>
          <Box
            //@ts-ignore
            elevation={10}
            style={shadowContent}
            onPress={() => navigation.navigate("favorites")}
          >
            <Icon name="hearto" color={theme.colors.primary} />
            <BoxTitle>Meus</BoxTitle>
            <BoxTitleTwo>Favoritos</BoxTitleTwo>
          </Box>
          <Box
            //@ts-ignore
            elevation={10}
            style={shadowContent}
            onPress={() => {
              user
                ? navigation.navigate("insertAd")
                : navigation.navigate("login");
            }}
          >
            <Icon name="form" color={theme.colors.primary} />
            <BoxTitle>Quero</BoxTitle>
            <BoxTitleTwo>anunciar</BoxTitleTwo>
          </Box>
        </ContentBox>

        <ContentPlans>
          <TitlePlans>Nossos planos</TitlePlans>
          <Plan
            background={theme.colors.white}
            color={theme.colors.text}
            borderColor={theme.colors.background}
            price="R$14,97"
            title="Silver"
            subTitle="Para vendedores ocasionais"
            features={featuresEco}
            lookUpKey="price_1MEJNVB3rHMTUjVLfaCFAZgz"
          />

          <Plan
            background={theme.colors.white}
            color={theme.colors.text}
            borderColor={theme.colors.background}
            price="R$39,97"
            title="Gold"
            subTitle="Para pequenos logistas"
            features={featuresBasic}
            lookUpKey="price_1MEJLsB3rHMTUjVLONIaE6Wm"
          />

          <Plan
            background={theme.colors.white}
            color={theme.colors.text}
            borderColor={theme.colors.primary}
            price="R$249,97"
            title="Platinum"
            subTitle="Para grandes logistas"
            features={featuresPro}
            lookUpKey="price_1MEJN4B3rHMTUjVLvNH9ZigW"
            active
          />
        </ContentPlans>
      </ScrollView>
    </Container>
  );
}
