import { StyleSheet, TouchableOpacity, Share } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { View } from "../../../../components/Themed";
import {
  HTML,
  HeadingMediumText,
  HeadingBoldText,
} from "../../../../components/StyledText";

import Colors from "../../../../constants/Colors";
import Icons from "../../../../constants/Icons/Icons";
import { WebView } from 'react-native-webview'; //Add this to your imports



export default function StagesDetailScreen() {
    const { pdf, details }: any = useLocalSearchParams() || {};
    const pdfFile = pdf.split(',')[0];
    const pdfUrl = `https://www.universalstudioslot.com/files/${pdfFile}`;
    if(!pdf || !details) return null;
    return (
      <View style={styles.container}>
        <WebView
          style={styles.pdf}
          source={{ uri: pdfUrl }}
          scalesPageToFit={true}
        />

        <View style={styles.htmlWrapper}>
          <HTML source={{ html: details as string }} txtColor="black" />
          <TouchableOpacity style={styles.buttonWrapper}>
            <Icons name="share" size={24} color="#959595" />
            <HeadingMediumText style={styles.shareHeading}>
              Share
            </HeadingMediumText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <HeadingBoldText style={styles.buttonText}>
              Contact for More Info
            </HeadingBoldText>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  pdf: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
  },
  buttonWrapper: {
    display: "flex",

    alignItems: "center",
    backgroundColor: "#ffffff",
    textAlign: "center",

    marginTop: 30,
    paddingBottom: 30,
  },
  htmlWrapper: {
    display: "flex",

    alignItems: "center",
    backgroundColor: "#ffffff",
    textAlign: "center",

    marginTop: 30,
    paddingBottom: 30,
  },
  shareHeading: {
    color: "#959595",
    marginTop: 8,
  },
  button: {
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    padding: 12,
    color: Colors.dark.contrastBackground,
    fontSize: 10,
    borderWidth: 1,
    borderColor: Colors.dark.contrastBackground,
  },
});
