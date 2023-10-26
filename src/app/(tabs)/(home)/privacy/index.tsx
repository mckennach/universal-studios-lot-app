import { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Linking,
  View,
  Platform,
  Text
} from "react-native";
import { Route, router, Href, Link, Redirect, usePathname } from "expo-router";
import Layout from "../../../../constants/Layout";
// import OneTrustModal from "../../../../components/Modals/OneTrustModal";
import Colors from "../../../../constants/Colors";
import { HeadingMediumText } from "../../../../components/StyledText";
import OTPublishersNativeSDK from "react-native-onetrust-cmp";
const { EXPO_PUBLIC_ONETRUST_DOMAIN, EXPO_PUBLIC_ONETRUST_IOS, EXPO_PUBLIC_ONETRUST_ANDROID } = process.env;


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
    title: "AD CHOICES",
    navigation: "StagesBacklotScreenStack",
    url: "https://www.nbcuniversal.com/privacy/cookies#accordionheader2",
    linkItem: true,
  },
  {
    key: "2",
    title: "PRIVACY POLICY",
    navigation: "",
    url: "https://www.nbcuniversal.com/privacy",
    linkItem: true,
  },
  {
    key: "3",
    title: "YOUR PRIVACY CHOICES",
    navigation: "Driving",
    url: "onetrust",
    linkItem: false,
  },
  {
    key: "4",
    title: "CA NOTICE",
    navigation: "Amenities",
    url: "https://www.nbcuniversal.com/privacy/california-consumer-privacy-act",
    linkItem: true,
  },
  {
    key: "5",
    title: "TERMS OF SERVICE",
    navigation: "ServiceDesk",
    url: "https://www.nbcuniversal.com/terms",
    linkItem: true,
  },
];

type ItemProps = { title: string; linkItem?: boolean; url: any };

const handlePress = async (url: any) => {
  if(url === "onetrust") {

    OTPublishersNativeSDK.showPreferenceCenterUI();
  } else {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      router.push(url);
    }
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

export default function PrivacyScreen() {
  const pathname = usePathname();
  const [oneTrustId, setOneTrustId] = useState<string>("");
  useEffect(() => {
    
    const id = Platform.OS === "ios" ? EXPO_PUBLIC_ONETRUST_IOS : EXPO_PUBLIC_ONETRUST_ANDROID;
    setOneTrustId(id as string);
    OTPublishersNativeSDK.startSDK(
      EXPO_PUBLIC_ONETRUST_DOMAIN as string,
      id as string,
      "en",
      {
        countryCode: "US",
      },
      true
    )
      .then((responseObject: any) => {
        if(responseObject) {
          console.info("Download status is " + responseObject?.status);
        }
        // get full JSON object from responseObject.responseString
      })
      .catch((error) => {
        console.error(`OneTrust download failed with error ${error}`);
      });
   
  }, [])
  

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
      {/* <OneTrustModal /> */}
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
