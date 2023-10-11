import { View, Text } from "../Themed";
import { StyleSheet, Image, TouchableHighlight, Linking } from "react-native";
import { router, Link } from "expo-router";
import Colors from "@/constants/Colors";
import { HeadingBoldText } from "../StyledText";
import ProgressiveImage from "../Images/ProgressiveImage";
import Icons from "@/constants/Icons/Icons";


const ImageCard = ({ image, title, link, item }: { image: string; title: string; link: string, item: any}) => {
    return (
      <View style={styles.container}>
        <Link
          href={{
            pathname: link ? link : '/',
            params: item,
          }}
          
          asChild
        >
          <TouchableHighlight>
            <ProgressiveImage
              thumbnailSource={{ uri: image }}
              source={{ uri: image }}
              style={{ height: 170, flex: 1, width: null }}
            />
          </TouchableHighlight>
        </Link>

        <View style={styles.textView}>
          <Link
            href={{
              pathname: `/stages-backlots/backlots/${item?.id}`,
              params: item,
            }}
            
            asChild
          >
            <TouchableHighlight>
              <HeadingBoldText style={styles.text}>{title}</HeadingBoldText>
            </TouchableHighlight>
          </Link>
          <Link
            href={{
              pathname: `/stages-backlots/backlots/${item?.id}`,
              params: item,
            }}
            asChild
          >
            <TouchableHighlight>
              <Icons
                name="arrow-right"
                size={15}
                color={Colors.dark.creamText}
                style={styles.arrowIcon}
              />
            </TouchableHighlight>
          </Link>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    position: "relative",
    flex: 2,
    flexGrow: 1,
  },
  textView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.dark.contrastBackground,
    opacity: 0.85,
    padding: 10,
    width: 230,
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: Colors.dark.creamText,
    fontSize: 10,
    flex: 1,
  },
  arrowIcon: {
    width: 22,
    marginLeft: 16,
    marginRight: 10,
  },
});


export default ImageCard