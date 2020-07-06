import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomModal from "../../../components/CustomModal";
import { animalColors } from "./constants";
import { audioMessages } from "./constants";

const Lesson1ChooseAnimal = (props) => {
  const soundObject = new Audio.Sound();
  let [showModal, setShowModal] = useState(true);
  let [selctedAnimal, setSelectedAnimal] = useState(null);
  let score = useRef();
  let mistake = useRef(0);
  score.current = props.route.params.score - mistake.current;
  let isWrong = useRef(false);
  let pageView;
  props.navigation.setOptions({
    headerTitle: props.route.params.title,
  });
  const nextAnimal = props.route.params.nextAnimal;
  if (nextAnimal === 8) {
    pageView = (
      <View style={styles.finishScreen}>
        <Text style={styles.finishText}>Yeah... you made it.</Text>
        <Text style={styles.finishText}>Your score is {score.current}</Text>
        <Text style={styles.finishText}>
          {score.current === 100
            ? "AMAZING NO MISTAKES, PERECT!!!"
            : score.current >= 90
            ? "VERY GOOD - GOOD JOB"
            : score.current >= 75
            ? "NOT BAD  - TRY AGAIN"
            : score.current >= 55
            ? "NOT BAD"
            : "NEED IMPROVMENT - BETTER LUCK NEXT TIME..."}
        </Text>
      </View>
    );
    return <View style={styles.container}>{pageView}</View>;
  }

  const playAudio = async () => {
    try {
      await soundObject.loadAsync(audioMessages[nextAnimal]);
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };
  if (selctedAnimal !== nextAnimal) {
    mistake.current = 0;
    isWrong.current = false;
    playAudio();
    setSelectedAnimal(nextAnimal);
    setShowModal(true);
  }
  let message = `Color the ${animalColors[nextAnimal].animal} in ${animalColors[nextAnimal].color} color`;

  const goToColorScreen = (screen) => {
    if (screen === nextAnimal) {
      props.navigation.navigate("Lesson1ChooseColor", {
        title: "Color the animals",
        animal: screen,
        score: score.current,
      });
    } else {
      if (isWrong.current === false) {
        mistake.current = 6;
        isWrong.current = true;
      }
      playAudio();
      setShowModal(true);
    }
  };

  pageView = (
    <ScrollView>
      <CustomModal close={() => setShowModal(false)} show={showModal}>
        {message}
      </CustomModal>
      <View style={styles.viewRow}>
        <TouchableOpacity onPress={() => goToColorScreen(5)}>
          <Image style={styles.image} source={require("./jellyfish1.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToColorScreen(4)}>
          <Image source={require("./fish1.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewRow}>
        <TouchableOpacity onPress={() => goToColorScreen(7)}>
          <Image style={styles.image} source={require("./whale1.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToColorScreen(2)}>
          <Image source={require("./octopus1.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewRow}>
        <TouchableOpacity onPress={() => goToColorScreen(6)}>
          <Image style={styles.image} source={require("./seahorse1.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToColorScreen(1)}>
          <Image source={require("./shark1.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewRow}>
        <TouchableOpacity onPress={() => goToColorScreen(3)}>
          <Image style={styles.image} source={require("./turtle1.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToColorScreen(0)}>
          <Image source={require("./dolphin1.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  return <View style={styles.container}>{pageView}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    padding: 10,
  },
  finishText: {
    fontSize: 20,
    padding: 10,
  },
});

export default Lesson1ChooseAnimal;
