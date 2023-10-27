import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarIcon from '../../constants/Icons/TabBarIcon';
import { Link, Tabs } from 'expo-router';
import { Button, Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // headerTitle: (props) => <HeaderLogo />,
        headerLeftLabelVisible: true,
        headerStyle: {
        
          backgroundColor: "red",
        },
        // headerTintColor: Colors.dark.creamText,
        // headerTitleAlign: "center",
        tabBarActiveTintColor: Colors.dark.tabIconSelected,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
        tabBarActiveBackgroundColor: Colors.dark.tabBarSelected,
        tabBarInactiveBackgroundColor: Colors.dark.tabBar,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Layout.tabIconHeight,
          borderTopColor: Colors.dark.tabBar,
          borderTopWidth: 0,
          paddingBottom: 0,
          zIndex: 1,
          marginTop: 0,
        },
        tabBarItemStyle: {
          paddingBottom: 10,
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

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
        name="(stages-backlots)"
        options={{
          title: "Stages & Backlots",
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="lot" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          // tabBarStyle: { display: "none"  },
          // tabBarItemStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pin" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="directory"
        options={{
          title: "Directory",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="group" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search" color={color} size={25} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
