import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import * as activeLessonActions from "../../../store/actions/activeLessonActions";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle, Rect, G, Image } from "react-native-svg";
import CustomModal from "../../../components/CustomModal";
import { Audio } from "expo-av";
import Colors from "../../../constants/Colors";
import { colors, grid, audioMessages } from "./constants";
import FinishScreen from "../../../components/FinishScreen";
const Lesson6 = (props) => {
  let currentInside = useRef(0);

  const otherDispatch = useDispatch();
  let soundObject = new Audio.Sound();
  let imageGrid = useRef(grid);
  const colorViewWidth = Dimensions.get("window").width / 6;
  const svgViewBox = `0 0 ${colorViewWidth * 5} ${
    Dimensions.get("window").height - 80
  }`;
  const colorTouched = useRef(null);
  const [finish, setFinish] = useState(false);
  const [svgElementArray, setSvgElementArray] = useState([]);
  const [colorAnim, setColorAnim] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [toggleNextScreen, setToggleNextScreen] = useState(false);
  let isWrong = useRef(false);
  const countGridBlock = useRef(0);
  const finishScreenHandler = () => {
    console.log("DONE");
    setFinish(true);
  };
  const updateShowMessage = (bool) => {
    setShowMessage(bool);
  };
  const backToLessons = () => {
    props.navigation.navigate("lessons");
  };

  const playAudio = async (link) => {
    try {
      await soundObject.loadAsync(link);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const initialize = useCallback(() => {
    colorTouched.current = null;
    isWrong.current = false;
    setSvgElementArray([]);
    countGridBlock.current = 0;
    updateShowMessage(true);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 24; j++) {
        imageGrid.current[i][j].u = 0;
        imageGrid.current[i][j].v = 0;
      }
    }
    for (let i = 0; i < colors[0].grid.length; i++) {
      let [a, b] = colors[0].grid[i];
      imageGrid.current[a][b].u = 1;
    }
    playAudio(require("./hat.mp3"));
  }, [imageGrid, currentInside.current]);

  const nextItem = (item) => {
    playAudio(audioMessages[item]);
    colorTouched.current = null;
    isWrong.current = false;
    setSvgElementArray([]);
    countGridBlock.current = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 24; j++) {
        imageGrid.current[i][j].u = 0;
        imageGrid.current[i][j].v = 0;
      }
    }
    for (let i = 0; i < colors[item].grid.length; i++) {
      let [a, b] = colors[item].grid[i];
      imageGrid.current[a][b].u = 1;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        addCircle(
          gestureState.x0 - colorViewWidth,
          gestureState.y0 - 80,
          colorTouched.current
        );
        updateGrid(gestureState.x0 - colorViewWidth, gestureState.y0 - 80);
      },
      onPanResponderMove: (evt, gestureState) => {
        addCircle(
          gestureState.moveX - colorViewWidth,
          gestureState.moveY - 80,
          colorTouched.current
        );
        updateGrid(
          gestureState.moveX - colorViewWidth,
          gestureState.moveY - 80
        );
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const addCircle = (x1, y1, color) => {
    setSvgElementArray((prevState) =>
      prevState.concat(
        <Circle r="55" fill={color} cx={x1} cy={y1} key={x1 * Math.random()} />
      )
    );
  };

  const updateGrid = (x, y) => {
    if (colorTouched.current === null) {
      setShowMessage(true);
      setColorAnim(true);
      return;
    }
    const gridBlockSize = styles.image.width / 10;
    const gridX = Math.ceil(x / gridBlockSize) - 1;
    const gridY = Math.ceil(y / gridBlockSize) - 1;
    if (colorTouched.current !== null) {
      if (gridX >= 0 && gridX <= 9 && gridY >= 0 && gridY <= 23) {
        if (
          imageGrid.current[gridX][gridY].u === 1 &&
          imageGrid.current[gridX][gridY].v === 0
        ) {
          imageGrid.current[gridX][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX + 1 >= 0 && gridX + 1 <= 9 && gridY >= 0 && gridY <= 23) {
        if (
          imageGrid.current[gridX + 1][gridY].u === 1 &&
          imageGrid.current[gridX + 1][gridY].v === 0
        ) {
          imageGrid.current[gridX + 1][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX - 1 >= 0 && gridX - 1 <= 9 && gridY >= 0 && gridY <= 23) {
        if (
          imageGrid.current[gridX - 1][gridY].u === 1 &&
          imageGrid.current[gridX - 1][gridY].v === 0
        ) {
          imageGrid.current[gridX - 1][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX >= 0 && gridX <= 9 && gridY + 1 >= 0 && gridY + 1 <= 23) {
        if (
          imageGrid.current[gridX][gridY + 1].u === 1 &&
          imageGrid.current[gridX][gridY + 1].v === 0
        ) {
          imageGrid.current[gridX][gridY + 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX >= 0 && gridX <= 9 && gridY - 1 >= 0 && gridY - 1 <= 23) {
        if (
          imageGrid.current[gridX][gridY - 1].u === 1 &&
          imageGrid.current[gridX][gridY - 1].v === 0
        ) {
          imageGrid.current[gridX][gridY - 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (
        gridX - 1 >= 0 &&
        gridX - 1 <= 9 &&
        gridY - 1 >= 0 &&
        gridY - 1 <= 23
      ) {
        if (
          imageGrid.current[gridX - 1][gridY - 1].u === 1 &&
          imageGrid.current[gridX - 1][gridY - 1].v === 0
        ) {
          imageGrid.current[gridX - 1][gridY - 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (
        gridX - 1 >= 0 &&
        gridX - 1 <= 9 &&
        gridY + 1 >= 0 &&
        gridY + 1 <= 23
      ) {
        if (
          imageGrid.current[gridX - 1][gridY + 1].u === 1 &&
          imageGrid.current[gridX - 1][gridY + 1].v === 0
        ) {
          imageGrid.current[gridX - 1][gridY + 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (
        gridX + 1 >= 0 &&
        gridX + 1 <= 9 &&
        gridY + 1 >= 0 &&
        gridY + 1 <= 23
      ) {
        if (
          imageGrid.current[gridX + 1][gridY + 1].u === 1 &&
          imageGrid.current[gridX + 1][gridY + 1].v === 0
        ) {
          imageGrid.current[gridX + 1][gridY + 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (
        gridX + 1 >= 0 &&
        gridX + 1 <= 9 &&
        gridY - 1 >= 0 &&
        gridY - 1 <= 23
      ) {
        if (
          imageGrid.current[gridX + 1][gridY - 1].u === 1 &&
          imageGrid.current[gridX + 1][gridY - 1].v === 0
        ) {
          imageGrid.current[gridX + 1][gridY - 1].v = 1;
          countGridBlock.current++;
        }
      }
    }
    if (
      colors[currentInside.current].grid.length - countGridBlock.current <=
      3
    ) {
      if (currentInside.current < 3) {
        currentInside.current = currentInside.current + 1;
        updateShowMessage(true);
        nextItem(currentInside.current);
      } else {
        setTimeout(() => {
          finishScreenHandler();
        }, 1000);
      }
    }
  };

  const BuildGridHelper = () => {
    const gridBlockSize = styles.image.width / 10;
    let gridArr = [];
    const Block = (props) => {
      let fillColor = null;
      if (imageGrid.current[props.i][props.j].v === 1) {
        fillColor = "rgba(255,0,0,0.5)";
      }
      return (
        <Rect
          x={props.i * gridBlockSize}
          y={props.j * gridBlockSize}
          width={gridBlockSize}
          height={gridBlockSize}
          strokeWidth="1"
          stroke="rgb(0,0,0)"
          fill={fillColor}
        />
      );
    };
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 24; j++) {
        gridArr = gridArr.concat(
          <Block key={i.toString() + j.toString()} i={i} j={j} />
        );
      }
    }
    return <G>{gridArr}</G>;
  };

  const setColor = (color) => {
    soundObject.unloadAsync();
    colorTouched.current = color;
    setSvgElementArray([]);
    countGridBlock.current = 0;
    if (color !== colors[+currentInside.current].color) {
      colorTouched.current = null;
      if (isWrong.current === false) {
        // first time  mistake
        otherDispatch(activeLessonActions.updateScore(-6));
        isWrong.current = true;
      }
      playAudio(audioMessages[currentInside.current]);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    otherDispatch(activeLessonActions.setActiveLesson(6, 100));
    initialize();
  }, []);
  props.navigation.setOptions({
    headerTitle: "Color the clothes",
  });
  let pageView = (
    <View style={styles.wrapper}>
      <CustomModal
        close={() => setShowMessage(false)}
        show={showMessage}
        textColor={Colors.tint}
        background="white"
      >
        {"Color the " +
          colors[currentInside.current].name +
          " with " +
          colors[currentInside.current].color +
          " color"}
      </CustomModal>
      <ColorView
        setColor={setColor}
        fade={colorAnim}
        setColorAnim={setColorAnim}
      />
      <View
        onLayout={(event) => {
          let { x, y, width, height } = event.nativeEvent.layout;
        }}
        style={styles.svgView}
        {...panResponder.panHandlers}
      >
        <Svg height="100%" width="100%" viewBox={svgViewBox}>
          {svgElementArray}
          <Rect
            x={(colorViewWidth * 5 - styles.image.width) / 2}
            y="0"
            width={styles.image.width}
            height={styles.image.height / 5}
            fill={currentInside.current === 0 ? "transparent" : "red"}
          />
          <Rect
            x={(colorViewWidth * 5 - styles.image.width) / 2}
            y={styles.image.height / 2.8}
            width={styles.image.width}
            height={styles.image.height / 3.75}
            fill={
              currentInside.current < 1
                ? "rgb(240,240,240)"
                : currentInside.current === 1
                ? "transparent"
                : "white"
            }
          />
          <Rect
            x={(colorViewWidth * 5 - styles.image.width) / 2}
            y={styles.image.height / 1.6}
            width={styles.image.width}
            height={styles.image.height / 5}
            fill={
              currentInside.current < 2
                ? "rgb(240,240,240)"
                : currentInside.current === 2
                ? "transparent"
                : "brown"
            }
          />
          <Rect
            x={(colorViewWidth * 5 - styles.image.width) / 2}
            y={styles.image.height / 1.2}
            width={styles.image.width}
            height={styles.image.height / 7}
            fill={
              currentInside.current < 3
                ? "rgb(240,240,240)"
                : currentInside.current === 3
                ? "transparent"
                : "black"
            }
          />
          <Image
            x={(colorViewWidth * 5 - styles.image.width) / 2}
            y="0"
            width={styles.image.width}
            height={styles.image.height}
            preserveAspectRatio="xMidYMid slice"
            opacity="1"
            href={require("./boy.png")}
          />
          <Rect
            x="0"
            y="0"
            width={(colorViewWidth * 5 - styles.image.width) / 2}
            height={styles.image.height}
            fill="rgb(240,240,240)"
          />
          <Rect
            x={
              (colorViewWidth * 5 - styles.image.width) / 2 + styles.image.width
            }
            y="0"
            width={(colorViewWidth * 5 - styles.image.width) / 2}
            height={styles.image.height}
            fill="rgb(240,240,240)"
          />

          {/* <BuildGridHelper /> */}
        </Svg>
      </View>
    </View>
  );
  if (finish) {
    pageView = <FinishScreen backToLessons={backToLessons} />;
  }
  return pageView;
};

const colorWidth = Dimensions.get("window").width / 8;
const colorHeight = Dimensions.get("window").height / 14;

const styles = StyleSheet.create({
  touch: {
    position: "absolute",
    top: Dimensions.get("window").height / 1.5,
    left: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "kurri-island",
  },
  buttonView: {
    flexDirection: "row",
    width: "100%",
    height: colorWidth,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  button: {
    width: "40%",
    height: "100%",
    backgroundColor: Colors.buttonColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: Dimensions.get("window").height * 0.36,
    height: Dimensions.get("window").height - 80,
  },
  modalWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    width: "70%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  svgTouch: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(240,240,240)",
    zIndex: 100,
  },
  svgView: {
    flex: 5,
    backgroundColor: "rgb(240,240,240)",
    zIndex: 100,
  },
  colorsView: {
    flex: 1,
    zIndex: 100,
  },
  brownColor: {
    backgroundColor: "brown",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  blueColor: {
    backgroundColor: "blue",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  greenColor: {
    backgroundColor: "green",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  redColor: {
    backgroundColor: "red",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  orangeColor: {
    backgroundColor: "orange",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  whiteColor: {
    backgroundColor: "white",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  pinkColor: {
    backgroundColor: "pink",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
  blackColor: {
    backgroundColor: "black",
    height: colorHeight,
    width: "73%",
    margin: 10,
    borderRadius: colorWidth / 2,
  },
});

const ColorView = (props) => {
  const { setColor } = props;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (props.fade === true) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(props.setColorAnim(false));
    }
  }, [props.fade]);
  return useMemo(() => {
    return (
      <Animated.View style={{ ...styles.colorsView, opacity: fadeAnim }}>
        <TouchableOpacity
          style={styles.blueColor}
          onPress={() => {
            setColor("blue");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.brownColor}
          onPress={() => {
            setColor("brown");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.greenColor}
          onPress={() => {
            setColor("green");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.redColor}
          onPress={() => {
            setColor("red");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.orangeColor}
          onPress={() => {
            setColor("orange");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteColor}
          onPress={() => {
            setColor("white");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.pinkColor}
          onPress={() => {
            setColor("pink");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.blackColor}
          onPress={() => {
            setColor("black");
          }}
        ></TouchableOpacity>
      </Animated.View>
    );
  }, []);
};

export default Lesson6;
