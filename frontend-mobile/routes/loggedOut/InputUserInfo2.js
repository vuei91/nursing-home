import { Button, InputItem } from "@ant-design/react-native";
import React from "react";
import { Text, View } from "react-native";
import InputUserInfo from "../../components/InputUserInfo";

const InputUserInfo2 = ({ navigation }) => {
  return (
    <InputUserInfo
      hint={"휴대폰 번호를 입력해 주세요"}
      onPress={() => navigation.navigate("InputUserInfo3")}
    />
  );
};

export default InputUserInfo2;
