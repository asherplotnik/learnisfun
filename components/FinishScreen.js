import React from "react";
import Colors from "../constants/Colors";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import * as activeLessonActions from "../store/actions/activeLessonActions";
const FinishScreen = (props) => {
  const reduxScore = useSelector((state) => state.activeLesson.score);
  return (
    <View style={styles.finishScreen}>
      <Text style={styles.finishText}>Yeah... you made it.</Text>
      <Text style={styles.finishText}>Your score is {reduxScore}</Text>
      <View style={{ alignItems: "center" }}>
        {reduxScore === 100 ? (
          <View>
            <Text style={styles.finishText}>AMAZING! No mistakes at all.</Text>
            <Text style={styles.finishText}>PERFECT!!!</Text>
          </View>
        ) : reduxScore >= 90 ? (
          <Text style={styles.finishText}>VERY GOOD - GOOD JOB</Text>
        ) : reduxScore >= 75 ? (
          <Text style={styles.finishText}>NOT BAD - TRY AGAIN</Text>
        ) : reduxScore >= 55 ? (
          <Text style={styles.finishText}>NOT BAD</Text>
        ) : (
          <Text style={styles.finishText}>
            NEED IMPROVMENT - BETTER LUCK NEXT TIME...
          </Text>
        )}
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={props.backToLessons}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  finishScreen: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    padding: 10,
    backgroundColor: Colors.buttonColor,
  },
  finishText: {
    fontFamily: "kurri-island",
    color: Colors.titleYellow,
    fontSize: 30,
    padding: 10,
    lineHeight: 35,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonView: {
    width: Dimensions.get("window").width / 3,
    marginVertical: 30,
    alignItems: "center",
    padding: 7,
    backgroundColor: "navy",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "kurri-island",
    fontSize: 30,
    color: Colors.buttonColor,
  },
});

export default FinishScreen;
