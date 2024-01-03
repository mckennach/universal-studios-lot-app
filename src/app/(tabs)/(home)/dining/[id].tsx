import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
// import { logObject } from "@/utils/helpers";
import Colors from "../../../../constants/Colors";

import DiningDetail from "../../../../components/DetailPages/DiningDetail";
export default function DiningDetailScreen() {
  const data = useLocalSearchParams();

  return <DiningDetail data={data} />;
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
