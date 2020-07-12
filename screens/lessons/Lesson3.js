import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  PanResponder,
  NativeEventEmitter,
} from "react-native";
import Colors from "../../constants/Colors";
const Lesson3 = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  props.navigation.setOptions({ headerTitle: "Match letters" });
  const [found, setFound] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let selected = useRef(null).current;
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

  const Letter = (props) => {
    return (
      <Animated.View
        style={{
          ...styles.letter,
          opacity: 1 - found[props.number],
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
            <Text style={styles.matchText}>{props.letter}</Text>
          </View>
        </View>
      </View>
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (
          gestureState.x0 > windowWidth / 10.275 &&
          gestureState.x0 < windowWidth / 4.193 &&
          gestureState.y0 > windowHeight / 1.74 &&
          gestureState.y0 < windowHeight / 1.527
        ) {
          selected = 7;
        }
        if (
          gestureState.x0 > windowWidth / 2.322 &&
          gestureState.x0 < windowWidth / 1.756 &&
          gestureState.y0 > windowHeight / 1.74 &&
          gestureState.y0 < windowHeight / 1.527
        ) {
          selected = 6;
        }
        if (
          gestureState.x0 > windowWidth / 1.308 &&
          gestureState.x0 < windowWidth / 1.113 &&
          gestureState.y0 > windowHeight / 1.74 &&
          gestureState.y0 < windowHeight / 1.527
        ) {
          selected = 8;
        }
        if (
          gestureState.x0 > windowWidth / 10.275 &&
          gestureState.x0 < windowWidth / 4.193 &&
          gestureState.y0 > windowHeight / 1.388 &&
          gestureState.y0 < windowHeight / 1.24
        ) {
          selected = 0;
        }
        if (
          gestureState.x0 > windowWidth / 2.322 &&
          gestureState.x0 < windowWidth / 1.756 &&
          gestureState.y0 > windowHeight / 1.388 &&
          gestureState.y0 < windowHeight / 1.24
        ) {
          selected = 2;
        }
        if (
          gestureState.x0 > windowWidth / 1.308 &&
          gestureState.x0 < windowWidth / 1.113 &&
          gestureState.y0 > windowHeight / 1.388 &&
          gestureState.y0 < windowHeight / 1.24
        ) {
          selected = 3;
        }
        if (
          gestureState.x0 > windowWidth / 10.275 &&
          gestureState.x0 < windowWidth / 4.193 &&
          gestureState.y0 > windowHeight / 1.14 &&
          gestureState.y0 < windowHeight / 1.05
        ) {
          selected = 5;
        }
        if (
          gestureState.x0 > windowWidth / 2.322 &&
          gestureState.x0 < windowWidth / 1.756 &&
          gestureState.y0 > windowHeight / 1.14 &&
          gestureState.y0 < windowHeight / 1.05
        ) {
          selected = 4;
        }
        if (
          gestureState.x0 > windowWidth / 1.308 &&
          gestureState.x0 < windowWidth / 1.113 &&
          gestureState.y0 > windowHeight / 1.14 &&
          gestureState.y0 < windowHeight / 1.05
        ) {
          selected = 1;
        }

        pan[selected].setOffset({
          x: pan[selected].x._value,
          y: pan[selected].y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        return Animated.event(
          [null, { dx: pan[selected].x, dy: pan[selected].y }],
          {
            useNativeDriver: false,
          }
        )(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log(pan[selected].x._value, pan[selected].y._value);
        pan[selected].flattenOffset();
        pan[selected].setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.groupA}>
        <View style={styles.row}>
          <CapitalLetter capital="A" letter="a" number={0} />
          <CapitalLetter capital="B" letter="b" number={1} />
          <CapitalLetter capital="C" letter="c" number={2} />
        </View>
        <View style={styles.row}>
          <CapitalLetter capital="D" letter="d" number={3} />
          <CapitalLetter capital="E" letter="e" number={4} />
          <CapitalLetter capital="F" letter="f" number={5} />
        </View>
        <View style={styles.row}>
          <CapitalLetter capital="G" letter="g" number={6} />
          <CapitalLetter capital="H" letter="h" number={7} />
          <CapitalLetter capital="I" letter="i" number={8} />
        </View>
      </View>
      <View style={styles.groupB} {...panResponder.panHandlers}>
        <View style={styles.row}>
          <Letter number={7} letter="h" />
          <Letter number={6} letter="g" />
          <Letter number={8} letter="i" />
        </View>
        <View style={styles.row}>
          <Letter number={0} letter="a" />
          <Letter number={2} letter="c" />
          <Letter number={3} letter="d" />
        </View>
        <View style={styles.row}>
          <Letter number={5} letter="f" />
          <Letter number={4} letter="e" />
          <Letter number={1} letter="b" />
        </View>
      </View>
    </View>
  );
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
