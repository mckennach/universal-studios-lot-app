import { TouchableOpacity, StyleSheet } from "react-native"
import * as Location from "expo-location"
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { HeadingBoldText, HeadingMediumText } from "../StyledText"
import { AppContextProps } from "../../app/_layout";
import { router } from "expo-router";

const MapDisabled = ({
  locationEnabled,
  setLocationEnabled,
  isModalOpen,
  setIsModalOpen,
}: AppContextProps) => {

  const handleButtonPress = async (requestAccess = true) => {
      if (requestAccess) {
        const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        console.log(canAskAgain);
        if (status === "granted") {
          setLocationEnabled(true);
          setIsModalOpen(false);
        }
      }
  };
  
  return (
    <View style={styles.container}>
      <HeadingBoldText style={styles.title}>
        You aren't sharing your location. The On the Lot app works best if you
        allow Location Permissions
      </HeadingBoldText>
      <TouchableOpacity
        style={styles.buttonStyles}
          onPress={() => handleButtonPress(true)}
      >
        <HeadingBoldText style={styles.btnTxt}>Allow Location</HeadingBoldText>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => router.replace("/")}
        style={styles.link}
      >
        <HeadingMediumText style={styles.linkText}>Go Home</HeadingMediumText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.dark.greyText,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
    textAlign: "center",
    color: Colors.dark.greyText,
  },
  linkText: {
    fontSize: 12,
    color: Colors.dark.greyText,
    marginTop: 8,
  },
  buttonStyles: {
    marginTop: 5,
    // marginLeft: 40,
    display: "flex",
    flexDirection: "row",
  },
  btnTxt: {
    padding: 12,
    color: Colors.dark.greyText,
    fontSize: 10,
    borderWidth: 1,
    borderColor: Colors.dark.greyText,
  },
});

export default MapDisabled