import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Easing,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const Lesson2 = (props) => {
  props.navigation.setOptions({ headerTitle: "Match faces" });
  const showMoveFace = useRef(new Animated.ValueXY()).current;
  const screenHeight = Dimensions.get("window").height;
  useEffect(() => {
    Animated.timing(showMoveFace, {
      toValue: { x: 0, y: screenHeight * 0.89 },
      delay: 1000,
      duration: 1500,
      easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          ...styles.showImage,
          transform: showMoveFace.getTranslateTransform(),
        }}
        source={require("./showSad.png")}
      />
      <View style={styles.rowImage}>
        <Animated.Image style={styles.image} source={require("./happy.png")} />
        <Image style={styles.image} source={require("./scared.png")} />
      </View>
      <View style={styles.rowImage}>
        <Image style={styles.image} source={require("./angry.png")} />
        <Image style={styles.image} source={require("./sleepy.png")} />
      </View>
      <View style={styles.rowImage}>
        <Image style={styles.faceImage} source={require("./boy1.png")} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Sad face</Text>
      </View>
    </View>
  );
};

const imageWidth = Dimensions.get("window").width / 4;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  textView: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "kurri-island",
  },
  image: {
    width: imageWidth,
    height: imageWidth,
  },
  showImage: {
    width: imageWidth * 1.5,
    height: imageWidth * 1.5,
    position: "absolute",
    top: -height / 2.5,
    left: imageWidth * 2 - imageWidth / 1.25,
    zIndex: 100,
  },
  faceImage: {
    width: imageWidth * 2,
    height: imageWidth * 2,
  },
  container: {
    paddingTop: 10,
    flex: 1,
  },
  rowImage: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: imageWidth / 3,
  },
});

export default Lesson2;
