
import {
 
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { LightText } from "../../../components/StyledText";
import Icons from "../../../constants/Icons/Icons";


interface SocializeScreenProps {
  key: number;
  title: string;
  url: string;
}

const DATA = [
  {
    key: 0,
    title: "facebook",
    url: "https://www.facebook.com/universalstudioslot",
  },
  {
    key: 1,
    title: "twitter",
    url: "https://twitter.com/UniStudiosLot",
  },
  {
    key: 2,
    title: "instagram",
    url: "https://www.instagram.com/universalstudioslot/",
  },
  {
    key: 3,
    title: "youtube",
    url: "https://www.youtube.com/channel/UCXrVznqk_18810xue_2PK-w/featured",
  },
];

export default function SocializeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: Colors.dark.contrastBackground }}>
        <LightText style={styles.titleText}>
          Follow us on social media
        </LightText>
        <FlatList
          contentContainerStyle={styles.listWrapper}
          data={DATA}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
                key={item.key}
                onPress={() => 
                  Linking.openURL(item.url).catch(err => 
                    console.log('An error has occured', err
                  ))}>
                <Icons
                  name={item.title}
                  size={40}
                  style={styles.icon}
                  color={Colors.dark.creamText}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.contrastBackground,
    flex: 1,
    justifyContent: "center",
    padding: 30,
    color: Colors.dark.creamText,
  },
  titleText: {
    color: Colors.dark.creamText,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 19,
    letterSpacing: 1,
  },
  listWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
});
