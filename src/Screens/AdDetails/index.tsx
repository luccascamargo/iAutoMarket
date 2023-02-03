import {
  Dimensions,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { CardInternal } from "../../components/CardInternal";
import { Salesman } from "../../components/Salesman";
import { useTheme } from "styled-components";
import { ContentHeader, Icon, Title, Container } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function AdDetails({ route }: any) {
  const data = route.params.dataItem;
  const navigation = useNavigation();

  const [ref, setRef] = useState<any>(null);
  const theme = useTheme();

  const x = useRef(new Animated.Value(0)).current;

  return (
    <Container>
      <ContentHeader style={shadowContent}>
        <Icon name="arrowleft" onPress={() => navigation.goBack()} />
        <Title>Detalhes do anúncio</Title>
      </ContentHeader>

      <View
        style={{
          width: width,
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.white,
        }}
      >
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            ref.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(13),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
            }}
          >
            Veiculo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            ref.scrollToEnd({
              animated: true,
            });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(13),
              color: theme.colors.title,
              fontFamily: theme.fonts.medium,
            }}
          >
            Vendedor
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            height: 4,
            width: width / 2,
            borderRadius: 15,
            marginTop: -2,
            marginBottom: 20,
          },
          {
            transform: [
              {
                translateX: x.interpolate({
                  inputRange: [0, width],
                  outputRange: [0, width / 2],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.ScrollView
        horizontal
        ref={(ref: any) => setRef(ref)}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], {
          useNativeDriver: true,
        })}
      >
        <View style={{ width: width, flex: 1 }}>
          <CardInternal data={data} />
        </View>
        <View style={{ width: width, flex: 1 }}>
          <Salesman
            name={data.Users.name}
            email={data.Users.email}
            phone={data.Users.phone}
          />
        </View>
      </Animated.ScrollView>
    </Container>
  );
}
