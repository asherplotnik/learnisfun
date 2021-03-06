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
  { id: 1, name: "lesson1", description: "Color the Animals" },
  { id: 2, name: "lesson2", description: "Match faces to feelings" },
  { id: 3, name: "lesson3", description: "Match letters" },
  { id: 4, name: "lesson4", description: "Find the vegetables" },
  { id: 5, name: "lesson5", description: "Spot the differences" },
  { id: 6, name: "lesson6", description: "Color the clothes" },
  { id: 7, name: "lesson7", description: "Draw a line" },
];
const LessonsScreen = (props) => {
  return (
    <FlatList
      style={styles.flatList}
      data={lessons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate(itemData.item.name)}
        >
          <View>
            <View style={styles.lessonItem}>
              <Text style={styles.itemText}>{itemData.item.id}</Text>
              <Text style={styles.itemText}>{itemData.item.description}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  ...styles.Separator,
                  width: "5%",
                  borderBottomColor: "white",
                }}
              />
              <View style={{ ...styles.Separator, width: "90%" }} />
              <View
                style={{
                  ...styles.Separator,
                  width: "5%",
                  borderBottomColor: "white",
                }}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  Separator: {
    borderBottomColor: Colors.buttonColor,
    borderBottomWidth: 0.5,
  },

  flatList: {
    backgroundColor: "white",
  },
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
    color: Colors.buttonColor,
  },
});

export const lessonsScreenOptions = {
  headerTitle: "Lessons list:",
};

export default LessonsScreen;
