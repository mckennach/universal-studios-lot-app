import Swiper from "react-native-swiper";
import ProgressiveImage from "./ProgressiveImage";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

import Icons from "../../constants/Icons/Icons";
import Colors from "../../constants/Colors";
import { chunkMaxLength, logObject } from "../../utils/helpers";
const { EXPO_PUBLIC_API_URL } = process.env;

const ImageGallery = ({ data }: any) => {
    if(!data || data.length === 0) return null;
    const API_URL = Constants.expoConfig?.extra && Constants.expoConfig?.extra.API_URL;

    const gallerySplit = data.constructor.name === 'Array' ? [] : data.split(",");
    const gallery = data.constructor.name === 'Array' ? data : chunkMaxLength(gallerySplit, 9, gallerySplit.length / 9);
 
    
    return (
      <Swiper
        style={styles.container}
        activeDot={<View style={styles.activeDot} />}
        showsButtons={gallery.length > 1 && true}
        nextButton={
          <Icons name="carrot-right" size={24} color={Colors.dark.creamText} />
        }
        prevButton={
          <Icons name="carrot-left" size={24} color={Colors.dark.creamText} />
        }
      >
        {
            gallery.map((item: any, index: number) => {
            
                return (
                  <View key={index}>
                    <ProgressiveImage
                      thumbnailSource={{
                        uri: `${API_URL}/thumbs/800x800/files/zc/${item[0]}`,
                      }}
                      source={{
                        uri: `${API_URL}/thumbs/800x800/files/zc/${item[0]}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                );
            })
        }
      </Swiper>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300
    },
    activeDot: {
        backgroundColor: "#fff",
        width: 10,
        height: 10,
        borderRadius: 10,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    }

});


export default ImageGallery;