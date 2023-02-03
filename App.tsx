import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";

import theme from "./src/Globals/styles/theme";
import { RoutesApp } from "./src/Routes/app.routes";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

import { Amplify } from "aws-amplify";
import { NativeBaseProvider } from "native-base";
import awsmobile from "./src/aws-exports";

Amplify.configure(awsmobile);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    if (!user.phone) {
      console.log("sem telefone");
    }
  }
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Sora_300Light,
          Sora_400Regular,
          Sora_500Medium,
          Sora_600SemiBold,
          Sora_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const linking = {
    prefixes: ["exp://192.168.1.4:19000/--/iautomarket"],
    config: {
      screens: {
        Stack: {
          screens: {
            search: {
              path: "search",
            },
          },
        },
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          {/* @ts-ignore */}
          <NavigationContainer linking={linking}>
            <StatusBar
              backgroundColor={theme.colors.primary}
              barStyle="dark-content"
            />
            <AuthProvider>
              <RoutesApp />
            </AuthProvider>
          </NavigationContainer>
        </ThemeProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
