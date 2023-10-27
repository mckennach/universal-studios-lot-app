import { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
// import { View, Text } from "@/components/Themed";
import Map from "../../../components/Map/Map";
import { logObject } from "@/utils/helpers";
import * as Location from "expo-location";

import type { LocationProps } from "../../../utils/types/map";
import MapDisabled from "../../../components/Map/MapDisabled";
import PermissionsModal from "../../../components/Modals/PermissionsModal";
import { AppContext, AppContextProps } from "../../../app/_layout";


const { EXPO_PUBLIC_API_URL } = process.env;


const fetchData = async () => {
  const response = await fetch(`${EXPO_PUBLIC_API_URL}/app_api/get_pages/161`);
  // return response;
  const data = await response.json();
  return data;
};



export default function MapScreen() {
  const app = useContext<AppContextProps>(AppContext);
  const { locationEnabled, setLocationEnabled, isModalOpen, setIsModalOpen } = app;
  const [data, setData] = useState<LocationProps[] | null>(null);
  
  

  useEffect(() => {

    (async () => {
      const { granted } = await Location.getForegroundPermissionsAsync();
      const { granted: bgGranted } = await Location.getBackgroundPermissionsAsync();
      const test = await Location.isBackgroundLocationAvailableAsync();
      if(granted && bgGranted && locationEnabled) {
        fetchData().then((data) => {
          setData(data?.data);
        });
      } else {
        setIsModalOpen(true);
      }
    })();

  }, [locationEnabled]);

  console.log(locationEnabled);

  if(!locationEnabled) return (
    <>
      <MapDisabled
        locationEnabled={locationEnabled}
        setLocationEnabled={setLocationEnabled}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <PermissionsModal
        locationEnabled={locationEnabled}
        setLocationEnabled={setLocationEnabled}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
  return <Map data={data} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
