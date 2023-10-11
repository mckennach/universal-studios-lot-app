import { useState, useEffect, useCallback } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import { debounce } from "lodash";
// import { Text, View } from "../../components/Themed";
import { router } from 'expo-router';
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons/Icons";
import { SearchBar } from "@rneui/themed";
import { logObject } from "@/utils/helpers";
import { ParagraphMediumText } from "@/components/StyledText";
const { EXPO_PUBLIC_API_URL } = process.env;

interface SearchResultProps {
  id: string;
  page_id: string;
  page_title: string;
  meta_title: string;
  meta_desc: string;
  lead_image: string;
  page_link: string;
  section_url: string;
  score: string;
  table: string;
  contains: number;
}

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchResultProps[] | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  useEffect(() => {
    if(searchTerm.length > 0) {
      handleSearch();
    } else {
      console.log('here');
      setSearchData(null);
    }
  }, [searchTerm]);


  const fetchResults = async (query: string) => {
    const response = await fetch(
      `${EXPO_PUBLIC_API_URL}/app_api/json.php?function=search&id=${query}&exact=1`
    );
    const data = await response.json();
    return data;
  }

  const handleSearch = () => {
    if(searchTerm.length > 0) {
      debouncedSearch(searchTerm);
    }
  }

  const debouncedSearch = useCallback(debounce((searchTerm) => {
    fetchResults(searchTerm).then((data) => {
      if (data?.count === 0) {
        setNoResults(true);
        setSearchData([]);
      } else {
        setSearchData(data?.data);
      }
    });
  }, 300), []);


  const setParams = (item: SearchResultProps) => {
    const params = {
      url: '/search',
      description: 'Search',
    }
    switch (item.section_url) {
      case "stages-and-backlots":
        params.url = "/stages";
        params.description = 'Stages';
        break;
      case "stages":
        params.url = "/stages";
        params.description = "Stages";
        break;
      case "stage":
        params.url = `/stages/${item.page_id}`;
        params.description = "Stages";
        break;
      case "backlot":
        params.url = `/backlots/${item.page_id}`;
        params.description = "Backlots";
        break;
      case "map-for-app":
        params.url = `/map/${item.page_id}`;
        params.description = "Map";
        break;
      case "dining-services":
        params.url = `/dining`;
        params.description = "Restaurants";
        break;
      case "lot-amenities":
        params.url = `/amenities`;
        params.description = "Amenities";
        break;
      case "room-services":
        params.url = `/service-desk`;
        break;
      case "the-commissary":
        params.url = `/dining`;
        params.description = "Commissary Menu";
        break;
      case "driving-on-the-lot":
        params.url = `/driving`;
        params.description = "Driving";
        break;
      case "directory-for-app":
        params.url = `/directory/${item.page_id}`;
        params.description = "Directory";
        break;
      default:
        params.url = "/search";
        break;
    }
    return params;
  }

  const handleButtonPress = (item: SearchResultProps[], params: any) => {
    // router.push(url as any);
  }
  
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Icons
          name="search"
          size={26}
          color={Colors.dark.creamText}
          style={{ paddingBottom: 10 }}
        />
        <SearchBar
          containerStyle={styles.searchContainer}
          // inputContainerStyle={styles.searchBar}
          inputStyle={styles.searchStyles}
          placeholderTextColor={Colors.dark.creamText}
          rightIconContainerStyle={styles.clearIcon}
          clearIcon={
            <Icons
              name="arrow-right"
              size={16}
              style={{ marginBottom: -3 }}
              color={Colors.dark.creamText}
              // onPress={() => this.search()}
            />
          }
          placeholder="Search"
          onChangeText={(text) => setSearchTerm(text)}
          // onSubmitEditing={() => this.search()}
          value={searchTerm}
          searchIcon={false}
        />
      </View>
      {searchData && (
        searchData.length > 0 ? (
          <ScrollView>
            {searchData.map((item: any, index: number) => {
              const params = setParams(item);
              return (
                <TouchableHighlight
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => router.push(params.url as any)}
                  activeOpacity={0.5}
                  underlayColor={"#343434"}
                >
                  <View>
                    <ParagraphMediumText style={styles.searchResultTxt}>
                      {item.page_title}
                    </ParagraphMediumText>
                    <Text style={styles.subTxt}>{params.description}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <Text style={styles.searchResultTxt}>No results</Text>
          </View>
        )
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: Colors.dark.contrastBackground,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    color: Colors.dark.creamText,
    bottom: 0,
  },
  containerKeyBoard: {
    position: "relative",
    backgroundColor: Colors.dark.contrastBackground,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    color: Colors.dark.creamText,
    bottom: 50,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.dark.creamText,
    color: Colors.dark.creamText,
    fontSize: 16,
    fontFamily: "BrandonTextMedium",
    marginBottom: 20,
    marginTop: 16,
    letterSpacing: 1,
  },
  activeInput: {
    bottom: 50,
  },
  resultsWrapper: {
    paddingLeft: 20,
    height: 20,
  },
  searchResultItem: {
    marginBottom: 13,
  },
  searchResultTxt: {
    marginTop: 15,
    color: Colors.dark.creamText,
    fontSize: 15,
  },
  subTxt: {
    color: Colors.dark.creamText,
    fontSize: 12,
    opacity: 0.8,
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
    paddingBottom: 5,
  },
  searchContainer: {
    backgroundColor: Colors.dark.contrastBackground,
    borderColor: Colors.dark.creamText,
    borderWidth: 2,
    borderTopColor: Colors.dark.creamText,
    borderTopWidth: 2,
    borderBottomColor: Colors.dark.creamText,
    borderBottomWidth: 2,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 0,
    margin: 0,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchWrapper: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#343434",
  },
  clearIcon: {
    backgroundColor: Colors.dark.contrastBackground,
  },
});
