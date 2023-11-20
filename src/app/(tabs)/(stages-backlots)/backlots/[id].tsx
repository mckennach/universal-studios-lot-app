import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../../../constants/Colors";

import DefaultDetail from "../../../../components/DetailPages/DefaultDetail";

export default function BacklotDetailScreen() {
    const data = useLocalSearchParams();
  
    return (
        <DefaultDetail data={data} />
    )
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

