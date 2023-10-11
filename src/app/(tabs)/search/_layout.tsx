import { useContext } from "react";
import { Text } from "@/components/Themed";
import { Stack } from "expo-router";
import HeaderLogo from "@/constants/Icons/HeaderLogo";
import Colors from "@/constants/Colors";
import { usePathname } from "expo-router";
import { AppContext, AppContextProps } from "@/app/_layout";

const SearchLayout = () => {
  const app = useContext<AppContextProps>(AppContext);
  const { locationEnabled, isModalOpen } = app || {};
  const pathname = usePathname();
  const pathFields = pathname.split("/");

  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => <HeaderLogo />,
        headerStyle: {
          backgroundColor: "#343434",
        },
        headerTintColor: Colors.dark.creamText,
        headerTitleAlign: "center",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
       
      />
    </Stack>
  );
};

export default SearchLayout;
