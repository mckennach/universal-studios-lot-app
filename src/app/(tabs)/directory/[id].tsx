import { useEffect, useState } from "react";
import { 
  StyleSheet, 
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Linking, 
  Share } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { View } from "@/components/Themed";
import { ListItem } from "@rneui/themed";
import {
  HTML,
  HeadingMediumText,
  HeadingBoldText,
} from "@/components/StyledText";

import Colors from "@/constants/Colors";
import Layout from "@/constants/Layout";
import Icons from "@/constants/Icons/Icons";
import { WebView } from "react-native-webview"; //Add this to your imports
import { logObject } from "@/utils/helpers";


export default function DirectoryDetailScreen() {
  const [addressString, setAddressString] = useState<string | null>(null);
  const params =
    useLocalSearchParams();
    // const { department, email, phone, url, location, address } =
    //   useLocalSearchParams();


  const { department, email, phone, url, location, address, loc } = JSON.parse(params?.data as string);
  

  useEffect(() => {
    if(address) {
      
      setAddressString(`${address[0]}, ${address[1]}`);
    }
  }, [address])
  
  logObject("location", loc);
 
  // const pdfFile = pdf.split(",")[0];
  // const pdfUrl = `https://www.universalstudioslot.com/files/${pdfFile}`;
  // if (!pdf || !details) return null;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.titleView}>
        <View style={styles.iconContainer}>
          <Icons name="group" size={20} color={Colors.dark.tabIconDefault} />
        </View>
        <HeadingBoldText style={styles.headerTitle}>
          {department}
        </HeadingBoldText>
      </View>
      <View style={styles.listContainer}>
        {phone && (
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={"white"}
            onPress={() => Linking.openURL(`tel:${phone}`)}
          >
            <View style={styles.listItem}>
              <View style={{ marginRight: 8, paddingTop: 2 }}>
                <Icons
                  name="phone"
                  size={30}
                  color="#959595"
                  style={styles.infoIcon}
                />
              </View>
              <View>
                <View style={{ paddingTop: 0}}>
                  <HeadingMediumText style={styles.titleStyle}>
                    {phone}
                  </HeadingMediumText>
                </View>
                <View style={styles.subtitleWrapper}>
                  <HeadingMediumText style={styles.subtitleStyle}>
                    MOBILE
                  </HeadingMediumText>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}

        {email && (
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={"white"}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            <View style={styles.listItem}>
              <View style={{ marginRight: 8, paddingTop: 2 }}>
                <Icons
                  name="email"
                  size={18}
                  color="#959595"
                  style={styles.infoIcon}
                />
              </View>
              <View>
                <View style={{ paddingTop: 0}}>
                  <HeadingMediumText style={styles.titleStyle}>
                    {email}
                  </HeadingMediumText>
                </View>
                <View style={styles.subtitleWrapper}>
                  <HeadingMediumText style={styles.subtitleStyle}>
                    EMAIL
                  </HeadingMediumText>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}

        {url && (
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={"white"}
            onPress={() => Linking.openURL(`${url}`)}
          >
            <View style={styles.listItem}>
              <View style={{ marginRight: 8, paddingTop: 2 }}>
                <Icons
                  name="link"
                  size={25}
                  color="#959595"
                  style={styles.infoIcon}
                />
              </View>
              <View>
                <View style={{ paddingTop: 0}}>
                  <HeadingMediumText style={styles.titleStyle}>
                    {url}
                  </HeadingMediumText>
                </View>
                <View style={styles.subtitleWrapper}>
                  <HeadingMediumText style={styles.subtitleStyle}>
                    URL
                  </HeadingMediumText>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}

        {addressString && typeof addressString === 'string' && (
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={"white"}
            onPress={() => router.push(`/map/${loc[0]['id']}`)}
          >
            <View style={styles.listItem}>
              <View style={{ marginRight: 8, paddingTop: 2 }}>
                <Icons
                  name="pin"
                  size={24}
                  color="#959595"
                  style={styles.infoIcon}
                />
              </View>
              <View>
                <View style={{ paddingTop: 0}}>
                  <HeadingMediumText style={styles.titleStyle}>{addressString}</HeadingMediumText>
                </View>
                <View style={styles.subtitleWrapper}>
                  <HeadingMediumText style={styles.subtitleStyle}>
                    LOCATION
                  </HeadingMediumText>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleView: {
    backgroundColor: Colors.dark.contrastBackground,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
  },
  listContainer: {
    flex: 2,
  },
  headerTitle: {
    color: Colors.dark.creamText,
    textAlign: "center",
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    textAlign: "center",
    backgroundColor: Colors.dark.creamBg,
    // borderRadius: 10,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 18,
    marginTop: 30,
  },
  infoIcon: {
    width: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageWrapper: {
    flex: 1,
    paddingTop: Layout.pageTopPadding,
  },
  listItem: {
    marginLeft: 20,
    marginVertical: 5,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 10,
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 2,
    shadowOpacity: 0,
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
    // justifyContent: "center",
  },
  titleStyle: {
    fontSize: 10.5,
    color: Colors.dark.greyText,
    
  },
  subtitleWrapper: {
    paddingTop: 0,
    marginTop: 2,
  },
  subtitleStyle: {
    fontSize: 10,
    color: Colors.dark.greyText,
  },
  p: {
    fontSize: 10,
    color: Colors.dark.greyText,
    fontFamily: "BrandonGrotesqueMedium",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
