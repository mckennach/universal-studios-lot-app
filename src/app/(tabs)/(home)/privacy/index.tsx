import { useEffect, useContext, useState } from "react";
import Constants from 'expo-constants';
// import { getLocales } from 'expo-localization';
// import * as Network from 'expo-network';
import { Image } from 'expo-image';
import {
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Linking,
  View,
  Platform,
  Text
} from "react-native";
import { router, usePathname } from "expo-router";
import Layout from "../../../../constants/Layout";
// import OneTrustModal from "../../../../components/Modals/OneTrustModal";
import Colors from "../../../../constants/Colors";
import { HeadingMediumText } from "../../../../components/StyledText";

import OTPublishersNativeSDK from "react-native-onetrust-cmp";
// import { logObject } from "@/utils/helpers";
import { logObject } from "../../../../utils/helpers";



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

const oneTrustIcon = require("../../../../assets/images/privacyoptions.svg");

const getIPLoc = async () => {
  const apiKey = 'bdc_972da6c6d09646d49154a641abc0bf6a';
  const req = await fetch(`https://api-bdc.net/data/client-ip`);
  const {ipString } = await req.json();
  const req2 = await fetch(`https://api-bdc.net/data/country-by-ip?ip=${ipString}&localityLanguage=en&key=${apiKey}`);
  const data = await req2.json();
  return data
}

export default function PrivacyScreen() {
  // const locales = getLocales();

  // const pathname = usePathname();
  const [ipLocation, setIpLocation] = useState<any>(null);
  const [privacyText, setPrivacyText] = useState<string>("");
  const [oneTrustDomain, setOneTrustDomain] = useState<string | null>(Constants.expoConfig?.extra ? Constants.expoConfig?.extra.ONETRUST_DOMAIN : null);
  const [oneTrustId, setOneTrustId] = useState<string>("");

// console.log('test!');

  useEffect(() => {
    
    (async () => {
      
      const data = await getIPLoc();
      
      setIpLocation(data.country.isoAlpha2);
      // logObject('info', data);
      if(data && data.country.isoAlpha2 === "US") {
        setPrivacyText("YOUR PRIVACY CHOICES");
      } else {
        setPrivacyText("Cookie Notice");

      }
  
      if(Constants.expoConfig?.extra) {
        const id = Platform.OS === "ios" ? Constants.expoConfig?.extra.ONETRUST_IOS : Constants.expoConfig?.extra.ONETRUST_ANDROID;
        setOneTrustId(id as string);
      }
    })();
   
  }, []);

  useEffect(() => {
    if(oneTrustDomain && oneTrustId) {
      OTPublishersNativeSDK.startSDK(
        oneTrustDomain,
        oneTrustId,
        'en',
        {
          // countryCode: ipLocation
        },
        true,
      )
        .then((responseObject: any) => {
          if(responseObject) {
            console.info("Download status is " + responseObject?.status);
          }
        })
        .catch((error) => {
          console.error(`OneTrust download failed with error ${error}`);
        });
    }
  }, [oneTrustId]);

  const Item = ({ title, linkItem, url }: ItemProps) => (
    // <Link href={url}>
    <TouchableHighlight
      onPress={() => handlePress(url)}
      style={[styles.button, linkItem ? styles.linkItem : styles.buttonItem]}
    >
      <>
        {url === "onetrust" && ipLocation === 'US' && (
          <Image
            source={oneTrustIcon}
            style={{ width: 29, height: 14, marginRight: 10 }}
          />
        )}
        <HeadingMediumText style={styles.buttonTxt}>
          {url === "onetrust" ? (
            <>{privacyText}</>
          ) : (
            <>
              {title}           
            </>
          )}
        
        </HeadingMediumText>
      </> 
    </TouchableHighlight>
    // </Link>
  );
  
  

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
