import { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import Constants from 'expo-constants';

import Colors from "../../../../constants/Colors";
import { Text, View } from "../../../../components/Themed";
import ImageCard from "../../../../components/Cards/ImageCard";
import { logObject } from "@/utils/helpers";
const { EXPO_PUBLIC_API_URL } = process.env;

const fetchData = async () => {
  const API_URL = Constants.expoConfig?.extra && Constants.expoConfig?.extra.API_URL;

  const response = await fetch(`${API_URL}/app_api/get_pages/189`);
  // return response;
  const data = await response.json();
  return data;
};

export default function DiningScreen() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then((data) => {
      setData(data?.data);
    });
  }, []);



  if (!data) return <View style={styles.container}></View>;



  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        initialNumToRender={3}
        onEndReachedThreshold={0.7}
        keyExtractor={(item) => item?.page_id.toString()}
        renderItem={({ item }) => {
          const image = item?.image[0];

          return (
            <ImageCard
              image={`${EXPO_PUBLIC_API_URL}/thumbs/800x800/files/zc/${image}`}
              title={item?.title}
              link={`/dining/${item?.page_id}`}
              item={item}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    backgroundColor: Colors.dark.background,
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
