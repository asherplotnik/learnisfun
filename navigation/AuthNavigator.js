import React from "react";
import { homeScreenOptions } from "../screens/HomeScreen";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.buttonColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.buttonColor,
};

const authStackNavigator = createStackNavigator();
const AuthNavigator = () => {
  return (
    <authStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <authStackNavigator.Screen
        name="home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
    </authStackNavigator.Navigator>
  );
};

export default AuthNavigator;
