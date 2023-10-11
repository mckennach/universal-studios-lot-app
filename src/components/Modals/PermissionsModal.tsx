import { TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Colors from "@/constants/Colors";
import { AppContextProps } from "@/app/_layout";
import { View, Text, Modal } from "../Themed";
import { HeadingBoldText, ParagraphText } from "../StyledText";

const PermissionsModal = ({
  locationEnabled,
  setLocationEnabled,
  isModalOpen,
  setIsModalOpen,
}: AppContextProps) => {

    const handleButtonPress = async (requestAccess = true) => {
        if(requestAccess) {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
              setLocationEnabled(true);
              setIsModalOpen(false);
            }
        }
    }

    return (
      <Modal
        onSwipeComplete={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <Modal.Container>
          <Modal.Header>
            <HeadingBoldText style={styles.text}>Enable location access</HeadingBoldText>
          </Modal.Header>
          <Modal.Body>
            <ParagraphText style={styles.text}>
              The Universal Studios On the Lot application works better with
              location on. Location allow you to easily search for key locations
              on the Universal Studios Lot.
            </ParagraphText>
          </Modal.Body>
          <Modal.Footer>
            <View
              style={{
                backgroundColor: Colors.dark.creamBg,
              }}
            >
              <TouchableOpacity
                onPress={() => handleButtonPress(true)}
                style={styles.buttonStyles}
              >
                <HeadingBoldText style={styles.btnTxt}>
                  Allow Location
                </HeadingBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => setIsModalOpen(false)}
              >
                <HeadingBoldText style={styles.shareHeading}>
                  Cancel
                </HeadingBoldText>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark.greyText,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.dark.greyText,
  },
  buttonStyles: {
    marginTop: 5,
    // marginLeft: 40,
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.dark.creamBg,
  },
  btnTxt: {
    padding: 12,
    color: Colors.dark.greyText,
    fontSize: 10,
    borderWidth: 1,
    borderColor: Colors.dark.greyText,
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
    textAlign: "center",
    color: Colors.dark.greyText,
  },
  shareHeading: {
    // marginLeft: 12,
    fontSize: 12,
    color: Colors.dark.greyText,
    marginTop: 8,
  },
});

export default PermissionsModal;
