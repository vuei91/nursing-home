import { Button, Flex, InputItem } from "@ant-design/react-native";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputUserInfo = ({ hint, onPress }) => {
  return (
    <View>
      <Flex style={styles.container}>
        <TextInput placeholder={hint} editable style={styles.input} />
        <View style={styles.buttonContainer}>
          <Button style={styles.nextButton} type="primary" onPress={onPress}>
            다음
          </Button>
        </View>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "white",
  },
  nextButton: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
  input: {
    padding: 10,
    width: "95%",
    borderWidth: 1,
    backgroundColor: "#F7F7FA",
    margin: 10,
    height: 50,
    borderColor: "#E5E5ED",
    borderRadius: 8,
  },
});

export default InputUserInfo;
