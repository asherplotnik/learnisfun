import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Easing,
  PanResponder,
  Alert,
  TouchableOpacity,
} from "react-native";
const Lesson2 = (props) => {
  props.navigation.setOptions({ headerTitle: "Match faces" });
  const initialPosition = useRef({ x: 0, y: 0 }).current;
  const showMoveFace = useRef(new Animated.ValueXY()).current;
  const showMoveHand = useRef(new Animated.ValueXY()).current;
  const showRemove = useRef(new Animated.Value(1)).current;
  const showRotateHand = useRef(new Animated.Value(0)).current;
  const apearFace = useRef(new Animated.Value(0)).current;
  const [animFinished, setAnimFinished] = useState(false);
  const [mood, setMood] = useState("sad");
  let correctAnswer = useRef(false).current;
  let isPositioned = useRef();
  let verticalAjuster = useRef(0).current;
  const interphand = showRotateHand.interpolate({
    inputRange: [0, 80],
    outputRange: ["0deg", "80deg"],
  });

  const screenHeight = Dimensions.get("window").height;
  const verticalRatio = (screenHeight / 1.064 - screenHeight / 7.19) / 5;
  const imageWidth = Dimensions.get("window").width / 4;

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log(gestureState.y0, screenHeight);
        switch (mood) {
          case "happy":
            if (gestureState.y0 <= screenHeight / 3.4) {
              correctAnswer = true;
              verticalAjuster = 0;
              break;
            } else {
              correctAnswer = false;
              Alert.alert("Wrong answer.", "Look for happy face.");
              return;
            }
          case "scared":
            if (
              gestureState.y0 <= screenHeight / 2.16 &&
              gestureState.y0 > screenHeight / 3.4
            ) {
              correctAnswer = true;
              verticalAjuster = verticalRatio * 1;
              break;
            } else {
              correctAnswer = false;
              Alert.alert("Wrong answer.", "Look for scared face.");
              return;
            }
          case "angry":
            if (
              gestureState.y0 <= screenHeight / 1.62 &&
              gestureState.y0 > screenHeight / 2.15
            ) {
              correctAnswer = true;
              verticalAjuster = verticalRatio * 2;
              break;
            } else {
              correctAnswer = false;
              Alert.alert("Wrong answer.", "Look for angry face.");
              return;
            }
          case "sleepy":
            if (
              gestureState.y0 <= screenHeight / 1.28 &&
              gestureState.y0 > screenHeight / 1.58
            ) {
              correctAnswer = true;
              verticalAjuster = verticalRatio * 3;
              break;
            } else {
              correctAnswer = false;
              Alert.alert("Wrong answer.", "Look for sleepy face.");
              return;
            }
          case "sad":
            if (
              gestureState.y0 <= screenHeight / 1.06 &&
              gestureState.y0 > screenHeight / 1.28
            ) {
              correctAnswer = true;
              verticalAjuster = verticalRatio * 4;
              break;
            } else {
              correctAnswer = false;
              Alert.alert("Wrong answer.", "Look for sad face.");
              return;
            }
          default:
            correctAnswer = false;
            Alert.alert("wrong answer.");
            return;
        }
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!correctAnswer) {
          return;
        }
        if (
          pan.x._value >= +imageWidth * 2.1 &&
          pan.x._value <= +imageWidth * 2.3 &&
          pan.y._value + initialPosition.y >=
            screenHeight / 3 - verticalAjuster &&
          pan.y._value + initialPosition.y <=
            screenHeight / 2.85 - verticalAjuster
        ) {
          console.log("true");
          isPositioned.current = true;
        } else {
          isPositioned.current = false;
        }

        return Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(showMoveHand, {
        toValue: { x: -imageWidth * 1.4, y: -screenHeight * 0.5 },
        delay: 1500,
        duration: 1200,
        easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
        useNativeDriver: false,
      }),
      Animated.timing(showRotateHand, {
        toValue: 30,
        delay: 0,
        duration: 250,
        easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(showMoveHand, {
          toValue: { x: 0, y: -screenHeight * 0.42 },
          delay: 80,
          duration: 800,
          easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
          useNativeDriver: false,
        }),
        Animated.timing(showMoveFace, {
          toValue: { x: imageWidth * 1.35, y: screenHeight / 17 },
          delay: 80,
          duration: 800,
          easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
          useNativeDriver: false,
        }),
      ]),

      Animated.timing(showRemove, {
        toValue: 0,
        delay: 2000,
        duration: 500,
        easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
        useNativeDriver: false,
      }),
    ]).start(() => {
      setAnimFinished(true);
      Animated.timing(apearFace, {
        toValue: 1,
        delay: 200,
        duration: 2000,
        easing: Easing.bezier(0.73, 0.93, 0.41, 0.9),
        useNativeDriver: false,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* absolute position */}
      <Animated.View
        style={{
          ...styles.showHead,
          opacity: showRemove,
          display: animFinished ? "none" : "flex",
        }}
      >
        <Image style={styles.faceImage} source={require("./girl1.png")} />
        <View style={styles.textView}>
          <Text style={styles.text}>Bored</Text>
        </View>
      </Animated.View>
      <Animated.Image
        style={{
          ...styles.showImage,
          transform: showMoveFace.getTranslateTransform(),
          opacity: showRemove,
          display: animFinished ? "none" : "flex",
        }}
        source={require("./bored.png")}
      />
      <Animated.Image
        style={{
          ...styles.showHand,
          transform: [
            { translateY: showMoveHand.y },
            { translateX: showMoveHand.x },
            {
              rotateX: interphand,
            },
          ],
          opacity: showRemove,
          display: animFinished ? "none" : "flex",
        }}
        source={require("./hand.png")}
      />
      <View style={styles.rowImage} {...panResponder.panHandlers}>
        <Animated.Image
          style={{
            transform: mood === "happy" ? pan.getTranslateTransform() : [],
            ...styles.image,
            zIndex: 110,
          }}
          source={require("./happy.png")}
        />
        <Animated.Image
          style={{
            transform: mood === "scared" ? pan.getTranslateTransform() : [],
            ...styles.image,
            zIndex: 120,
          }}
          source={require("./scared.png")}
        />

        <Animated.Image
          style={{
            transform: mood === "angry" ? pan.getTranslateTransform() : [],
            ...styles.image,
            zIndex: 130,
          }}
          source={require("./angry.png")}
        />
        <Animated.Image
          style={{
            transform: mood === "sleepy" ? pan.getTranslateTransform() : [],
            ...styles.image,
            zIndex: 140,
          }}
          source={require("./sleepy.png")}
        />
        <Animated.Image
          style={{
            transform: mood === "sad" ? pan.getTranslateTransform() : [],
            ...styles.image,
            zIndex: 160,
          }}
          source={require("./sad.png")}
        />
      </View>
      <Animated.View style={{ ...styles.headView, opacity: apearFace }}>
        <View style={styles.textView}>
          <Image style={styles.matchImage} source={require("./boy1.png")} />
          <Text style={styles.text}>{mood}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const imageWidth = Dimensions.get("window").width / 4;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "kurri-island",
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    // borderWidth: 1,
    // borderColor: "black",
  },
  faceImage: {
    width: imageWidth * 1.5,
    height: imageWidth * 1.5,
  },
  matchImage: {
    width: imageWidth * 1.5,
    height: imageWidth * 1.5,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowImage: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: imageWidth / 3,
  },
  headView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  showHead: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: imageWidth / 3,
    position: "absolute",
    top: imageWidth / 10,
    left: imageWidth * 3.2 - imageWidth / 1.47,
    zIndex: 90,
  },
  showImage: {
    width: imageWidth * 1.3,
    height: imageWidth * 1.3,
    position: "absolute",
    top: imageWidth / 10,
    left: imageWidth,
    zIndex: 90,
  },
  showHand: {
    width: imageWidth * 1,
    height: imageWidth * 1,
    position: "absolute",
    top: imageWidth * 4,
    left: imageWidth * 3,
    zIndex: 100,
  },
});

export default Lesson2;
