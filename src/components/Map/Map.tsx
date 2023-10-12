import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Animated,
  AnimatedRegion
} from "react-native-maps";
import { convertDistance, getDistance, getPreciseDistance } from "geolib";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
// Components
import { View, Text } from "../Themed";
import Icons from "../../constants/Icons/Icons";
import { SearchBar } from "@rneui/themed";


// Constants
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import SearchStyles from "../../constants/SearchStyles";
import { MapStyles } from "../../constants/MapStyles";

// Utils
import type { Coordinates, LocationProps, Region, UserLocationProps } from "../../utils/types/map";
import { logObject } from "../../utils/helpers";
import SearchOverlay from "./SearchOverlay";
import LocationDetails from "./LocationDetails";




const Map = ({ data, activeData }: { data: LocationProps[] | null, activeData?: LocationProps | null }) => {
  const ASPECT_RATIO = Layout.window.width / Layout.window.height;
  const LATITUDE_DELTA = 0.035;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const markerImage = require("../../assets/images/pin.png");
  const zoomDelta = 0.005;
  const [apiKey, setApiKey] = useState<string>("");

  const [activeCoordinates, setActiveCoordinates] = useState<Coordinates>({
    latitude: 34.141602,
    longitude: -118.350403,
  });
  const [activeLocation, setActiveLocation] = useState<LocationProps | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [destination, setDestination] = useState<any>(null);
  const [directionsApiKey, setDirectionsApiKey] = useState<string>("");
  const [directionsActive, setDirectionsActive] = useState<boolean>(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [locations, setLocations] = useState<LocationProps[] | null>(null);

  const [origin, setOrigin] = useState<any>(null);
  const [region, setRegion] = useState<Region>({
    longitude: -118.351969,
    latitude: 34.141605,
    longitudeDelta: LONGITUDE_DELTA,
    latitudeDelta: LATITUDE_DELTA,
  });
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchLocationLoaded, setSearchLocationLoaded] = useState<boolean>(
    false
  );
  const [searchBarHeight, setSearchBarHeight] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchResultsVisible, setSearchResultsVisible] =
    useState<boolean>(false);

  const [userLocation, setUserLocation] = useState<Location.LocationObject>({
      coords: {
        speed: 0,
        latitude: 34.141602,
        longitude: -118.350403,
        accuracy: 0,
        heading: 0,
        altitude: 0,
        altitudeAccuracy: 0,
      },
      timestamp: 0,
  });

  const [userCoordinates, setUserCoordinates] = useState<any>({
    latitude: 34.141602,
    longitude: -118.350403,
  });

    useEffect(() => {
        setApiKey(
          Platform.OS === "android"
            ? process.env.EXPO_PUBLIC_ANDROID_MAP_KEY as string
            : process.env.EXPO_PUBLIC_IOS_MAP_KEY as string
        );

        setDirectionsApiKey(
          process.env.EXPO_PUBLIC_DIRECTIONS_KEY as string
        )
      
    }, []);

    useEffect(() => {
      if (data) {
        setLocations(data);
      }
    }, [data]);

    useEffect(() => {
      if (activeData) {
        setActiveLocation(activeData);
        renderDetails(activeData);
      }
    }, [activeData]);

    useEffect(() => {
      (async () => {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation(currentLocation);
      })();
    }, [])

    useEffect(() => {
      (async () => {
     
        if(directionsActive) {
          // await Location.installWebGeolocationPolyfill();
          await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
            },
            (location) => {
              if(location !== userLocation) {
                console.log('UPDATE LOCATION');
                setUserLocation(location);
              }
            }
          );
        }
      })();
      
      
    }, [directionsActive])
    
    

    const renderDistance = (origin: Coordinates, destination: Coordinates) => {
      const distance = getDistance(
        origin,
        destination
      );
      
      const miles = typeof distance === 'number' ? Math.round(convertDistance(distance, "mi") * 100) / 100 : 0;
      setDistance(miles);

    }


    const renderDirections = (origin: Coordinates, destination: Coordinates) => {
      setOrigin(origin);
      setDestination(destination);
      setShowDirections(true);
      setDirectionsActive(true);
    }

    const renderDetails = (location: LocationProps) => {
      logObject("location!!", location);
      updateSearch('');
      setActiveLocation(location);
      setDetailsVisible(true);
      setSearchResultsVisible(false);
      setActiveCoordinates({
        latitude: parseFloat(
          location.lat_lon[0] !== "0.000000" ? location.lat_lon[0] : location.lat
        ),
        longitude: parseFloat(
          location.lat_lon[1] !== "0.000000" ? location.lat_lon[1] : location.lon
        ),
      });    

      renderDistance(activeCoordinates, userCoordinates);

      setRegion({
        latitude: parseFloat(
          location.lat_lon[0] !== "0.000000" ? location.lat_lon[0] : location.lat
        ),
        longitude: parseFloat(
          location.lat_lon[1] !== "0.000000" ? location.lat_lon[1] : location.lon
        ),
        latitudeDelta: zoomDelta,
        longitudeDelta: zoomDelta * ASPECT_RATIO,
      });
    }

    const resetMap = () => {
      setShowDirections(false);
      setDetailsVisible(false);
      setDistance(null);
      setActiveLocation(null);
      zoomShowFullMap();

    }

    const updateSearch = (search: string) => {
        setSearch(search);
        setSearchResultsVisible(true);
        if (search.length > 0) {
          const results = locations?.filter((location) =>
            location.title.toLowerCase().includes(search.toLowerCase())
          );
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
    }

  


    const zoomShowFullMap = () => {
      const fullMapRegion = new AnimatedRegion({
        longitude: -118.351969,
        latitude: 34.141605,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
      });

      // setRegion(fullMapRegion);
    }

  
    // console.log(detailsVisible, showDirections, "detailsVisible, showDirections");

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View
          style={[SearchStyles.searchWrapper, styles.searchBarWrapper]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setSearchBarHeight(height);
          }}
        >
          <SearchBar
            containerStyle={SearchStyles.searchContainer}
            
            rightIconContainerStyle={SearchStyles.clearIcon}
            inputStyle={SearchStyles.searchStyles}
            searchIcon={<Icons name="search" size={16} color="#F9F1E1" />}
            placeholder="Search Locations"
            placeholderTextColor={Colors.dark.creamText}
            onChangeText={updateSearch}
            value={search}
          />
        </View>
        <SearchOverlay
          renderDetails={renderDetails}
          search={search}
          searchBarHeight={searchBarHeight}
          searchResults={searchResults}
          searchResultsVisible={searchResultsVisible}
        />
        <MapView.Animated
          style={styles.map}
          customMapStyle={MapStyles}
          followsUserLocation={true}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          region={region}
          showsPointsOfInterest={false}
          showsUserLocation={true}
        >
          {activeLocation && (
            <Marker
              coordinate={{
                latitude: parseFloat(
                  activeLocation.lat_lon[0] !== "0.000000"
                    ? activeLocation.lat_lon[0]
                    : activeLocation.lat
                ),
                longitude: parseFloat(
                  activeLocation.lat_lon[1] !== "0.000000"
                    ? activeLocation.lat_lon[1]
                    : activeLocation.lon
                ),
              }}
              image={markerImage}
              title={activeLocation.title}
              style={styles.markerStyles}
            >
              <Callout tooltip style={styles.calloutHidden} />
            </Marker>
          )}

          {showDirections && (
            <MapViewDirections
              apikey={directionsApiKey}
              destination={activeCoordinates}
              mode="WALKING"
              origin={userLocation.coords}
              resetOnChange={false}
              strokeColor="#F9F1E1"
              strokeWidth={3}
            />
          )}
        </MapView.Animated>
        {detailsVisible && (
          <LocationDetails
            activeLocation={activeLocation}
            detailVisible={detailsVisible}
            distance={distance}
            locationEnabled={true}
            renderDirections={renderDirections}
          />
        )}
        {
          detailsVisible && (
            <TouchableOpacity 
            style={styles.backArrow}
            onPress={resetMap} >
              <Icons name="arrow-left" size={30} color={Colors.dark.creamText} />
            </TouchableOpacity>
          )
        }
        
          
        
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    backgroundColor: Colors.dark.background,
  },
  searchBarWrapper: {
    paddingTop: 60,
  },
  searchBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 105,
  },
  searchBar: {
    position: "relative",
    top: 0,
  },
  map: {
    position: "relative",
    // top: 105,
    left: 0,
    right: 0,
    bottom: 0,
    width: Layout.window.width,
    height: Layout.window.height,
    flex: 1,
    zIndex: 1,
  },
  overlay: {
    flex: 1,    
    left: 0,
    top: 105,
    opacity: 0.8,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 190,
    backgroundColor: "#343434",
    width: Layout.window.width,
    zIndex: 2,
  },
  overlayInner: {},
  plainView: {
    width: 60,
  },
  callOutContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
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
  },
  callOutTxt: {
    color: "#F9F1E1",
    fontSize: 14,
  },
  subTxt: {
    color: "#F9F1E1",
    fontSize: 11,
  },
  go: {
    color: "#F9F1E1",
    fontSize: 20,
    marginTop: 2,
  },
  arrow: {
    marginLeft: 10,
  },
  backArrow: {
    position: "absolute",
    top: 150,
 
    left: 20,
    zIndex: 20,
    
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

export default Map;
