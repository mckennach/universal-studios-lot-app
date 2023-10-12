
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
      <Stack.Screen
        name="index"
        options={
          {
            // headerLeft: () => (
            //   <TouchableOpacity>
            //     <Text style={{ color: Colors.dark.creamText }}>Back</Text>
            //   </TouchableOpacity>
            // ),
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="[id]"
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack>
  );
};

export default HomeLayout;
