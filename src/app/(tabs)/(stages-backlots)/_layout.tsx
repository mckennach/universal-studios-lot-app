import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabBarIcon from "../../../constants/Icons/TabBarIcon";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";

import HeaderLogo from "../../../constants/Icons/HeaderLogo";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTitle: (props) => <HeaderLogo />,
        headerStyle: {
          backgroundColor: "#343434",
        },
        tabBarActiveTintColor: Colors.dark.tabBar,
        tabBarInactiveTintColor: Colors.dark.nestedTabBarSelected,
        tabBarActiveBackgroundColor: Colors.dark.nestedTabBarSelected,
        tabBarInactiveBackgroundColor: Colors.dark.tabBar,
        lazy: false,
        tabBarStyle: {
          height: 90,
          borderTopColor: Colors.dark.tabBar,
          borderTopWidth: 0,
          paddingBottom: 0,
          zIndex: 1,
        },
        tabBarItemStyle: {
          paddingBottom: 10,
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          textTransform: "uppercase",
          fontFamily: "PresicavLight",
          letterSpacing: 2,
        },
      }}
    >
      <Tabs.Screen
        name="stages"
        options={{
          title: "Stages",
          tabBarIcon: ({ color }) => <TabBarIcon name="lot" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="backlots"
        options={{
          title: "Backlots",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="backlot" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
