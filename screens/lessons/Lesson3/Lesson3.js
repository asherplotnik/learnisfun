import React, { useRef, useState, useEffect } from "react";
import V from "../../../components/V";
import X from "../../../components/X";
import { letters, shuffle } from "./constants";
import FinishScreen from "../../../components/FinishScreen";
import * as activeLessonActions from "../../../store/actions/activeLessonActions";
import { useDispatch } from "react-redux";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  PanResponder,
} from "react-native";
import Colors from "../../../constants/Colors";
const Lesson3 = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [showV, setShowV] = useState(false);
  const [showX, setShowX] = useState(false);
  props.navigation.setOptions({ headerTitle: "Match letters" });
  const dispatch = useDispatch();
  let isWrong = useRef(false).current;
  const found = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0]).current;
  let shuffledArr = useRef(shuffle()).current;
  [shuffledArrOutside, setShuffledArrOutside] = useState(shuffledArr);
  let faze = useRef(0).current;
  let [fazeOutside, setFazeOutside] = useState(0);
  let selected = useRef(0).current;
  let [done, setDone] = useState(false);

  useEffect(() => {
    dispatch(activeLessonActions.setActiveLesson(3, 100));
  }, []);

  const pan = [
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
    useRef(new Animated.ValueXY()).current,
  ];

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

  const Letter = (props) => {
    return (
      <Animated.View
        style={{
          ...styles.letter,
          opacity: 1 - found[props.number],
          //display: found[props.number] === 1 ? "none" : "flex",
          transform: pan[props.number].getTranslateTransform(),
        }}
      >
        <Text style={styles.letterlText}>{props.letter}</Text>
      </Animated.View>
    );
  };

  const CapitalLetter = (props) => {
    return (
      <View style={styles.capitalLetter}>
        <Text style={styles.capitalLetterlText}>{props.capital}</Text>
        <View style={styles.wrapMatch}>
          <View style={{ ...styles.match, opacity: found[props.number] }}>
            <Text style={styles.matchText}>{props.capital.toLowerCase()}</Text>
          </View>
        </View>
      </View>
    );
  };

  const checkSelectedLetter = (gestureState) => {
    if (
      gestureState.x0 > windowWidth / 10.275 &&
      gestureState.x0 < windowWidth / 4.193 &&
      gestureState.y0 > windowHeight / 1.74 &&
      gestureState.y0 < windowHeight / 1.527
    ) {
      return shuffledArrOutside[0];
    }
    if (
      gestureState.x0 > windowWidth / 2.322 &&
      gestureState.x0 < windowWidth / 1.756 &&
      gestureState.y0 > windowHeight / 1.74 &&
      gestureState.y0 < windowHeight / 1.527
    ) {
      return shuffledArrOutside[1];
    }
    if (
      gestureState.x0 > windowWidth / 1.308 &&
      gestureState.x0 < windowWidth / 1.113 &&
      gestureState.y0 > windowHeight / 1.74 &&
      gestureState.y0 < windowHeight / 1.527
    ) {
      return shuffledArrOutside[2];
    }
    if (
      gestureState.x0 > windowWidth / 10.275 &&
      gestureState.x0 < windowWidth / 4.193 &&
      gestureState.y0 > windowHeight / 1.388 &&
      gestureState.y0 < windowHeight / 1.24
    ) {
      return shuffledArrOutside[3];
    }
    if (
      gestureState.x0 > windowWidth / 2.322 &&
      gestureState.x0 < windowWidth / 1.756 &&
      gestureState.y0 > windowHeight / 1.388 &&
      gestureState.y0 < windowHeight / 1.24
    ) {
      return shuffledArr[4];
    }
    if (
      gestureState.x0 > windowWidth / 1.308 &&
      gestureState.x0 < windowWidth / 1.113 &&
      gestureState.y0 > windowHeight / 1.388 &&
      gestureState.y0 < windowHeight / 1.24
    ) {
      return shuffledArrOutside[5];
    }
    if (
      gestureState.x0 > windowWidth / 10.275 &&
      gestureState.x0 < windowWidth / 4.193 &&
      gestureState.y0 > windowHeight / 1.15 &&
      gestureState.y0 < windowHeight / 1.05
    ) {
      return shuffledArr[6];
    }
    if (
      gestureState.x0 > windowWidth / 2.322 &&
      gestureState.x0 < windowWidth / 1.756 &&
      gestureState.y0 > windowHeight / 1.15 &&
      gestureState.y0 < windowHeight / 1.05
    ) {
      return shuffledArrOutside[7];
    }
    if (
      gestureState.x0 > windowWidth / 1.308 &&
      gestureState.x0 < windowWidth / 1.113 &&
      gestureState.y0 > windowHeight / 1.15 &&
      gestureState.y0 < windowHeight / 1.05
    ) {
      return shuffledArrOutside[8];
    }
  };
  const checkFound = (x1, y1, x2, y2, gestureState) => {
    if (
      // gestureState.x0 - gestureState.dx >= x1 &&
      // gestureState.x0 - gestureState.dx <= x2 && //need to replace to moveX moveY
      // gestureState.y0 - gestureState.dy >= y1 &&
      // gestureState.y0 - gestureState.dy <= y2
      gestureState.moveX >= x1 &&
      gestureState.moveX <= x2 &&
      gestureState.moveY >= y1 &&
      gestureState.moveY <= y2
    ) {
      return true;
    } else {
      return null;
    }
  };

  const checkInBounds = (gestureState) => {
    const x = gestureState.moveX;
    const y = gestureState.moveY;
    const x1 = windowWidth / 6.421;
    const x2 = windowWidth / 3.48;
    const x3 = windowWidth / 2.1;
    const x4 = windowWidth / 1.61;
    const x5 = windowWidth / 1.23;
    const x6 = windowWidth / 1.05;
    const y1 = windowHeight / 7.265;
    const y2 = windowWidth / 3.48;
    const y3 = windowHeight / 3.47;
    const y4 = windowHeight / 2.732;
    const y5 = windowHeight / 2.31;
    const y6 = windowHeight / 1.94;
    if (
      ((x >= x1 && x <= x2) || (x >= x3 && x <= x4) || (x >= x5 && x <= x6)) &&
      ((y >= y1 && y <= y2) || (y >= y3 && y <= y4) || (y >= y5 && y <= y6))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        selected = checkSelectedLetter(gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (selected >= 0 && selected <= 8) {
          return Animated.event(
            [null, { dx: pan[selected].x, dy: pan[selected].y }],
            {
              useNativeDriver: false,
            }
          )(evt, gestureState);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        let caseFound = null;
        switch (selected) {
          case 0:
            caseFound = checkFound(
              windowWidth / 6.421,
              windowHeight / 7.265,
              windowWidth / 3.48,
              windowHeight / 4.493,
              gestureState
            );
            break;
          case 1:
            caseFound = checkFound(
              windowWidth / 2.1,
              windowHeight / 7.265,
              windowWidth / 1.61,
              windowHeight / 4.493,
              gestureState
            );
            break;
          case 2:
            caseFound = checkFound(
              windowWidth / 1.23,
              windowHeight / 7.265,
              windowWidth / 1.05,
              windowHeight / 4.493,
              gestureState
            );
            break;
          case 3:
            caseFound = checkFound(
              windowWidth / 6.421,
              windowHeight / 3.47,
              windowWidth / 3.48,
              windowHeight / 2.732,
              gestureState
            );
            break;
          case 4:
            caseFound = checkFound(
              windowHeight / 7.265,
              windowHeight / 3.47,
              windowWidth / 1.61,
              windowHeight / 2.732,
              gestureState
            );
            break;
          case 5:
            caseFound = checkFound(
              windowWidth / 1.23,
              windowHeight / 3.47,
              windowWidth / 1.05,
              windowHeight / 2.732,
              gestureState
            );
            break;
          case 6:
            caseFound = checkFound(
              windowWidth / 6.421,
              windowHeight / 2.31,
              windowWidth / 3.48,
              windowHeight / 1.94,
              gestureState
            );
            break;
          case 7:
            caseFound = checkFound(
              windowWidth / 2.1,
              windowHeight / 2.31,
              windowWidth / 1.61,
              windowHeight / 1.94,
              gestureState
            );
            break;
          case 8:
            caseFound = checkFound(
              windowWidth / 1.23,
              windowHeight / 2.31,
              windowWidth / 1.05,
              windowHeight / 1.94,
              gestureState
            );
            break;
          default:
            return;
        }
        if (caseFound) {
          setShowV(true);
          found[selected] = 1;
          isWrong = false;
        } else {
          if (checkInBounds(gestureState)) {
            setShowX(true);
            if (isWrong === false) {
              dispatch(activeLessonActions.updateScore(-4));
              isWrong = true;
            }
          }
        }
        if (selected >= 0 && selected <= 8) {
          pan[selected].flattenOffset();
          pan[selected].setValue({ x: 0, y: 0 });
          if (checkAll()) {
            if (faze < 2) {
              faze = faze + 1;
              shuffledArr = shuffle();
              setShuffledArrOutside(shuffledArr);
              setFazeOutside(faze);
              for (let i = 0; i < found.length; i++) {
                found[i] = 0;
              }
              if (faze === 2) {
                found[8] = 1;
              }
            } else {
              setDone(true);
            }
          }
        }
      },
    })
  ).current;

  let pageView = (
    <View style={styles.container}>
      <V show={showV} setShow={updateShowV} />
      <X show={showX} setShow={updateShowX} />
      <View style={styles.groupA}>
        <View style={styles.row}>
          <CapitalLetter
            capital={letters[fazeOutside][0].toUpperCase()}
            number={0}
          />
          <CapitalLetter
            capital={letters[fazeOutside][1].toUpperCase()}
            number={1}
          />
          <CapitalLetter
            capital={letters[fazeOutside][2].toUpperCase()}
            number={2}
          />
        </View>
        <View style={styles.row}>
          <CapitalLetter
            capital={letters[fazeOutside][3].toUpperCase()}
            number={3}
          />
          <CapitalLetter
            capital={letters[fazeOutside][4].toUpperCase()}
            number={4}
          />
          <CapitalLetter
            capital={letters[fazeOutside][5].toUpperCase()}
            number={5}
          />
        </View>
        <View style={styles.row}>
          <CapitalLetter
            capital={letters[fazeOutside][6].toUpperCase()}
            number={6}
          />
          <CapitalLetter
            capital={letters[fazeOutside][7].toUpperCase()}
            number={7}
          />
          <CapitalLetter
            capital={letters[fazeOutside][8].toUpperCase()}
            number={8}
          />
        </View>
      </View>
      <View style={styles.groupB} {...panResponder.panHandlers}>
        <View style={styles.row}>
          <Letter
            number={shuffledArrOutside[0]}
            letter={letters[fazeOutside][shuffledArrOutside[0]]}
          />
          <Letter
            number={shuffledArrOutside[1]}
            letter={letters[fazeOutside][shuffledArrOutside[1]]}
          />
          <Letter
            number={shuffledArrOutside[2]}
            letter={letters[fazeOutside][shuffledArrOutside[2]]}
          />
        </View>
        <View style={styles.row}>
          <Letter
            number={shuffledArrOutside[3]}
            letter={letters[fazeOutside][shuffledArrOutside[3]]}
          />
          <Letter
            number={shuffledArrOutside[4]}
            letter={letters[fazeOutside][shuffledArrOutside[4]]}
          />
          <Letter
            number={shuffledArrOutside[5]}
            letter={letters[fazeOutside][shuffledArrOutside[5]]}
          />
        </View>
        <View style={styles.row}>
          <Letter
            number={shuffledArrOutside[6]}
            letter={letters[fazeOutside][shuffledArrOutside[6]]}
          />
          <Letter
            number={shuffledArrOutside[7]}
            letter={letters[fazeOutside][shuffledArrOutside[7]]}
          />
          <Letter
            number={shuffledArrOutside[8]}
            letter={letters[fazeOutside][shuffledArrOutside[8]]}
          />
        </View>
      </View>
    </View>
  );
  if (done) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  }
  return pageView;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  groupA: {
    flex: 1,
  },
  groupB: {
    flex: 1,
    zIndex: 100,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  capitalLetter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: Dimensions.get("window").width / 6,
    margin: 10,
  },
  wrapMatch: {
    borderColor: Colors.buttonColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  match: {
    width: Dimensions.get("window").width / 7,
    height: Dimensions.get("window").width / 7,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.buttonColor,
  },
  matchText: {
    fontFamily: "kurri-island",
    fontSize: 20,
  },
  capitalLetterlText: {
    fontFamily: "kurri-island",
    fontSize: 20,
    width: Dimensions.get("window").width / 9,
    textAlign: "center",
  },
  letterlText: {
    fontFamily: "kurri-island",
    fontSize: 20,
  },
  letter: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.buttonColor,
    width: Dimensions.get("window").width / 7,
    height: Dimensions.get("window").width / 7,
    margin: 10,
    borderRadius: 5,
  },
});

export default Lesson3;
