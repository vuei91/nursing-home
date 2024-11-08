"use client";
import React from "react";
import { Flex, Button } from "antd";

const BottomTwoButton = ({ text1, text2, onClickText1, onClickText2 }) => {
  return (
    <div className="bottom">
      <Flex style={{ height: 80 }} align="center">
        <Button
          style={{ height: 48, margin: 10, width: "100%" }}
          onClick={onClickText1}
        >
          {text1}
        </Button>
        <Button
          type={"primary"}
          style={{ height: 48, margin: 10, width: "100%" }}
          onClick={onClickText2}
        >
          {text2}
        </Button>
      </Flex>
    </div>
  );
};

export default BottomTwoButton;
