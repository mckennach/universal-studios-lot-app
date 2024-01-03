import { View } from "../Themed";
import { ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { HeadingBoldText, LightText } from "../StyledText";
import Layout from "../../constants/Layout";
import { logObject, formatParagraph, contactUrl } from "../../utils/helpers";
import ImageGallery from "../Images/ImageGallery";

const DefaultDetail = ({ data }: any) => {
    const title = data.page_title ? data.page_title : data.title;
    const description = formatParagraph(data.description);
    return (
      <View style={styles.container}>
        <ScrollView>
            <ImageGallery data={data.image_gallery} />
            <View style={styles.textWrapperStyles}>
                <HeadingBoldText style={styles.titleStyles}>
                  {title}
                </HeadingBoldText>
                <LightText style={styles.textStyles}>{description}</LightText>
                {data.pdf_link && data.pdf_link[0] != "" && data.pdf_link[1] && (
                <TouchableOpacity style={styles.buttonStyles}>
                    <HeadingBoldText style={styles.btnTxt}>
                    {data.pdf_link[0]}
                    </HeadingBoldText>
                </TouchableOpacity>
                )}
                <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() =>
                    Linking.openURL(contactUrl).catch((err) =>
                    console.error("An error occurred", err)
                    )
                }
                >
                <HeadingBoldText style={styles.btnTxt}>
                    Contact for more info
                </HeadingBoldText>
                </TouchableOpacity>
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
}

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

export default DefaultDetail
