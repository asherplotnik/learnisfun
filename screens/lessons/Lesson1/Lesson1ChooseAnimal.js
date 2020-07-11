import { useDispatch, useSelector } from "react-redux";
import * as activeLessonActions from "../../../store/actions/activeLessonActions";
import React, { useState, useRef, useEffect } from "react";
import FinishScreen from "../../../components/FinishScreen";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Button,
  TouchableOpacityBase,
} from "react-native";
import { Audio } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomModal from "../../../components/CustomModal";
import { animalColors } from "./constants";
import { audioMessages } from "./constants";
import Colors from "../../../constants/Colors";
const Lesson1ChooseAnimal = (props) => {
  const playAudio = async () => {
    try {
      await soundObject.loadAsync(audioMessages[nextAnimal]);
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };

  const backToLessons = () => {
    props.navigation.navigate("lessons");
  };
  const goToColorScreen = (screen) => {
    if (screen < nextAnimal) {
      return;
    }
    if (screen === nextAnimal) {
      props.navigation.navigate("Lesson1ChooseColor", {
        animal: screen,
      });
    } else {
      if (isWrong.current === false) {
        dispatch(activeLessonActions.updateScore(-6));
        isWrong.current = true;
      }
      playAudio();
      setShowModal(true);
    }
  };

  const dispatch = useDispatch();
  const soundObject = new Audio.Sound();
  let [showModal, setShowModal] = useState(true);
  let [selctedAnimal, setSelectedAnimal] = useState(null);
  let isWrong = useRef(false);
  let pageView;
  props.navigation.setOptions({
    headerTitle: "Color the animals",
  });
  let nextAnimal;
  if (props.route.params) {
    nextAnimal = props.route.params.nextAnimal;
  } else {
    nextAnimal = 0;
  }
  if (selctedAnimal !== nextAnimal) {
    isWrong.current = false;
    playAudio();
    setSelectedAnimal(nextAnimal);
    setShowModal(true);
  }
  let message = `Color the ${animalColors[nextAnimal].animal} in ${animalColors[nextAnimal].color} color`;
  useEffect(() => {
    dispatch(activeLessonActions.setActiveLesson(1, 100));
  }, [activeLessonActions]);

  if (nextAnimal === 8) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  } else {
    pageView = (
      <ScrollView>
        <CustomModal
          close={() => setShowModal(false)}
          show={showModal}
          textColor={Colors.tint}
          background="white"
        >
          {message}
        </CustomModal>
        <View style={styles.viewRow}>
          <TouchableOpacity onPress={() => goToColorScreen(5)}>
            {nextAnimal <= 5 ? (
              <Image
                style={styles.image}
                source={require("./jellyfish2.png")}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("./jellyfish3.png")}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToColorScreen(4)}>
            {nextAnimal <= 4 ? (
              <Image style={styles.image} source={require("./fish2.png")} />
            ) : (
              <Image style={styles.image} source={require("./fish3.png")} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewRow}>
          <TouchableOpacity onPress={() => goToColorScreen(7)}>
            {nextAnimal <= 7 ? (
              <Image style={styles.image} source={require("./whale2.png")} />
            ) : (
              <Image style={styles.image} source={require("./whale3.png")} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToColorScreen(2)}>
            {nextAnimal <= 2 ? (
              <Image style={styles.image} source={require("./octopus2.png")} />
            ) : (
              <Image style={styles.image} source={require("./octopus3.png")} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewRow}>
          <TouchableOpacity onPress={() => goToColorScreen(6)}>
            {nextAnimal <= 6 ? (
              <Image style={styles.image} source={require("./seahorse2.png")} />
            ) : (
              <Image style={styles.image} source={require("./seahorse3.png")} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToColorScreen(1)}>
            {nextAnimal <= 1 ? (
              <Image style={styles.image} source={require("./shark2.png")} />
            ) : (
              <Image style={styles.image} source={require("./shark3.png")} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewRow}>
          <TouchableOpacity onPress={() => goToColorScreen(3)}>
            {nextAnimal <= 3 ? (
              <Image style={styles.image} source={require("./turtle2.png")} />
            ) : (
              <Image style={styles.image} source={require("./turtle3.png")} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToColorScreen(0)}>
            {nextAnimal <= 0 ? (
              <Image source={require("./dolphin2.png")} style={styles.image} />
            ) : (
              <Image source={require("./dolphin3.png")} style={styles.image} />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return <View style={styles.container}>{pageView}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.buttonColor,
  },
  viewRow: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    marginHorizontal: 15,
  },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
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

export default Lesson1ChooseAnimal;
