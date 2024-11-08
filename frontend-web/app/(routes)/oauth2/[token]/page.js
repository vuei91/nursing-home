"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const oauth = () => {
  const { token } = useParams();
  const router = useRouter();
  useEffect(() => {
    window.localStorage.setItem("token", token);
    router.push("/home");
  }, []);
  return (
    <Flex
      justify="center"
      style={{ width: "100%", height: "100%" }}
      align={"center"}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 100,
            }}
            spin
          />
        }
      />
    </Flex>
  );
};

export default oauth;
