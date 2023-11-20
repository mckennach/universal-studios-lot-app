import { TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import * as TaskManager from 'expo-task-manager';
import { AppContextProps } from "../../app/_layout";
import { View, Text, Modal } from "../Themed";
import { HeadingBoldText, ParagraphText } from "../StyledText";

const LOCATION_TASK_NAME = 'background-location-task';

const PermissionsModal = ({
  locationEnabled,
  setLocationEnabled,
  isModalOpen,
  setIsModalOpen,
  
}: AppContextProps) => {

    const handleButtonPress = async (requestAccess = true) => {
        if(requestAccess) {

          // const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
          // if (foregroundStatus === 'granted') {
          //   const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
          //   if (backgroundStatus === 'granted') {
          //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          //       accuracy: Location.Accuracy.Balanced,
          //     });
          //   }
          // }

          
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
              The On The Lot App collects location data to enable the user location, map, directions, & distance even when the app is closed or not in use. This data is only used for the On The Lot App and is not shared with any third parties.
            </ParagraphText>
          </Modal.Body>
          <Modal.Footer>
            <View
              style={{
                backgroundColor: Colors.dark.creamBg,
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => setIsModalOpen(false)}
              >
                <HeadingBoldText style={styles.shareHeading}>
                  Deny
                </HeadingBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleButtonPress(true)}
                style={styles.buttonStyles}
              >
                <HeadingBoldText style={styles.btnTxt}>
                  Accept
                </HeadingBoldText>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    );
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    throw new Error(error.message);
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    console.log(data);
    // do something with the locations captured in the background
  }
});

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
    marginRight: 50,
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
