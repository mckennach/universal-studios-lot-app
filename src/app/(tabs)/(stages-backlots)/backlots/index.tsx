import { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, FlatList } from "react-native";

import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import ImageCard from "@/components/Cards/ImageCard";

import SearchStyles from "@/constants/SearchStyles";
import { SearchBar } from "@rneui/themed";
import Icons from "@/constants/Icons/Icons";
import { ParagraphText } from "@/components/StyledText";
import { BacklotProps } from "@/utils/types/backlots";
const { EXPO_PUBLIC_API_URL } = process.env;




const fetchData = async () => {
  const response = await fetch(
    `${EXPO_PUBLIC_API_URL}/app_api/get_pages/65`
  );
  // return response;
  const data = await response.json();
  return data;
};


export default function BacklotsScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<BacklotProps[] | []>([]);
  const [filteredData, setFilteredData] = useState<BacklotProps[] | []>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data?.data);
      setFilteredData(data?.data);
    });
  }, []);

  if(!filteredData || filteredData.length === 0) return <View style={styles.container}></View>;

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    if(data) {
      setFilteredData(
        data?.filter((item: any) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }

  const EmptyState = () => {
    if(filteredData && filteredData.length > 0) return null;
    return (
      <View>
        <ParagraphText style={SearchStyles.noResults}>
          No directory results match "{searchTerm}". {"\n"}
          Please check your query and try again.
        </ParagraphText>
      </View>
    );
  }

  


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[SearchStyles.searchWrapper, styles.searchBarWrapper]}>
        <SearchBar
          placeholder="Search"
          onChangeText={updateSearch}
          value={searchTerm}
          placeholderTextColor={Colors.dark.creamText}
          inputStyle={SearchStyles.searchStyles}
          searchIcon={<Icons name="search" size={16} color={Colors.dark.creamText} />}
          clearIcon={{
            color: Colors.dark.creamText,
            name: "close",
            backgroundColor: Colors.dark.contrastBackground,
          }}
          containerStyle={SearchStyles.searchContainer}
          rightIconContainerStyle={SearchStyles.clearIcon}
        />
      </View>

      <EmptyState />

      <FlatList
        data={filteredData}
        initialNumToRender={3}
        onEndReachedThreshold={0.7}
        keyExtractor={(item) => item?.page_id.toString()}
        renderItem={({ item } ) => {
          const image = item?.image[0];
          return (
            <>
              <ImageCard
                image={`${EXPO_PUBLIC_API_URL}/thumbs/800x800/files/zc/${image}`}
                title={item?.title}
                link={`/backlots/${item?.page_id}`}
                item={item}
              />
            </>
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    paddingTop: 60,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    backgroundColor: Colors.dark.background,
  },
});
