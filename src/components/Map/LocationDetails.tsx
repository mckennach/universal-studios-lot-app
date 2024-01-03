import { LocationProps } from '../../utils/types/map';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
const LocationDetails = ({ 
    activeLocation, 
    detailVisible, 
    distance, 
    locationEnabled, 
    renderDirections 
}: {
    activeLocation: LocationProps | null;
    detailVisible: boolean;
    distance: number | null;
    locationEnabled: boolean;
    renderDirections: any;
}) => {
    
    return (
      <View style={styles.callOutContainer}>
        <TouchableHighlight onPress={renderDirections}>
          <View style={styles.callOut}>
            <View style={styles.callOutInner}>
              <View>
                <Text style={styles.callOutTxt}>{activeLocation?.title}</Text>
                <Text style={styles.subTxt}>
                  {distance ? distance.toFixed(2) : null} miles
                </Text>
              </View>

              <View style={{ backgroundColor: '#6a6a6a'}}>
                <Text style={styles.go}>GO</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
};

const styles = StyleSheet.create({
  callOutContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  callOut: {
    backgroundColor: "#6A6A6A",
    padding: 30,
    width: 350,
  },
  callOutInner: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#6A6A6A",
  },
  callOutTxt: {
    color: "#F9F1E1",
    backgroundColor: "#6A6A6A",

    fontSize: 14,
  },
  subTxt: {
    color: "#F9F1E1",
    fontSize: 11,
    backgroundColor: "#6A6A6A",
  },
  go: {
    color: "#F9F1E1",
    fontSize: 20,
    marginTop: 2,
    backgroundColor: "#6A6A6A",
  },
  arrow: {
    marginLeft: 10,
    backgroundColor: "#6A6A6A",
  },
  backArrow: {
    position: "absolute",
    top: 150,
    left: 20,
    zIndex: 200,
  },
  markerHiddenStyles: {
    opacity: 0,
  },
  markerStyles: {
    opacity: 1,
  },
  calloutHidden: {
    display: "none",
  },
  searchResultItem: {
    marginTop: 15,
    marginBottom: 13,
  },
  searchResultTxt: {
    color: Colors.dark.creamText,
    fontSize: 15,
  },
  searchStyles: {
    fontSize: 14,
    color: Colors.dark.creamText,
    letterSpacing: 1,
    backgroundColor: Colors.dark.contrastBackground,
    fontFamily: "BrandonTextMedium",
  },
  searchIcon: {
    color: Colors.dark.creamText,
  },
  searchContainer: {
    backgroundColor: Colors.dark.contrastBackground,
    borderColor: Colors.dark.creamText,
    borderWidth: 1,
    borderTopColor: Colors.dark.creamText,
    borderTopWidth: 1,
    borderBottomColor: Colors.dark.creamText,
    borderBottomWidth: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 0,
    margin: 0,
    position: "relative",
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchWrapper: {
    backgroundColor: Colors.dark.contrastBackground,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    // backgroundColor: "#343434",
  },
  clearIcon: {
    backgroundColor: Colors.dark.contrastBackground,
  },
  noResults: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    color: Colors.dark.creamText,
  },
});

export default LocationDetails;
