import { StyleSheet, TextInput } from "react-native"
import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons/Icons";
const HeaderSearch = (
    { 
        searchTerm, 
        setSearchTerm 
    }: 
    { 
        searchTerm: string; 
        setSearchTerm: any
    }) => {
    return (
        <View style={styles.container}>
            <Icons name="search" size={26} color={Colors.dark.creamText} />
            <TextInput
                onChangeText={(text) => setSearchTerm(text)}
                style={styles.searchInput}
                value={searchTerm}
            />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.contrastBackground,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    color: Colors.dark.creamText,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.dark.creamText,
    borderWidth: 1,
    color: Colors.dark.creamText,
    fontSize: 16,
    fontFamily: "BrandonTextMedium",
    marginBottom: 20,
    marginTop: 16,
    letterSpacing: 1,
    padding: 10,
    position: "relative",
    top: 30,
  },
  overlay: {
    height: 100,
    position: "absolute",
  },
});

export default HeaderSearch;



