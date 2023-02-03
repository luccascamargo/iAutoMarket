import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Platform, View } from "react-native";
import { useTheme } from "styled-components";
import { Favorites } from "../Screens/Favorites";
import { Home } from "../Screens/Home";
import { More } from "../Screens/More";
import { Profile } from "../Screens/Profile";
import { Search } from "../Screens/Search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../Screens/Login";
import { CreateAccount } from "../Screens/CreateAccount";
import { InsertAd } from "../Screens/InsertAd";
import { MyAds } from "../Screens/MyAds";
import { FilterSelect } from "../Screens/FilterSelect";
import { ModalEdit } from "../Screens/ModalEdit";
import { ConfirmAccount } from "../Screens/ConfirmAccout";
import { useAuth } from "../contexts/AuthContext";
import { Signatures } from "../Screens/Signatures";
import { ForgotPassword } from "../Screens/ForgotPassword";
import { Signature } from "../Screens/Signature";
import { CreatePhone } from "../Screens/CreatePhone";
import { AdDetails } from "../Screens/AdDetails";

const { Navigator, Screen } = createBottomTabNavigator();
const Routes = createNativeStackNavigator();

export function RoutesApp() {
  return (
    <Routes.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Routes.Screen
        name="Stack"
        component={AppRoutes}
        options={{
          headerShown: false,
        }}
      />

      <Routes.Group
        screenOptions={{
          presentation: "card",
          headerShown: false,
        }}
      >
        <Routes.Screen name="favorites" component={Favorites} />
        <Routes.Screen name="editAdvert" component={ModalEdit} />
        <Routes.Screen name="signatures" component={Signatures} />
        <Routes.Screen name="advert" component={AdDetails} />
        <Routes.Screen name="signature" component={Signature} />
        <Routes.Screen name="myAds" component={MyAds} />
        <Routes.Screen
          name="login"
          component={Login}
          options={{
            presentation: "formSheet",
          }}
        />
        <Routes.Screen name="createPhone" component={CreatePhone} />
        <Routes.Screen name="filtered" component={Search} />
        <Routes.Screen
          name="createAccount"
          component={CreateAccount}
          options={{ presentation: "formSheet" }}
        />
        <Routes.Screen
          name="confirmAccount"
          component={ConfirmAccount}
          options={{
            presentation: "fullScreenModal",
          }}
        />

        <Routes.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{
            presentation: "formSheet",
          }}
        />
      </Routes.Group>
    </Routes.Navigator>
  );
}

function AppRoutes() {
  const theme = useTheme();

  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 50,
          paddingVertical: 10,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          title: "Início",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="search"
        component={FilterSelect}
        options={{
          title: "Buscar",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      {isAuthenticated && user?.stripePlan !== "DEFAULT" ? (
        <Screen
          name="insertAd"
          component={InsertAd}
          options={{
            title: "Publicar anúncio",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="pluscircleo" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <></>
      )}
      {isAuthenticated ? (
        <Screen
          name="profile"
          component={Profile}
          options={{
            title: "Perfil",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      ) : null}
      <Screen
        name="more"
        component={More}
        options={{
          title: "Mais",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="ellipsis1" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
