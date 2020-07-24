import React, { useRef } from "react";
import { Dimensions, Animated, Easing, Image, StyleSheet } from "react-native";
const X = (props) => {
  const showVAnim = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.sequence([
      Animated.timing(showVAnim, {
        toValue: 1,
        delay: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(showVAnim, {
        toValue: 0,
        delay: 300,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => props.setShow());
  };
  if (props.show) {
    start();
  }
  return (
    <Animated.View
      style={{
        ...styles.showVView,
        opacity: showVAnim,
        zIndex: props.show ? 210 : 60,
      }}
    >
      <Image style={styles.vImage} source={require("../assets/x.png")} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  showVView: {
    flex: 1,
    position: "absolute",
    marginTop: 50,
  },
  vImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
});

export default X;
