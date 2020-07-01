import React from "react";
import { Dimensions } from "react-native";
import { View, StyleSheet, Image, Text } from "react-native";
const HomeTitle = (props) => {
  const windowWidth = Math.round(Dimensions.get("window").width);
  const windowHeight = Math.round(Dimensions.get("window").height);
  //const viewBox = "0 0 411 342";
  const x1 = windowWidth;
  const y1 = windowHeight / 2;
  const styles = StyleSheet.create({
    image: {
      width: x1,
      height: x1 / 2.74,
    },
  });

  return (
    <View>
      <Image
        source={require("../assets/learnIsFun.png")}
        style={styles.image}
      />
    </View>
  );
};

export default HomeTitle;
