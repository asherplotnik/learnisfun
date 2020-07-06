import React from "react";
import { View, StyleSheet, Modal, Text, Button } from "react-native";
const CustomModal = (props) => {
  return (
    <Modal
      transparent
      style={{ backgroundColor: "red" }}
      animationType="fade"
      visible={props.show}
      onRequestClose={props.close}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalView}>
          <Text style={styles.textMessage}>{props.children}</Text>
          <Button title="OK" onPress={props.close} />
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
    backgroundColor: "rgba(0,0,0,0.6)",
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
    color: "black",
    padding: 10,
    textAlign: "center",
  },
});

export default CustomModal;
