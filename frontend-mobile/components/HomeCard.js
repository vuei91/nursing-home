import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { Card, Flex, Button } from "@ant-design/react-native";
import { Feather } from "@expo/vector-icons";

const HomeCard = ({ header, body, footer, isArrow = false, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} style={{ borderRadius: 5, flex: 1 }}>
      <Card
        style={{
          paddingBottom: 15,
          paddingTop: 15,
          paddingLeft: 16,
          paddingRight: 16,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Flex
          style={{
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <View
            style={{
              height: "100%",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontSize: 24 }}>{header}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {body}
            </Text>
            <Text style={{ fontSize: 12, color: "#767676" }}>{footer}</Text>
          </View>
          {isArrow && <Feather name="chevron-right" size={18} color="black" />}
        </Flex>
      </Card>
    </TouchableHighlight>
  );
};

export default HomeCard;
