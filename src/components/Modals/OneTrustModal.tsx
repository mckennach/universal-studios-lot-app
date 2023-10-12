// import { useEffect } from 'react';
// import { View, Text, NativeModules } from 'react-native';
// import OTPublishersNativeSDK from "react-native-onetrust-cmp";
// const { EXPO_PUBLIC_ONETRUST_DOMAIN, EXPO_PUBLIC_ONETRUST_IOS, EXPO_PUBLIC_ONETRUST_ANDROID } = process.env;
// const OneTrustModal = () => {
    
//     useEffect(() => {
//       // console.log(OTPublishersNativeSDK);
//       // console.log(NativeModules);
//         OTPublishersNativeSDK.startSDK(
//           EXPO_PUBLIC_ONETRUST_DOMAIN as string,
//           EXPO_PUBLIC_ONETRUST_ANDROID as string,
//           "en",
//           {
//             countryCode: "US",
//           },
//           true
//         )
//           .then((responseObject) => {
//             console.info("Download status is " + responseObject.status);
//             // get full JSON object from responseObject.responseString
//           })
//           .catch((error) => {
//             console.error(`OneTrust download failed with error ${error}`);
//           });
       
//     }, []);

//     return (
//         <View>
//             <Text>This is a OneTrust modal</Text>
//         </View>
//     );
// };

// export default OneTrustModal;
