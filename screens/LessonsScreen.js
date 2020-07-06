import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/Colors";
const lessons = [
  { id: 1, name: "Lesson1ChooseAnimal", description: "color the Animals" },
  { id: 2, name: "lesson2", description: "Lesson 2" },
  { id: 3, name: "lesson3", description: "Lesson 3" },
  { id: 4, name: "lesson4", description: "Lesson 4" },
];
const LessonsScreen = (props) => {
  return (
    <FlatList
      data={lessons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <TouchableNativeFeedback
          onPress={() =>
            props.navigation.navigate(itemData.item.name, {
              title: itemData.item.description,
              nextAnimal: 0,
              score: 100,
            })
          }
        >
          <View style={styles.lessonItem}>
            <Text style={styles.itemText}>{itemData.item.id}</Text>
            <Text style={styles.itemText}>{itemData.item.description}</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  lessonItem: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 2,
    backgroundColor: "white",
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: "teal",
  },
});

export const lessonsScreenOptions = {
  headerTitle: "Lessons list:",
};

export default LessonsScreen;
