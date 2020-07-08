import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import RootNavigator from "./navigation/RootNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import usersReducer from "./store/reducers/usersReducer";
import authReducer from "./store/reducers/authReducer";
import activeLessonReducer from "./store/reducers/activeLessonReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  activeLesson: activeLessonReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
  return await Font.loadAsync({
    "joti-one": require("./assets/fonts/JotiOne-Regular.ttf"),
    "kurri-island": require("./assets/fonts/KurriIslandPERSONAL-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    console.log("loading fonts...");
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
