import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

import Svg, { Circle } from "react-native-svg";
import CustomModal from "../../components/CustomModal";
const animalColors = [
  { animal: "dolphin", color: "gray" },
  { animal: "shark", color: "blue" },
  { animal: "octopus", color: "purple" },
  { animal: "turtle", color: "green" },
  { animal: "fish", color: "yellow" },
  { animal: "jellyfish", color: "pink" },
  { animal: "seahorse", color: "orange" },
  { animal: "whale", color: "black" },
];

const Lesson1 = (props) => {
  props.navigation.setOptions({ headerTitle: props.route.params.title });
  const colorWidth = Dimensions.get("window").width / 8;
  const colorHeight = Dimensions.get("window").height / 14;
  const svgViewBox = `0 0 ${colorWidth * 7} ${colorHeight * 13}`;
  const colorTouched = useRef("black");
  const [svgElementArray, setSvgElementArray] = useState([]);
  const handlePress = (e) => {
    setSvgElementArray((prevState) =>
      prevState.concat(
        <Circle
          r="10"
          fill={colorTouched.current}
          cx={e.nativeEvent.locationX}
          cy={e.nativeEvent.locationY}
          key={e.nativeEvent.locationX + Math.random()}
        />
      )
    );
  };
  const styles = StyleSheet.create({
    modalWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      width: "70%",
      height: 200,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    svgTouch: {
      width: "100%",
      height: "100%",
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
    },
    svgView: {
      flex: 5,
    },
    colorsView: {
      flex: 1,
    },
    grayColor: {
      backgroundColor: "gray",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    blueColor: {
      backgroundColor: "blue",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    greenColor: {
      backgroundColor: "green",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    purpleColor: {
      backgroundColor: "purple",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    orangeColor: {
      backgroundColor: "orange",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    yellowColor: {
      backgroundColor: "yellow",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    pinkColor: {
      backgroundColor: "pink",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
    blackColor: {
      backgroundColor: "black",
      height: colorHeight,
      width: "73%",
      margin: 10,
      borderRadius: colorWidth / 2,
    },
  });

  return (
    <View style={styles.wrapper}>
      <CustomModal>Color the animals! </CustomModal>
      <View style={styles.colorsView}>
        <TouchableOpacity
          style={styles.blueColor}
          onPress={() => {
            colorTouched.current = "blue";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.grayColor}
          onPress={() => {
            colorTouched.current = "gray";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.greenColor}
          onPress={() => {
            colorTouched.current = "green";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.purpleColor}
          onPress={() => {
            colorTouched.current = "purple";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.orangeColor}
          onPress={() => {
            colorTouched.current = "orange";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.yellowColor}
          onPress={() => {
            colorTouched.current = "yellow";
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.pinkColor}
          onPress={() => {
            colorTouched.current = "pink";
          }}
          setColorTouched
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.blackColor}
          onPress={() => {
            colorTouched.current = "black";
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.svgView}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.svgTouch}
          onPressIn={(evt) => handlePress(evt)}
        >
          <Svg height="100%" width="100%" viewBox={svgViewBox}>
            {svgElementArray}
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lesson1;
