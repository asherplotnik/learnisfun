import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
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
import { grid, animalColors, audioMessages } from "./constants";
import Svg, { Circle, Rect, G, Image } from "react-native-svg";
import CustomModal from "../../../components/CustomModal";
import { Audio } from "expo-av";
import Colors from "../../../constants/Colors";
const Lesson1ChooseColor = (props) => {
  const otherDispatch = useDispatch();
  const soundObject = new Audio.Sound();
  const currentScreen = props.route.params.animal;
  let imageGrid = useRef(grid);
  const colorWidth = Dimensions.get("window").width / 8;
  const colorViewWidth = Dimensions.get("window").width / 6;
  const svgViewBox = `0 0 ${(Dimensions.get("window").width / 6) * 5} ${
    (Dimensions.get("window").width / 6) * 5 * 0.9
  }`;
  const colorTouched = useRef(null);
  const [svgElementArray, setSvgElementArray] = useState([]);
  const [colorAnim, setColorAnim] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [toggleNextScreen, setToggleNextScreen] = useState(false);
  let isWrong = useRef(false);
  const countGridBlock = useRef(0);
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const nextScreenHandler = () => {
    props.navigation.navigate("Lesson1ChooseAnimal", {
      nextAnimal: currentScreen + 1,
    });
  };

  const toggleButtonOpacity = () => {
    setToggleNextScreen(true);
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const playAudio = async () => {
    try {
      await soundObject.loadAsync(audioMessages[currentScreen]);
      await soundObject.playAsync();
    } catch (error) {}
  };

  const initializeAnimal = useCallback(() => {
    colorTouched.current = null;
    isWrong.current = false;
    setSvgElementArray([]);
    countGridBlock.current = 0;
    setShowMessage(true);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        imageGrid.current[i][j].u = 0;
        imageGrid.current[i][j].v = 0;
      }
    }
    for (let i = 0; i < animalColors[currentScreen].grid.length; i++) {
      let [a, b] = animalColors[currentScreen].grid[i];
      imageGrid.current[a][b].u = 1;
    }
  }, [imageGrid]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        addCircle(
          gestureState.x0 - colorViewWidth,
          gestureState.y0 - styles.image.width / 2 - 40,
          colorTouched.current
        );
        updateGrid(
          gestureState.x0 - colorViewWidth,
          gestureState.y0 - styles.image.width / 2 - 40
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        addCircle(
          gestureState.moveX - colorViewWidth,
          gestureState.moveY - styles.image.width / 2 - 40,
          colorTouched.current
        );
        updateGrid(
          gestureState.moveX - colorViewWidth,
          gestureState.moveY - styles.image.width / 2 - 40
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
      // setShowMessage(true);
      setColorAnim(true);
      return;
    }
    const gridBlockSize = styles.image.width / 10;
    const gridX = Math.ceil(x / gridBlockSize) - 1;
    const gridY = Math.ceil(y / gridBlockSize) - 1;
    if (colorTouched.current !== null) {
      if (gridX >= 0 && gridX <= 9 && gridY >= 0 && gridY <= 9) {
        if (
          imageGrid.current[gridX][gridY].u === 1 &&
          imageGrid.current[gridX][gridY].v === 0
        ) {
          imageGrid.current[gridX][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX + 1 >= 0 && gridX + 1 <= 9 && gridY >= 0 && gridY <= 9) {
        if (
          imageGrid.current[gridX + 1][gridY].u === 1 &&
          imageGrid.current[gridX + 1][gridY].v === 0
        ) {
          imageGrid.current[gridX + 1][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX - 1 >= 0 && gridX - 1 <= 9 && gridY >= 0 && gridY <= 9) {
        if (
          imageGrid.current[gridX - 1][gridY].u === 1 &&
          imageGrid.current[gridX - 1][gridY].v === 0
        ) {
          imageGrid.current[gridX - 1][gridY].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX >= 0 && gridX <= 9 && gridY + 1 >= 0 && gridY + 1 <= 9) {
        if (
          imageGrid.current[gridX][gridY + 1].u === 1 &&
          imageGrid.current[gridX][gridY + 1].v === 0
        ) {
          imageGrid.current[gridX][gridY + 1].v = 1;
          countGridBlock.current++;
        }
      }
      if (gridX >= 0 && gridX <= 9 && gridY - 1 >= 0 && gridY - 1 <= 9) {
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
        gridY - 1 <= 9
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
        gridY + 1 <= 9
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
        gridY + 1 <= 9
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
        gridY - 1 <= 9
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
    // console.log(animalColors[currentScreen].grid.length, countGridBlock.current);
    if (animalColors[currentScreen].grid.length - countGridBlock.current <= 3) {
      toggleButtonOpacity();
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
      for (let j = 0; j < 10; j++) {
        gridArr = gridArr.concat(
          <Block key={i.toString() + j.toString()} i={i} j={j} />
        );
      }
    }
    return <G>{gridArr}</G>;
  };

  const setColor = (color) => {
    colorTouched.current = color;
    setSvgElementArray([]);
    countGridBlock.current = 0;
    if (color !== animalColors[currentScreen].color) {
      colorTouched.current = null;
      if (isWrong.current === false) {
        // first time  mistake
        otherDispatch(activeLessonActions.updateScore(-6));
        isWrong.current = true;
      }
      playAudio();
      setShowMessage(true);
    }
  };

  useEffect(initializeAnimal, []);
  props.navigation.setOptions({
    headerTitle: "Color the animals",
  });

  return (
    <View style={styles.wrapper}>
      <CustomModal
        close={() => setShowMessage(false)}
        show={showMessage}
        textColor={Colors.tint}
        background="white"
      >
        {"Color the " +
          animalColors[currentScreen].animal +
          " with " +
          animalColors[currentScreen].color +
          " color"}
      </CustomModal>
      <ColorView
        setColor={setColor}
        fade={colorAnim}
        setColorAnim={setColorAnim}
      />
      <View style={styles.svgView} {...panResponder.panHandlers}>
        <Svg height="90%" width="100%" viewBox={svgViewBox}>
          {svgElementArray}
          <Image
            x="0"
            y="0"
            width={styles.image.width}
            height={styles.image.height}
            preserveAspectRatio="xMidYMid slice"
            opacity="1"
            href={animalColors[currentScreen].imageLink}
          />
          <Rect
            x="0"
            y={
              -(Dimensions.get("window").height - 80 - styles.image.height) / 2
            }
            width={styles.image.width}
            height={
              (Dimensions.get("window").height - 80 - styles.image.height) / 2
            }
            fill="white"
          />
          <Rect
            x="0"
            y={styles.image.height}
            width={styles.image.width}
            height={
              (Dimensions.get("window").height - 80 - styles.image.height) / 2
            }
            fill="white"
          />
          {/* <BuildGridHelper /> */}
        </Svg>
        <TouchableOpacity onPress={toggleNextScreen ? nextScreenHandler : null}>
          <Animated.View style={{ ...styles.buttonView, opacity: buttonAnim }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>NEXT</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const colorWidth = Dimensions.get("window").width / 8;
const colorHeight = Dimensions.get("window").height / 14;

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "kurri-island",
  },
  buttonView: {
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
    width: (Dimensions.get("window").width / 6) * 5,
    height: (Dimensions.get("window").width / 6) * 5,
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
    backgroundColor: "white",
  },
  svgView: {
    flex: 5,
    justifyContent: "center",
  },
  colorsView: {
    flex: 1,
  },
  grayColor: {
    backgroundColor: "gray",
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
  purpleColor: {
    backgroundColor: "purple",
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
  yellowColor: {
    backgroundColor: "yellow",
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

export const ChooseColorScreenOptions = () => {
  return {
    headerTitle: "Color the animal",
  };
};

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
          style={styles.grayColor}
          onPress={() => {
            setColor("grey");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.greenColor}
          onPress={() => {
            setColor("green");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.purpleColor}
          onPress={() => {
            setColor("purple");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.orangeColor}
          onPress={() => {
            setColor("orange");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.yellowColor}
          onPress={() => {
            setColor("yellow");
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

export default Lesson1ChooseColor;
