import React from "react";
import { View, StyleSheet, Text } from "react-native";
const Lesson3 = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text>Lesson 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Lesson3;
