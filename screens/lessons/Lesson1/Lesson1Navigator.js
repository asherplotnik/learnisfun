import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Lesson1ChooseColor from "./Lesson1ChooseColor";
import Lesson1ChooseAnimal from "./Lesson1ChooseAnimal";

const Lesson1 = () => {
  lessonStackNavigator = createStackNavigator();
  return (
    <lessonStackNavigator.Navigator>
      <lessonStackNavigator.Screen
        name="Lesson1ChooseAnimal"
        component={Lesson1ChooseAnimal}
      />
      <lessonStackNavigator.Screen
        name="Lesson1ChooseColor"
        component={Lesson1ChooseColor}
      />
    </lessonStackNavigator.Navigator>
  );
};

export default Lesson1;
