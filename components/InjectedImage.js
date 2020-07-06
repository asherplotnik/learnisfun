import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Svg, { Rect } from "react-native-svg";
const InjectedImage = (props) => {
  return (
    <Svg>
      <Image source={require("../assets/" + props.image)} style={props.style} />
      <Rect
        fill="white"
        y="-10"
        x={props.style.width}
        height={props.style.height + 10}
        width={(props.style.width / 6) * 2}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default InjectedImage;
