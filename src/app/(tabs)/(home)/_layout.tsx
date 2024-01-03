import { Text } from "../../../components/Themed";
import { Stack } from "expo-router";
import HeaderLogo from "../../../constants/Icons/HeaderLogo";
import Colors from "../../../constants/Colors";
import { usePathname } from "expo-router";
const HomeLayout = () => {
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
        <Stack.Screen name="index" />
        <Stack.Screen name="driving" />
        <Stack.Screen
          name="dining"
          options={{
            headerShown: false,
            // headerShown: pathFields[1] == 'dining' && pathFields[2] ? false : true
          }}
        />
        <Stack.Screen
          name="amenities"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="service-desk" />
        <Stack.Screen name="socialize" />
        <Stack.Screen name="privacy" options={{
          headerShown: false,
        }} />
      </Stack>
    );
}

export default HomeLayout;