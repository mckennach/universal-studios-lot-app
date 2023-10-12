
import { useState, useEffect } from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "../../../components/Themed";

// import DefaultDetail from "@/components/DetailPages/DefaultDetail";
import DrivingDetail from "../../../components/DetailPages/DrivingDetail";
const { EXPO_PUBLIC_API_URL } = process.env;


const fetchData = async () => {
  const response = await fetch(`${EXPO_PUBLIC_API_URL}/app_api/get_pages/50`);
  // return response;
  const data = await response.json();
  return data;
};

export default function DrivingScreen() {
   const [data, setData] = useState(null);
   useEffect(() => {
     fetchData().then((data) => {
       setData(data?.data);
     });
   }, []);

  if (!data) return <View style={styles.container}></View>;

  return <DrivingDetail data={data[0]} />
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
