import { View } from "../Themed";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";
import { HeadingBoldText, HTML } from "../StyledText";
import Layout from "@/constants/Layout";
import { logObject, formatParagraph, formatTextNewLineToBreaks } from "@/utils/helpers";
import ImageGallery from "../Images/ImageGallery";
import { Link } from "expo-router";
import ProgressiveImage from "../Images/ProgressiveImage";
const { EXPO_PUBLIC_API_URL } = process.env;

const DiningDetail = ({ data }: any) => {
  const title = data.page_title ? data.page_title : data.title;
  const description = formatParagraph(data.description);
  const pdfButton = data.pdf ? data.pdf.split(',') : null;
  const orderButton = data.order_link ? data.order_link.split(',') : null;
  console.log(pdfButton)
  
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageGallery data={data.image_gallery} />
        <View style={styles.textWrapperStyles}>
          <HeadingBoldText style={styles.titleStyles}>{title}</HeadingBoldText>
          {description && (
            <View style={styles.descText}>
              <HTML
                source={{
                  html:
                    data.description &&
                    formatTextNewLineToBreaks(data.description),
                }}
              />
            </View>
          )}

          {data.hours_box_1 && (
            <View style={styles.descText}>
              <HTML
                source={{
                  html:
                    data.hours_box_1 &&
                    formatTextNewLineToBreaks(data.hours_box_1),
                }}
              />
            </View>
          )}

          {data.hours_box_2 && (
            <View style={styles.descText}>
              <HTML
                source={{
                  html:
                    data.hours_box_2 &&
                    formatTextNewLineToBreaks(data.hours_box_2),
                }}
              />
            </View>
          )}

          {pdfButton && pdfButton[0] != "" && pdfButton[1] != "" && (
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() =>
                Linking.openURL(`${EXPO_PUBLIC_API_URL}/files/${pdfButton[0]}`)
              }
            >
              <HeadingBoldText style={styles.btnTxt}>
                {pdfButton[1]}
              </HeadingBoldText>
            </TouchableOpacity>
          )}

          {orderButton && orderButton[0] != "" && orderButton[1] != "" && (
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() => Linking.openURL(orderButton[1])}
            >
              <HeadingBoldText style={styles.btnTxt}>
                {orderButton[0]}
              </HeadingBoldText>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <ProgressiveImage
            thumbnailSource={{
              uri: `${EXPO_PUBLIC_API_URL}/thumbs/800x800/files/zc/${
                data.image.split(",")[0]
              }`,
            }}
            source={{
              uri: `${EXPO_PUBLIC_API_URL}/thumbs/800x800/files/zc/${
                data.image.split(",")[0]
              }`,
            }}
            style={{ height: 231 }}
          />
        </View>
      </ScrollView>
      {/* <View style={styles.textWrapperStyles}>
                <HeadingBoldText style={styles.titleStyles}>
                    Universal Studios Lot
                </HeadingBoldText>
                <LightText style={styles.textStyles}>
                    100 Universal City Plaza, Universal City, CA 91608
                </LightText>
                <LightText style={styles.textStyles}>
                    818.777.3000
                </LightText>
                <LightText style={styles.textStyles}>
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.universalstudioslot.com/")}>
                        https://www.universalstudioslot.com/
                    </TouchableOpacity>
                </LightText>
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: Colors.dark.contrastBackground,
    height: "100%",
  },
  titleStyles: {
    color: Colors.dark.creamText,
    fontSize: 20,
    marginBottom: 6,
  },
  textStyles: {
    color: Colors.dark.creamText,
    fontSize: 13,
    letterSpacing: 0.6,
  },
  descText: {
    marginBottom: 18,
    backgroundColor: Colors.dark.contrastBackground,
  },
  hoursText: {
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 11,
    backgroundColor: Colors.dark.contrastBackground,
  },
  reservationText: {
    backgroundColor: Colors.dark.contrastBackground,

    color: Colors.dark.greenText,
    fontSize: 12,
    marginTop: 12,
  },
  textWrapperStyles: {
    backgroundColor: Colors.dark.contrastBackground,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 40,
    flex: 1,
    flexDirection: "column",
  },
  buttonStyles: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  btnTxt: {
    padding: 12,
    color: Colors.dark.creamText,
    fontSize: 10,
    borderWidth: 1,
    borderColor: Colors.dark.creamText,
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

export default DiningDetail;
