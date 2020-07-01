import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import LessonsNavigator from "./LessonsNavigator";
import AuthNavigator from "./AuthNavigator";
const RootNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      {!isAuth && <AuthNavigator />}
      {isAuth && <LessonsNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
