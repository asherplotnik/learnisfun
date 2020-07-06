import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, PanResponder, Text, Dimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const Lesson3 = (props) => {
  props.navigation.setOptions({ headerTitle: props.route.params.title });
  const svgWidth = Dimensions.get("window").width;
  const svgHeight = Dimensions.get("window").height - 80;
  const svgViewBox = `0 0 ${svgWidth} ${svgHeight}`;
  const pointArray = useRef([]);
  const [updateScreen, setUpdateScreen] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        pointArray.current.push(`M${gestureState.x0},${gestureState.y0 - 80}`);
      },
      onPanResponderMove: (evt, gestureState) => {
        pointArray.current.push(
          `L${gestureState.moveX},${gestureState.moveY - 80}`
        );
        setUpdateScreen((prevState) => prevState + 1);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const path = (
    <Path
      d={pointArray.current.join(" ")}
      fill="none"
      stroke="red"
      strokeWidth="20"
    />
  );
  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Svg height="100%" width="100%" viewBox={svgViewBox}>
        {path}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Lesson3;
