"use client";
import React from "react";
import { Button, Flex, Result } from "antd";
import { useRouter } from "next/navigation";

const Manage = () => {
  const router = useRouter();
  return (
    <Flex style={{ height: "100vh" }} align={"center"} justify={"center"}>
      <Result
        status="warning"
        title="아직 개발중인 화면입니다"
        extra={
          <Button type="primary" key="console" onClick={() => router.push("/")}>
            돌아가기
          </Button>
        }
      />
    </Flex>
  );
};

export default Manage;
