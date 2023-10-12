import { View } from "../Themed";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { HeadingBoldText, HTML } from "../StyledText";
import Layout from "../../constants/Layout";
import {
  logObject,
  formatTextNewLineToBreaks,
  contactUrl,
} from "../../utils/helpers";
import ImageGallery from "../Images/ImageGallery";

const AmenitiesDetail = ({ data }: any) => {


  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageGallery data={data.image_gallery} />
        <View style={styles.textWrapperStyles}>
          <HeadingBoldText style={styles.titleStyles}>
            {data.page_title}
          </HeadingBoldText>
          <HTML
            source={{
              html:
                data.description && formatTextNewLineToBreaks(data.description),
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.contrastBackground,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  pageWrapper: {
    flex: 1,
    backgroundColor: Colors.dark.contrastBackground,
  },
  titleStyles: {
    color: Colors.dark.creamText,
    fontSize: 20,
    marginBottom: 6,
    backgroundColor: Colors.dark.contrastBackground,
  },
  p: {
    color: Colors.dark.creamText,
    fontSize: 13,
    letterSpacing: 0.6,
    marginBottom: 10,
    fontFamily: "BrandonTextRegular",
  },
  a: {
    color: Colors.dark.creamText,
    textDecorationLine: "underline",
    fontFamily: "BrandonTextRegular",
  },
  ul: {
    color: Colors.dark.creamText,
    flex: 1,
    display: "flex",
    flexDirection: "column",

    fontSize: 13,
    letterSpacing: 0.6,
    marginBottom: 10,
    fontFamily: "BrandonTextRegular",
  },
  li: {
    color: Colors.dark.creamText,
    fontSize: 13,
    letterSpacing: 0.6,
  },
  strong: {
    fontFamily: "BrandonGrotesqueBold",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  textWrapperStyles: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingLeft: 30,
    paddingRight: 40,
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.dark.contrastBackground,
  },
  buttonStyles: {
    padding: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.dark.creamText,
  },
  btnTxt: {
    color: Colors.dark.creamText,
    fontSize: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.contrastBackground,
  },
  image: {
    width: Layout.window.width,
    flex: 1,
    backgroundColor: Colors.dark.contrastBackground,
  },
  arrowTxt: {
    color: "#fff",
    fontSize: 60,
  },
});

export default AmenitiesDetail;
