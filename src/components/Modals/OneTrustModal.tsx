import { useEffect } from 'react';
import { View, Text } from 'react-native';
import OTPublishersNativeSDK from "react-native-onetrust-cmp";
const { EXPO_PUBLIC_ONETRUST_DOMAIN, EXPO_PUBLIC_ONETRUST_IOS } = process.env;
const OneTrustModal = () => {
    // const { OTPublishersNativeSDK } = NativeModules;
    useEffect(() => {
        OTPublishersNativeSDK.startSDK(
          EXPO_PUBLIC_ONETRUST_DOMAIN as string,
          EXPO_PUBLIC_ONETRUST_IOS as string,
          "en",
          {
            countryCode: "US",
          },
          true
        )
          .then((responseObject) => {
            console.info("Download status is " + responseObject.status);
            // get full JSON object from responseObject.responseString
          })
          .catch((error) => {
            console.error(`OneTrust download failed with error ${error}`);
          });
       
    }, []);

    return (
        <View>
            <Text>This is a OneTrust modal</Text>
        </View>
    );
};

export default OneTrustModal;
