import { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
// import { View, Text } from "@/components/Themed";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import Map from "@/components/Map/Map";
import { logObject } from "@/utils/helpers";
import type { LocationProps } from "@/utils/types/map";
import MapDisabled from "@/components/Map/MapDisabled";
import PermissionsModal from "@/components/Modals/PermissionsModal";
import { AppContext, AppContextProps } from "@/app/_layout";

const { EXPO_PUBLIC_API_URL } = process.env;

const fetchData = async () => {
  const response = await fetch(`${EXPO_PUBLIC_API_URL}/app_api/get_pages/161`);
  // return response;
  const data = await response.json();
  return data;
};

export default function MapDetailScreen() {
  const app = useContext<AppContextProps>(AppContext);
  const params = useLocalSearchParams();
  const { locationEnabled, setLocationEnabled, isModalOpen, setIsModalOpen } =
    app;
  const [data, setData] = useState<LocationProps[] | null>(null);
  const [activeLocation, setActiveLocation] = useState<LocationProps | null>(null);
  
  useEffect(() => {
    if(params?.data) {
      setActiveLocation(JSON.parse(params?.data as string) as LocationProps); 
    }
  }, [params])

  useEffect(() => {
   
    if (params?.id && data) {
      const routedLocation = data.filter((location) => location.page_id === params?.id);
      setActiveLocation(routedLocation[0]);  
    }
  }, [params, data]);
  

  useEffect(() => {
    if (locationEnabled) {
      fetchData().then((data) => {
        setData(data?.data);
      });
    } else {
      setIsModalOpen(true);
    }
  }, [locationEnabled]);

        
      


  if (!locationEnabled)
    return (
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
  return <Map data={data} activeData={activeLocation} />;
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
