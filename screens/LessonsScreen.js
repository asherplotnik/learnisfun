import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
const lessons = [
  { id: 1, name: "lesson1", description: "color the Animals" },
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
            })
          }
        >
          <View style={styles.lessonItem}>
            <Text style={styles.itemText}>{itemData.item.id}</Text>
            <Text style={styles.itemText}>{itemData.item.name}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemText: {
    marginHorizontal: 10,
  },
});

export const lessonsScreenOptions = {
  headerTitle: "Lessons list:",
};

export default LessonsScreen;
