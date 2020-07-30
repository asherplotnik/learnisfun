import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import V from "../../../components/V";
import X from "../../../components/X";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
} from "react-native";
import FinishScreen from "../../../components/FinishScreen";
import * as activeLessonActions from "../../../store/actions/activeLessonActions";
import Svg, { Line } from "react-native-svg";
const Lesson7 = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [showV, setShowV] = useState(false);
  const [showX, setShowX] = useState(false);
  props.navigation.setOptions({ headerTitle: "Draw a line" });
  const dispatch = useDispatch();
  let isWrong = useRef(false).current;
  const found = useRef([0, 0, 0, 0]).current;
  let selected = useRef(0);
  let [done, setDone] = useState(false);
  let [refresh, setRefresh] = useState(0);
  const pan = useRef([
    [10, 10],
    [10, windowHeight / 6],
    [10, windowHeight / 2.6],
    [10, windowHeight / 1.83],
  ]);

  const svgViewBox = `0 0 ${windowWidth * 0.5}  ${windowHeight * 0.57}`;
  useEffect(() => {
    dispatch(activeLessonActions.setActiveLesson(7, 100));
  }, []);

  const backToLessons = () => {
    props.navigation.navigate("lessons");
  };

  const checkAll = () => {
    for (let i = 0; i < found.length; i++) {
      if (found[i] === 0) {
        return false;
      }
    }
    return true;
  };

  const updateShowV = () => {
    setShowV((prevState) => !prevState);
  };
  const updateShowX = () => {
    setShowX((prevState) => !prevState);
  };

  const checkSelected = (gestureState) => {
    if (
      gestureState.x0 - Dimensions.get("window").width / 6 > 0 &&
      gestureState.x0 - Dimensions.get("window").width / 6 < 20 &&
      gestureState.y0 - windowHeight / 5.7 - 80 > 0 &&
      gestureState.y0 - windowHeight / 5.7 - 80 < 20
    ) {
      return 0;
    } else if (
      gestureState.x0 - windowWidth / 6 > 0 &&
      gestureState.x0 - windowWidth / 6 < 20 &&
      gestureState.y0 - windowHeight / 5.7 - 80 > windowHeight / 7 &&
      gestureState.y0 - windowHeight / 5.7 - 80 < windowHeight / 5
    ) {
      return 1;
    } else if (
      gestureState.x0 - windowWidth / 6 > 0 &&
      gestureState.x0 - windowWidth / 6 < 20 &&
      gestureState.y0 - windowHeight / 5.7 - 80 > windowHeight / 2.7 &&
      gestureState.y0 - windowHeight / 5.7 - 80 < windowHeight / 2.5
    ) {
      return 2;
    } else if (
      gestureState.x0 - windowWidth / 6 > 0 &&
      gestureState.x0 - windowWidth / 6 < 20 &&
      gestureState.y0 - windowHeight / 5.7 - 80 > windowHeight / 1.9 &&
      gestureState.y0 - windowHeight / 5.7 - 80 < windowHeight / 1.78
    ) {
      return 3;
    }
    return -1;
  };

  const checkMistake = (item) => {
    switch (item) {
      case 0:
        if (
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 1.907 &&
            pan.current[selected.current][1] <= windowHeight / 1.737) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= -3 &&
            pan.current[selected.current][1] <= windowHeight / 22.7) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 6.96 &&
            pan.current[selected.current][1] <= windowHeight / 4.84)
        ) {
          return true;
        } else {
          return false;
        }
      case 1:
        if (
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 2.81 &&
            pan.current[selected.current][1] <= windowHeight / 2.47) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= -3 &&
            pan.current[selected.current][1] <= windowHeight / 22.7) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 6.96 &&
            pan.current[selected.current][1] <= windowHeight / 4.84)
        ) {
          return true;
        } else {
          return false;
        }
      case 2:
        if (
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 2.81 &&
            pan.current[selected.current][1] <= windowHeight / 2.47) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 1.907 &&
            pan.current[selected.current][1] <= windowHeight / 1.737) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 6.96 &&
            pan.current[selected.current][1] <= windowHeight / 4.84)
        ) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 2.81 &&
            pan.current[selected.current][1] <= windowHeight / 2.47) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= windowHeight / 1.907 &&
            pan.current[selected.current][1] <= windowHeight / 1.737) ||
          (pan.current[selected.current][0] >= windowWidth / 2.35 &&
            pan.current[selected.current][0] <= windowWidth / 1.9 &&
            pan.current[selected.current][1] >= -3 &&
            pan.current[selected.current][1] <= windowHeight / 22.7)
        ) {
          return true;
        } else {
          return false;
        }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        selected.current = checkSelected(gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (selected.current >= 0) {
          if (found[selected.current] === 0) {
            pan.current[selected.current][0] =
              gestureState.moveX - windowWidth / 6;
            pan.current[selected.current][1] =
              gestureState.moveY - windowHeight / 5.7 - 80;
            setRefresh((prevState) => prevState + 1);
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        switch (selected.current) {
          case 0:
            if (
              pan.current[0][0] >= windowWidth / 2.35 &&
              pan.current[0][0] <= windowWidth / 1.9 &&
              pan.current[0][1] >= windowHeight / 2.9 &&
              pan.current[0][1] <= windowHeight / 2.35
            ) {
              found[0] = 1;
              updateShowV();
              isWrong = false;
            } else {
              if (checkMistake(0)) {
                if (isWrong === false) {
                  dispatch(activeLessonActions.updateScore(-20));
                  updateShowX();
                  isWrong = true;
                } else {
                  setRefresh((prevState) => prevState + 1);
                }
              } else {
                setRefresh((prevState) => prevState + 1);
              }
              pan.current[0][0] = 10;
              pan.current[0][1] = 10;
            }
            break;
          case 1:
            if (
              pan.current[1][0] >= windowWidth / 2.35 &&
              pan.current[1][0] <= windowWidth / 1.9 &&
              pan.current[1][1] >= windowHeight / 2 &&
              pan.current[1][1] <= windowHeight / 1.6
            ) {
              found[1] = 1;
              updateShowV();
              isWrong = false;
            } else {
              if (checkMistake(1)) {
                if (isWrong === false) {
                  dispatch(activeLessonActions.updateScore(-20));
                  updateShowX();
                  isWrong = true;
                } else {
                  setRefresh((prevState) => prevState + 1);
                }
              } else {
                setRefresh((prevState) => prevState + 1);
              }
              pan.current[1][0] = 10;
              pan.current[1][1] = windowHeight / 5.9;
            }
            break;
          case 2:
            if (
              pan.current[2][0] >= windowWidth / 2.35 &&
              pan.current[2][0] <= windowWidth / 1.9 &&
              pan.current[2][1] >= -3 &&
              pan.current[2][1] <= windowHeight / 20
            ) {
              found[2] = 1;
              updateShowV();
              isWrong = false;
            } else {
              if (checkMistake(2)) {
                if (isWrong === false) {
                  dispatch(activeLessonActions.updateScore(-20));
                  updateShowX();
                  isWrong = true;
                } else {
                  setRefresh((prevState) => prevState + 1);
                }
              } else {
                setRefresh((prevState) => prevState + 1);
              }
              pan.current[2][0] = 10;
              pan.current[2][1] = windowHeight / 2.6;
            }
            break;
          case 3:
            if (
              pan.current[3][0] >= windowWidth / 2.35 &&
              pan.current[3][0] <= windowWidth / 1.9 &&
              pan.current[3][1] >= windowHeight / 7.06 &&
              pan.current[3][1] <= windowHeight / 4.7
            ) {
              found[3] = 1;
              updateShowV();
              isWrong = false;
            } else {
              if (checkMistake(3)) {
                if (isWrong === false) {
                  dispatch(activeLessonActions.updateScore(-20));
                  updateShowX();
                  isWrong = true;
                } else {
                  setRefresh((prevState) => prevState + 1);
                }
              } else {
                setRefresh((prevState) => prevState + 1);
              }
              pan.current[3][0] = 10;
              pan.current[3][1] = windowHeight / 1.83;
            }
            break;
        }
        if (checkAll()) {
          setDone(true);
        }
      },
    })
  ).current;
  let pageView = (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      <V show={showV} setShow={updateShowV} />
      <X show={showX} setShow={updateShowX} />
      <Image style={styles.image} source={require("./image.png")} />
      <View style={styles.svgView}>
        <Svg height="100%" width="100%" viewBox={svgViewBox}>
          <Line
            x1="10"
            y1="10"
            x2={pan.current[0][0]}
            y2={pan.current[0][1]}
            stroke="black"
            strokeWidth="4"
          />
          <Line
            x1="10"
            y1={windowHeight / 5.9}
            x2={pan.current[1][0]}
            y2={pan.current[1][1]}
            stroke="black"
            strokeWidth="4"
          />
          <Line
            x1="10"
            y1={windowHeight / 2.6}
            x2={pan.current[2][0]}
            y2={pan.current[2][1]}
            stroke="black"
            strokeWidth="4"
          />
          <Line
            x1="10"
            y1={windowHeight / 1.83}
            x2={pan.current[3][0]}
            y2={pan.current[3][1]}
            stroke="black"
            strokeWidth="4"
          />
        </Svg>
      </View>
    </View>
  );
  if (done) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  }
  return pageView;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 100,
  },
  image: {
    height: Dimensions.get("window").height * 0.8,
    width: Dimensions.get("window").height * 0.6,
  },
  svgView: {
    position: "absolute",
    left: Dimensions.get("window").width / 6,
    top: Dimensions.get("window").height / 5.7,
    backgroundColor: "transparent",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.57,
  },
});

export default Lesson7;
