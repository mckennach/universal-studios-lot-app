import { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function ProgressiveImage ({ thumbnailSource, source, style, ...props }) {
  
    const [thumbnailAnimated, setThumbnailAnimated] = useState(new Animated.Value(0));
    const [imageAnimated, setImageAnimated] = useState(new Animated.Value(0));
    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                {...props}
                source={thumbnailSource}
                style={[style, { opacity: 0.5 }]}
                blurRadius={1}
            />
            <Animated.Image
                {...props}
                source={source}
                style={[styles.imageOverlay, style]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});