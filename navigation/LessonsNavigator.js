import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import LessonsScreen from "../screens/LessonsScreen";
import { lessonsScreenOptions } from "../screens/LessonsScreen";
import Lesson1ChooseColor from "../screens/lessons/Lesson1/Lesson1ChooseColor";
import Lesson1ChooseAnimal from "../screens/lessons/Lesson1/Lesson1ChooseAnimal";
import Lesson1 from "../screens/lessons/Lesson1/Lesson1Navigator";
import Lesson2 from "../screens/lessons/Lesson2/Lesson2";
import Lesson3 from "../screens/lessons/Lesson3/Lesson3";
import Lesson4 from "../screens/lessons/Lesson4/Lesson4";
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.buttonColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.buttonColor,
};

const LessonsStackNavigator = createStackNavigator();

export const LessonsNavigator = () => {
  return (
    <LessonsStackNavigator.Navigator
      screenOptions={defaultNavigationOptions}
      initialRouteName="lessons"
    >
      <LessonsStackNavigator.Screen
        name="lessons"
        component={LessonsScreen}
        options={lessonsScreenOptions}
      />
      {/* <LessonsStackNavigator.Screen
        name="Lesson1ChooseColor"
        component={Lesson1ChooseColor}
      />
      <LessonsStackNavigator.Screen
        name="Lesson1ChooseAnimal"
        component={Lesson1ChooseAnimal}
      /> */}

      <LessonsStackNavigator.Screen name="lesson1" component={Lesson1} />
      <LessonsStackNavigator.Screen name="lesson2" component={Lesson2} />
      <LessonsStackNavigator.Screen name="lesson3" component={Lesson3} />
      <LessonsStackNavigator.Screen name="lesson4" component={Lesson4} />
    </LessonsStackNavigator.Navigator>
  );
};

export default LessonsNavigator;
