import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, Button } from "react-native";
import Colors from "../constants/Colors";
const CustomModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalView}>
          <Text style={styles.textMessage}>{props.children}</Text>
          <Button title="OK" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  textMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.modalText,
    padding: 10,
  },
});

export default CustomModal;
