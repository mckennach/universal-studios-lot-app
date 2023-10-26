
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { HeadingBoldText, StagesSmallText } from "../../../../components/StyledText";

import { Text, View } from "../../../../components/Themed";
import Icons from "../../../../constants/Icons/Icons";
import Colors from "../../../../constants/Colors";
import Constants from "expo-constants";

import type { Stage } from "@/utils/types/stages";

import { logObject } from "@/utils/helpers";
const { EXPO_PUBLIC_API_URL } = process.env;

const fetchData = async () => {
  
  const response = await fetch(
    `${EXPO_PUBLIC_API_URL}/app_api/get_pages/64`
  );
  // return response;
  const data = await response.json();
  return data;
}



export default function StagesBacklotScreen() {
  const [data, setData] = useState<Stage[] | null >(null);
  useEffect(() => {
    fetchData().then((data) =>{ 
      setData(data?.data) 
    });
  }, [])


  if(!data) return <View style={styles.pageWrapper}></View>;
  
  return (
    <View style={styles.pageWrapper}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View key={item.page_id} style={styles.container}>
              <View style={styles.stageInfoColumn}>
                <HeadingBoldText style={styles.titleTxt}>
                  {item.stage_number}
                </HeadingBoldText>
                <View style={styles.stageInfoColumnsWrapper}>
                  <View style={styles.innerColumn}>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>Area: {item.area} SQ FT</StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Length: {item.length} FT
                      </StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>Width: {item.width} FT</StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Height: {item.height} FT
                      </StagesSmallText>
                    </View>
                  </View>
                  <View style={styles.innerColumn}>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Pits/Tanks: {item.pits == "1" ? "YES" : "NO"}
                      </StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Silent AC/Audience:{" "}
                        {item.silent_ac == "1" ? "YES" : "NO"}
                      </StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Wireless Internet: {item.wifi == "1" ? "YES" : "NO"}
                      </StagesSmallText>
                    </View>
                    <View style={styles.stageInfoItem}>
                      <StagesSmallText>
                        Point Load: {item.point_load}
                      </StagesSmallText>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.stageActionColumn}
                onPress={() => router.push({
                  pathname: `/stages/${item.page_id}`,
                  params: item,
                })}
              >
                <HeadingBoldText style={styles.btnTxt}>
                  View Stage Details
                </HeadingBoldText>
                <Icons
                  name="arrow-right"
                  size={16}
                  style={{ marginBottom: -3 }}
                  color={Colors.dark.creamText}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    backgroundColor: Colors.dark.contrastBackground,

    // backgroundColor: Colors.dark.contrastBackground
  },
  stageInfoColumnsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.contrastBackground,

    // backgroundColor: Colors.dark.contrastBackground,
  },
  stageInfoColumn: {
    flex: 1.6,
    backgroundColor: Colors.dark.contrastBackground,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerColumn: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.dark.contrastBackground,
  },

  titleTxt: {
    color: Colors.dark.contrastText,
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 6,
  },
  stageInfoItem: {
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: Colors.dark.contrastBackground,

    // backgroundColor: Colors.dark.contrastBackgroundLight,
    borderTopColor: Colors.dark.creamText,
    borderTopWidth: 1,
    flex: 0.9,
  },
  stageActionColumn: {
    flex: 0.4,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.dark.contrastBackgroundLight,
    padding: 18,
  },

  btnTxt: {
    color: Colors.dark.contrastText,
    fontSize: 11,
    marginBottom: 12,
  },
});



