import { useContext } from "react";

import { Stack } from "expo-router";
import HeaderLogo from "@/constants/Icons/HeaderLogo";
import Colors from "@/constants/Colors";
import { usePathname } from "expo-router";
import { AppContext, AppContextProps } from "@/app/_layout";
import { View, Text } from "@/components/Themed";
const MapLayout = () => {
  const app = useContext<AppContextProps>(AppContext);
  const { locationEnabled, isModalOpen } = app || {};
  const pathname = usePathname();
  const pathFields = pathname.split("/");
  
  return (
    <Stack
      screenOptions={{
        headerShown: !locationEnabled,
        headerTitle: (props) => <HeaderLogo />,
        headerStyle: {
          backgroundColor: "#343434",
        },
        headerTintColor: Colors.dark.creamText,
        headerTitleAlign: "center",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      
    </Stack>
  );
};

export default MapLayout;
