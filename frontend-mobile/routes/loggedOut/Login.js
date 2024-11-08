import { Button, WhiteSpace } from "@ant-design/react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>요양 플랫폼</Text>
      <WhiteSpace />
      <Button
        style={styles.kakaoButton}
        onPress={() => navigation.navigate("InputUserInfo1")}
      >
        카카오 로그인
      </Button>
      <WhiteSpace />
      <Button style={styles.naverButton}>네이버 로그인</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  kakaoButton: {
    width: "80%",
    backgroundColor: "#FDDC3F",
  },
  naverButton: {
    width: "80%",
    backgroundColor: "#2DB400",
  },
});
