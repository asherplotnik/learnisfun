import React from "react";
import { View, StyleSheet, Modal, Text, Button } from "react-native";
import Colors from "../constants/Colors";
const CustomModal = (props) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={props.show}
      onRequestClose={props.close}
    >
      <View style={styles.modalWrapper}>
        <View
          style={{
            ...styles.modalView,
            backgroundColor: props.background,
          }}
        >
          <Text style={{ ...styles.textMessage, color: props.textColor }}>
            {props.children}
          </Text>
          <Button color={props.textColor} title="OK" onPress={props.close} />
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
