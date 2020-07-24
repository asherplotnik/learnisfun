import * as activeLessonActions from "../../../store/actions/activeLessonActions";
import { useDispatch } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import V from "../../../components/V";
import X from "../../../components/X";
import FinishScreen from "../../../components/FinishScreen";
import { Audio } from "expo-av";
import audioMessages from "./constants";
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
const Lesson4 = (props) => {
  const dispatch = useDispatch();
  const soundObject = new Audio.Sound();
  let isWrong = useRef(false).current;
  props.navigation.setOptions({
    headerTitle: "Find the vegetables",
  });
  const [showV, setShowV] = useState(false);
  const [showX, setShowX] = useState(false);
  const updateShowV = () => {
    setShowV((prevState) => !prevState);
  };
  const updateShowX = () => {
    setShowX((prevState) => !prevState);
  };
  const backToLessons = () => {
    props.navigation.navigate("lessons");
  };
  const playAudio = async (link) => {
    try {
      await soundObject.loadAsync(link);
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  };
  let [showOnion, setShowOnion] = useState(0);
  let [showPotato, setShowPotato] = useState(0);
  let [showCarrot, setShowCarrot] = useState(0);
  let [showCabbage, setShowCabbage] = useState(0);
  let [showPumpkin, setShowPumpkin] = useState(0);
  let count = useRef(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    dispatch(activeLessonActions.setActiveLesson(4, 100));
    playAudio(audioMessages.openAudio);
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
    },
    touch: {
      zIndex: 100,
    },
    image3: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width,
    },
    image1: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width / 3,
    },
    colorView: {
      position: "absolute",
      flex: 1,
      flexDirection: "row",
      height: "100%",
      width: "100%",
    },
    color1: { flex: 0.9, backgroundColor: "#673b5e", opacity: showOnion },
    color2: { flex: 1.1, backgroundColor: "#b79268", opacity: showPotato },
    color3: {
      flex: 0.47,
      backgroundColor: "springgreen",
      opacity: showCarrot,
    },
    color4: { flex: 0.53, backgroundColor: "orange", opacity: showCarrot },
    color5: { flex: 1, backgroundColor: "springgreen", opacity: showCabbage },
    color6: { flex: 1, backgroundColor: "orange", opacity: showPumpkin },
  });

  const onTouched = (event) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    if (
      x >= width / 1.36 &&
      x <= width / 1.256 &&
      y >= height / 5.213 &&
      y <= height / 3.52
    ) {
      if (showCarrot === 0) {
        playAudio(audioMessages.carrot);
        setShowCarrot(1);
        updateShowV();
        isWrong = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 14.678 &&
      x <= width / 2.617 &&
      y >= height / 8.228 &&
      y <= height / 3.594
    ) {
      if (showPumpkin === 0) {
        playAudio(audioMessages.pumpkin);
        setShowPumpkin(1);
        updateShowV();
        isWrong = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 2.874 &&
      x <= width / 2.024 &&
      y >= height / 2.848 &&
      y <= height / 2.069
    ) {
      if (showPotato === 0) {
        playAudio(audioMessages.potato);
        setShowPotato(1);
        updateShowV();
        isWrong = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 1.771 &&
      x <= width / 1.388 &&
      y >= height / 3.049 &&
      y <= height / 2.511
    ) {
      if (showOnion === 0) {
        playAudio(audioMessages.onion);
        setShowOnion(1);
        updateShowV();
        isWrong = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 1.212 &&
      x <= width / 1.096 &&
      y >= height / 18.45 &&
      y <= height / 9.486
    ) {
      if (showCabbage === 0) {
        playAudio(audioMessages.cabbage);
        setShowCabbage(1);
        updateShowV();
        isWrong = false;
        count.current = count.current + 1;
      }
    } else {
      if (isWrong === false) {
        dispatch(activeLessonActions.updateScore(-4));
        updateShowX();
        isWrong = true;
      }
    }
    if (count.current === 5) {
      setDone(true);
    }

    console.log(
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
      count.current
    );
  };
  let pageView = (
    <View style={styles.container}>
      <V show={showV} setShow={updateShowV} />
      <X show={showX} setShow={updateShowX} />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touch}
        onPress={onTouched}
      >
        <Image source={require("./image3.png")} style={styles.image3} />
      </TouchableOpacity>
      <View>
        <View style={styles.colorView}>
          <View style={styles.color1}></View>
          <View style={styles.color2}></View>
          <View style={styles.color3}></View>
          <View style={styles.color4}></View>
          <View style={styles.color5}></View>
          <View style={styles.color6}></View>
        </View>
        <Image source={require("./image11.png")} style={styles.image1} />
      </View>
    </View>
  );
  if (done) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  }
  return pageView;
};

export default Lesson4;
