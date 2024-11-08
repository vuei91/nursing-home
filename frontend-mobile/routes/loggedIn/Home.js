import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import HomeCard from "../../components/HomeCard";
import { Flex, WhiteSpace } from "@ant-design/react-native";
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeCard
        header={"🏥"}
        body={"요양시설 신청하기"}
        footer={"가까운 집 주변 찾기"}
        isArrow={true}
        onPress={() => navigation.navigate("Register1")}
      />
      <WhiteSpace />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <HomeCard
          header={"🙋🏻‍♀️"}
          body={"요양사 부르기"}
          footer={"친절한 요양사를 찾아요"}
        />
        <View style={{ width: 10 }} />
        <HomeCard
          header={"💭"}
          body={"상담 신청하기"}
          footer={"전문가에게 상담해 주세요"}
        />
      </View>
      <WhiteSpace />
      <Image
        style={{ width: "100%" }}
        source={require("../../assets/ad.png")}
      />
      <WhiteSpace />
      <HomeCard
        header={"📺"}
        body={"광고 문의"}
        footer={"병원 및 판매용품 문의해 주세요"}
      />
      <WhiteSpace />
      <HomeCard
        header={"💸"}
        body={"상품 판매"}
        footer={"장애 용품 등을 판매하고 있어요"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    padding: 15,
    backgroundColor: "#F7F9FC",
    flex: 1,
  },
});

export default Home;
