import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, PanResponder, Text, Dimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const Lesson2 = (props) => {
  props.navigation.setOptions({ headerTitle: props.route.params.title });
  const svgWidth = Dimensions.get("window").width;
  const svgHeight = Dimensions.get("window").height - 80;
  const svgViewBox = `0 0 ${svgWidth} ${svgHeight}`;
  const svgElementArray = useRef([]);
  const [updateScreen, setUpdateScreen] = useState(0);
  const addCircle = (x1, y1, color) => {
    svgElementArray.current.push(
      <Circle
        r="15"
        fill={color}
        cx={x1}
        cy={y1 - 80}
        key={x1 + Math.random()}
      />
    );
    setUpdateScreen((prevState) => prevState + 1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        addCircle(gestureState.x0, gestureState.y0, "red");
      },
      onPanResponderMove: (evt, gestureState) => {
        addCircle(gestureState.moveX, gestureState.moveY, "red");
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Svg height="100%" width="100%" viewBox={svgViewBox}>
        {svgElementArray.current}
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

export default Lesson2;
