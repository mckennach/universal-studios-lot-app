import { ScrollView, TouchableHighlight, StyleSheet, Dimensions, Platform } from "react-native"
import { View } from "../Themed"
import { ParagraphMediumText, ParagraphText } from "../StyledText"
import Colors from "../../constants/Colors"
import Layout from "../../constants/Layout"
import { LocationProps } from "../../utils/types/map"
import { router,  } from "expo-router"

const SearchOverlay = ({
  renderDetails,
  search,
  searchBarHeight,
  searchResults,
  searchResultsVisible
}: {
  renderDetails: any;
  search: string;
  searchBarHeight: number;
  searchResults: LocationProps[] | [] | null;
  searchResultsVisible: boolean;
}) => {
  

  const handleButtonPress = (location: LocationProps) => {
    router.replace({ 
      pathname:`/map/${location.page_id}`,
      params: { data: JSON.stringify(location) }
      // params: location
    });
  }


  if (!searchResultsVisible || search.length === 0 || !search) return null;
  return (
    <View
      style={[
        styles.overlay,
        {
          top: searchBarHeight > 0 ? searchBarHeight : 105,
          height:
            Layout.window.height - searchBarHeight > 0
              ? Layout.window.height - searchBarHeight
              : 0,
        },
      ]}
    >
      {searchResults && searchResults.length > 0 && search.length !== 0 ? (
        <ScrollView style={styles.overlayInner}>  
            {searchResults.map((result: any, index: number) => {
              return (
                <TouchableHighlight
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => renderDetails(result)}
                  underlayColor={Colors.dark.contrastBackground}
                >
                  <ParagraphMediumText style={styles.searchResultTxt}>
                    {result.title}
                  </ParagraphMediumText>
                </TouchableHighlight>
              )
            })}
        
        </ScrollView>
      ) : (
        <View style={styles.overlayInner}>
          <ParagraphText style={styles.noResults}>
            No directory results match "{search}". {"\n"}
            Please check your query and try again.
          </ParagraphText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    // top: searchBarHeight > 0 searchBarHeight : 105,
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
  searchResultItem: {
    marginTop: 15,
    marginBottom: 13,
  },
  searchResultTxt: {
    color: Colors.dark.creamText,
    fontSize: 16,
  },
  clearIcon: {
    backgroundColor: Colors.dark.contrastBackground,
  },
  noResults: {
    fontSize: 16,
    color: Colors.dark.creamText,
  },
});



export default SearchOverlay