import { Button, Flex, InputItem } from "@ant-design/react-native";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputUserInfo from "../../components/InputUserInfo";

const InputUserInfo1 = ({ navigation }) => {
  return (
    <InputUserInfo
      hint={"이름을 입력해 주세요"}
      onPress={() => navigation.navigate("InputUserInfo2")}
    />
  );
};

export default InputUserInfo1;
