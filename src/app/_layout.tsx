import { useEffect, useState, createContext, useContext } from "react";

import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
// Redux


// Providers
// import { Provider } from "react-redux";
import { ThemeProvider } from "@react-navigation/native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

import CustomTheme from "../constants/Theme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { initial } from "lodash";
// import { AppContext } from "@/utils/types/context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export interface AppContextProps {
 
  locationEnabled: boolean;
  setLocationEnabled: (locationEnabled: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({

  locationEnabled: false,
  setLocationEnabled: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export default function RootLayout() {
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialPromptFired, setInitialPromptFired] = useState<boolean>(false);
  const globalState = { 
    locationEnabled, 
    setLocationEnabled, 
    isModalOpen, 
    setIsModalOpen
    };
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
    ...Ionicons.font,
    BrandonGrotesqueRegular: require("../assets/fonts/BrandonGrotesque-Regular.ttf"),
    BrandonGrotesqueMedium: require("../assets/fonts/BrandonGrotesque-Medium.ttf"),
    BrandonGrotesqueBold: require("../assets/fonts/BrandonGrotesque-Bold.ttf"),
    BrandonTextRegular: require("../assets/fonts/BrandonText-Regular.ttf"),
    BrandonTextMedium: require("../assets/fonts/BrandonText-Medium.ttf"),
    PresicavLight: require("../assets/fonts/PresicavLt-Regular.ttf"),
    icomoon: require("../assets/fonts/icomoon.ttf"),
    SpaceMone: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav globalState={globalState} />;
}

function RootLayoutNav({ globalState }: any) {
  console.log(globalState);
  return (
    <SafeAreaProvider>
      <AppContext.Provider value={globalState}>
        <ThemeProvider value={CustomTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
      </ThemeProvider>
      </AppContext.Provider>
    </SafeAreaProvider>
 
  );
}
