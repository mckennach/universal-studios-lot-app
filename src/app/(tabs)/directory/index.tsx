import { useEffect, useState } from "react";
import { router } from "expo-router";
import Constants from 'expo-constants';

import { KeyboardAvoidingView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { HeadingBoldText, HeadingMediumText, StagesSmallText } from "../../../components/StyledText";
import { Text, View } from "../../../components/Themed";
import Icons from "../../../constants/Icons/Icons";
import Colors from "../../../constants/Colors";
import { SearchBar } from "@rneui/themed";

import SearchStyles from "../../../constants/SearchStyles";

const { EXPO_PUBLIC_API_URL } = process.env;

const fetchData = async () => {
  const API_URL = Constants.expoConfig?.extra && Constants.expoConfig?.extra.API_URL;

  const response = await fetch(`${API_URL}/app_api/get_pages/163`);
  // return response;
  const data = await response.json();
  return data;
};

interface LocationRef {
    id: string;
    PARENT_ID: string;
    sub_group: string;
    name1: string;
    url: string;
    visible: string;
    order: string;
}

interface DirectoryProps {
    page_id: string;
    department: string;
    phone: string;
    email: string;
    url: string;
    addressOLD: string;
    location: LocationRef[];
    address: string[];
}

export default function DirectoryScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<DirectoryProps[] | null>(null);
  const [filteredData, setFilteredData] = useState<DirectoryProps[] | null>(null);

   useEffect(() => {
     fetchData().then((data) => {
       setData(data?.data);
       setFilteredData(data?.data);
     });
   }, []);
   

  if (!filteredData || filteredData.length === 0)
    return <View style={styles.pageWrapper}></View>;

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    if (data) {
      setFilteredData(
        data?.filter((item: any) =>
          item.department.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };



  return (
    <KeyboardAvoidingView style={styles.pageWrapper}>
      <View style={[SearchStyles.searchWrapper, styles.searchBarWrapper]}>
        <SearchBar
          placeholder="Search"
          onChangeText={updateSearch}
          value={searchTerm}
          placeholderTextColor={Colors.dark.creamText}
          inputStyle={SearchStyles.searchStyles}
          searchIcon={
            <Icons name="search" size={16} color={Colors.dark.creamText} />
          }
          clearIcon={{
            color: Colors.dark.creamText,
            name: "close",
            backgroundColor: Colors.dark.contrastBackground,
          }}
          containerStyle={SearchStyles.searchContainer}
          rightIconContainerStyle={SearchStyles.clearIcon}
        />
      </View>
      <View style={styles.pageWrapper}>
        <FlatList
          data={filteredData}
          
          renderItem={({ item }) => {
            const location = item?.location ? item?.location[0] : false;
            return (
              <TouchableOpacity 
                key={item.page_id} 
                onPress={() => router.push({
                    pathname: `/directory/${item.page_id}`,
                    params: { data: JSON.stringify(item)},
                })}
                style={styles.listItem}>
                <View
                  style={{
                    width: "10%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.dark.highlightBackground,
                  }}
                >
                  <Icons name="group" size={22} color="#959595" />
                </View>
                <View
                  style={{
                    width: "90%",
                    paddingLeft: 10,
                    backgroundColor: Colors.dark.highlightBackground,
                  }}
                >
                  <HeadingMediumText style={styles.titleStyle}>
                    {item?.department}
                  </HeadingMediumText>
                  <View style={location ? styles.subtitleWrapper : {}}>
                    <Text style={styles.subtitleStyle}>
                      {location ? location.name1 : ""}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    backgroundColor: Colors.dark.background,
  },
  listItem: {
    backgroundColor: Colors.dark.highlightBackground,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 0,
    flex: 1,
    flexDirection: "row",
  },
  titleStyle: {
    fontSize: 14,
    color: Colors.dark.greyText,
  },
  subtitleWrapper: {
    borderTopColor: "#D3D3D3",
    borderTopWidth: 2,
    paddingTop: 6,
    marginTop: 4,
    backgroundColor: Colors.dark.highlightBackground,
  },
  subtitleStyle: {
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: "BrandonGrotesqueMedium",
    color: Colors.dark.greyText,
  },
  searchBarWrapper: {
    paddingTop: 60,
  },
  searchIcon: {
    color: Colors.dark.creamText,
  },
  searchContainer: {
    backgroundColor: Colors.dark.contrastBackground,
    borderColor: Colors.dark.creamText,
    borderWidth: 2,
    borderTopColor: Colors.dark.creamText,
    borderTopWidth: 2,
    borderBottomColor: Colors.dark.creamText,
    borderBottomWidth: 2,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 0,
    margin: 0,
    marginTop: 50,
  },
  searchWrapper: {
    backgroundColor: Colors.dark.contrastBackground,
    paddingTop: 10,
  },
  clearIcon: {
    backgroundColor: Colors.dark.contrastBackground,
  },
  noResults: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
  },
});
