import { useEffect, useContext } from "react";
import * as Location from "expo-location";
import { AppContext, AppContextProps } from "@/app/_layout";
import {
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Linking,
} from "react-native";
import { Route, router, Href, Link, Redirect, usePathname } from "expo-router";
import Layout from "@/constants/Layout";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { HeadingMediumText } from "@/components/StyledText";
import PermissionsModal from "@/components/Modals/PermissionsModal";

interface ItemData {
  key: string;
  title: string;
  navigation?: string | null;
  url: any;
  linkItem?: boolean;
}

const DATA: ItemData[] = [
  {
    key: "1",
    title: "STAGES & BACKLOT",
    navigation: "StagesBacklotScreenStack",
    url: "/stages",
    linkItem: false,
  },
  {
    key: "2",
    title: "Production & Post Services",
    navigation: "",
    url: "https://universalstudioslot.com/studio-services",
    linkItem: false,
  },
  {
    key: "3",
    title: "DRIVING ON THE LOT",
    navigation: "Driving",
    url: "/driving",
    linkItem: false,
  },
  {
    key: "4",
    title: "DINING OPTIONS",
    navigation: "Restaurants",
    url: "/dining",
    linkItem: false,
  },
  {
    key: "5",
    title: "AMENITIES",
    navigation: "Amenities",
    url: "/amenities",
    linkItem: false,
  },
  {
    key: "6",
    title: "SERVICE CENTER",
    navigation: "ServiceDesk",
    url: "/service-desk",
    linkItem: false,
  },
  {
    key: "7",
    title: "SOCIALIZE WITH US",
    navigation: "Socialize",
    url: "/socialize",
    linkItem: false,
  },
  {
    key: "8",
    title: "UNIVERSALSTUDIOSLOT.COM",
    navigation: "",
    url: "https://www.universalstudioslot.com/",
    linkItem: true,
  },
  {
    key: "9",
    title: "PRIVACY",
    navigation: "",
    url: "/privacy",
    linkItem: false,
  },
];

type ItemProps = { title: string; linkItem?: boolean; url: any };

const handlePress = async (url: any) => {
  const supported = await Linking.canOpenURL(url);
  console.log(supported);
  if (supported) {
    await Linking.openURL(url);
  } else {
    router.push(url);
  }
};

const Item = ({ title, linkItem, url }: ItemProps) => (
  // <Link href={url}>
    <TouchableHighlight
      onPress={() => handlePress(url)}
      style={[styles.button, linkItem ? styles.linkItem : styles.buttonItem]}
    >
      <HeadingMediumText style={styles.buttonTxt}>{title}</HeadingMediumText>
    </TouchableHighlight>
  // </Link>
);

export default function HomeScreen() {
  const pathname = usePathname();
    const app = useContext<AppContextProps>(AppContext);
    const {locationEnabled, setLocationEnabled, isModalOpen, setIsModalOpen } = app;
    useEffect(() => {
      (async () => {
        const { granted } = await Location.getForegroundPermissionsAsync();
        console.log(granted);
        if (!granted && setLocationEnabled && setIsModalOpen) {
          setLocationEnabled(false);
          setIsModalOpen(true);
        }
      })();
      // const t = Location.getForegroundPermissionsAsync().then((res) => {});
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        style={styles.listWrapper}
        renderItem={({ item }) => (
          <Item title={item.title} linkItem={item?.linkItem} url={item.url} />
        )}
        keyExtractor={(item) => item.key}
      />
      <PermissionsModal locationEnabled={locationEnabled} setLocationEnabled={setLocationEnabled} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 4,
    backgroundColor: Colors.dark.background,
  },
  listWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    flexGrow: 1,
    height:
      Layout.window.height / 7.2 -
      11 -
      Layout.pageTopPadding / 7.2 -
      Layout.tabIconHeight / 3,
  },
  linkItem: {
    backgroundColor: Colors.dark.contrastBackgroundLight,
  },
  buttonItem: {
    backgroundColor: Colors.dark.contrastBackground,
  },
  buttonTxt: {
    color: Colors.dark.contrastText,
    fontSize: 14,
    textAlign: "center",
  },
});
