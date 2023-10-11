import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  searchStyles: {
    fontSize: 14,
    color: Colors.dark.creamText,
    letterSpacing: 1,
    backgroundColor: Colors.dark.contrastBackground,
    fontFamily: 'BrandonTextRegular'
  },
  searchIcon: {
    color: Colors.dark.creamText
  },
  searchContainer: {
    backgroundColor: Colors.dark.contrastBackground,
    borderColor: Colors.dark.creamText,
    borderWidth: 1,
    borderTopColor: Colors.dark.creamText,
    borderTopWidth: 1,
    borderBottomColor: Colors.dark.creamText,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 0,
    margin: 0
  },
  searchWrapper: {
    backgroundColor: Colors.dark.contrastBackground,
    paddingTop: 20,
    paddingBottom: 20
  },
  clearIcon: {
    backgroundColor: Colors.dark.contrastBackground
  },
  noResults: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    color: Colors.dark.contrastBackground
  }
});
