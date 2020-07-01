import React, { useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Text, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const Lesson2 = (props) => {
  const svgWidth = Dimensions.get("window").width;
  const svgHeight = Dimensions.get("window").height - 80;
  const svgViewBox = `0 0 ${svgWidth} ${svgHeight}`;
  const [svgElementArray, setSvgElementArray] = useState([]);
  //[panX, setPanX] = useState(0);
  //[panY, setPanY] = useState(0);

  const addCircle = (x1, y1, color) => {
    setSvgElementArray((prevState) =>
      prevState.concat(
        <Circle
          r="15"
          fill={color}
          cx={x1}
          cy={y1 - 80}
          key={x1 + Math.random()}
        />
      )
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        //setPanX(gestureState.x0);
        //setPanY(gestureState.y0);
        addCircle(gestureState.x0, gestureState.y0, "red");
      },
      onPanResponderMove: (evt, gestureState) => {
        //setPanX(gestureState.moveX);
        //setPanY(gestureState.moveY);
        addCircle(gestureState.moveX, gestureState.moveY, "red");
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Svg height="100%" width="100%" viewBox={svgViewBox}>
        {svgElementArray}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    // justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Lesson2;
