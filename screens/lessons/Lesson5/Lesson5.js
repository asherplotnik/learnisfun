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
const Lesson5 = (props) => {
  const dispatch = useDispatch();
  const soundObject = new Audio.Sound();
  let isWrong = useRef(false);
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
  let [showCloud, setShowCloud] = useState(0);
  let [showCircle, setShowCircle] = useState(0);
  let [showMat, setShowMat] = useState(0);
  let [showWindow, setShowWindow] = useState(0);
  let [showFence, setShowFence] = useState(0);
  let count = useRef(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    dispatch(activeLessonActions.setActiveLesson(4, 100));
    playAudio(audioMessages.openAudio);
  }, []);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
    },
    touch: {
      zIndex: 100,
    },
    image1: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 2.3,
    },
    image2: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 2.3,
    },
    circle: {
      position: "absolute",
      width: width / 10,
      height: width / 10,
      left: width / 2.45,
      top: height / 5.8,
      zIndex: 101 * showCircle,
      opacity: showCircle,
    },
    circle2: {
      position: "absolute",
      width: width / 5.1,
      height: width / 5.1,
      left: width / 2.2,
      top: height / 4.45,
      zIndex: 101 * showWindow,
      opacity: showWindow,
    },
    fence: {
      position: "absolute",
      width: width / 9.6,
      height: width / 4.4,
      left: width / 1.39,
      top: height / 4.1,
      zIndex: 101 * showFence,
      opacity: showFence,
    },
    mat: {
      position: "absolute",
      width: width / 4.5,
      height: height / 22,
      left: width / 3.4,
      top: height / 2.95,
      zIndex: 101 * showMat,
      opacity: showMat,
    },
    cloud: {
      position: "absolute",
      width: width / 4.5,
      height: height / 9,
      left: width / 3.7,
      top: height / 22,
      zIndex: 101 * showCloud,
      opacity: showCloud,
    },
  });

  const onTouched = (event) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    if (
      x >= width / 2.5 &&
      x <= width / 2 &&
      y >= height / 5.2 &&
      y <= height / 4.5
    ) {
      if (showCircle === 0) {
        updateShowV();
        setShowCircle(1);
        isWrong.current = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 2.034 &&
      x <= width / 1.643 &&
      y >= height / 4.115 &&
      y <= height / 3.14
    ) {
      if (showWindow === 0) {
        updateShowV();
        setShowWindow(1);
        isWrong.current = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 3.28 &&
      x <= width / 2.03 &&
      y >= height / 2.975 &&
      y <= height / 2.615
    ) {
      if (showMat === 0) {
        updateShowV();
        setShowMat(1);
        isWrong.current = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 3.913 &&
      x <= width / 2.151 &&
      y >= height / 26.026 &&
      y <= height / 6.596
    ) {
      if (showCloud === 0) {
        updateShowV();
        setShowCloud(1);
        isWrong.current = false;
        count.current = count.current + 1;
      }
    } else if (
      x >= width / 1.372 &&
      x <= width / 1.24 &&
      y >= height / 3.875 &&
      y <= height / 2.747
    ) {
      if (showFence === 0) {
        updateShowV();
        setShowFence(1);
        isWrong.current = false;
        count.current = count.current + 1;
      }
    } else {
      if (isWrong.current === false) {
        dispatch(activeLessonActions.updateScore(-4));
        updateShowX();
        isWrong.current = true;
      }
    }
    if (count.current === 5) {
      setDone(true);
    }
    console.log(
      width / event.nativeEvent.locationX,
      height / event.nativeEvent.locationY,
      count.current
    );
  };

  let pageView = (
    <View style={styles.container}>
      <V show={showV} setShow={updateShowV} />
      <X show={showX} setShow={updateShowX} />
      <Image source={require("./circle.png")} style={styles.circle} />
      <Image source={require("./circle2.png")} style={styles.circle2} />
      <Image source={require("./fence.png")} style={styles.fence} />
      <Image source={require("./mat.png")} style={styles.mat} />
      <Image source={require("./cloud.png")} style={styles.cloud} />
      <Image
        source={require("./circle.png")}
        style={{ ...styles.circle, top: styles.circle.top + height / 2 - 40 }}
      />
      <Image
        source={require("./circle2.png")}
        style={{ ...styles.circle2, top: styles.circle2.top + height / 2 - 40 }}
      />
      <Image
        source={require("./fence.png")}
        style={{ ...styles.fence, top: styles.fence.top + height / 2 - 40 }}
      />
      <Image
        source={require("./mat.png")}
        style={{ ...styles.mat, top: styles.mat.top + height / 2 - 40 }}
      />
      <Image
        source={require("./cloud.png")}
        style={{ ...styles.cloud, top: styles.cloud.top + height / 2 - 40 }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touch}
        onPress={onTouched}
      >
        <Image source={require("./image1.png")} style={styles.image1} />
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: Dimensions.get("window").width,
          }}
        />
        <Image source={require("./image2.png")} style={styles.image2} />
      </TouchableOpacity>
    </View>
  );
  if (done) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  }
  return pageView;
};

export default Lesson5;
