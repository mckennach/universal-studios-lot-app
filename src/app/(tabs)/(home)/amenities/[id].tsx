import { StyleSheet, TouchableOpacity, Share } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { View, Text } from "@/components/Themed";
import {
  HTML,
  HeadingMediumText,
  HeadingBoldText,
} from "@/components/StyledText";
import { logObject } from "@/utils/helpers";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons/Icons";
import { WebView } from "react-native-webview"; //Add this to your imports
import AmenitiesDetail from "@/components/DetailPages/AmenitiesDetail";

export default function AmenitiesDetailScreen() {
  const data = useLocalSearchParams();
// return null;
  return <AmenitiesDetail data={data} />;
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
