
import { Stack } from "expo-router";
import HeaderLogo from "../../../../constants/Icons/HeaderLogo";
import Colors from "../../../../constants/Colors";

const HomeLayout = () => {
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
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default HomeLayout;
