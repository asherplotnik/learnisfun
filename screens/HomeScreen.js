import React, { useState } from "react";
import * as authActions from "../store/actions/authActions";
import { useDispatch } from "react-redux";
import HomeTitle from "../components/HomeTitle";
import { View, StyleSheet, Text, Dimensions, Button } from "react-native";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
const HomeScreen = (props) => {
  [usernameInput, setUsernameInput] = useState();
  [passwordInput, setPasswordInput] = useState();
  const dispatch = useDispatch();
  const submitHandler = () => {
    //check validity
    dispatch(authActions.login(usernameInput, passwordInput));
    // props.navigation.navigate("root");
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <HomeTitle />
      </View>
      <View style={styles.login}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}> Username:</Text>
          <TextInput
            style={styles.textInput}
            value={usernameInput}
            onChangeText={setUsernameInput}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            value={passwordInput}
            onChangeText={setPasswordInput}
          />
          <View style={styles.button}>
            <Button title="Submit" onPress={submitHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignContent: "center",
  },
  text: {
    marginTop: 5,
    color: "white",
  },
  title: {
    flex: 0.8,
    justifyContent: "center",
  },
  login: {
    backgroundColor: Colors.background,
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 30,
    fontFamily: "joti-one",
    color: Colors.titleYellow,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: 150,
  },

  inputContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    borderRadius: 7,
    overflow: "hidden",
  },
});

export const homeScreenOptions = {
  headerTitle: "Welcome",
};

export default HomeScreen;
