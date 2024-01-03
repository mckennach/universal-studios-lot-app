import React from "react";
import { Image } from "react-native";

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <Image
        style={{
            width: 100,
            height: 75,
            marginBottom: 0,
            position: "absolute",
            left: '50%',
            transform: [{ translateX: -50 }],
        }}
        source={{
          uri: "https://www.universalstudioslot.com/files/logowhite_57043.png",
          cache: "force-cache",
        }}
      />
    );
  }
}
