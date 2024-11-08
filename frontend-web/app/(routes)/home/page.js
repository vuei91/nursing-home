"use client";
import React, { useEffect } from "react";
import { Flex } from "antd";
import HomeCard from "@/app/(routes)/home/_component/HomeCard";
import { postApi } from "@/app/_hooks/api";

const Main = () => {
  useEffect(() => {
    (async () => {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const result = await postApi("/redis/username", {
          latitude,
          longitude,
        });
        console.log(result);
      });
    })();
  }, []);
  return (
    <Flex
      vertical
      style={{ width: "90%", margin: "auto", height: "calc(100vh - 96px)" }}
    >
      <HomeCard
        style={{
          margin: "10px 5px 0 0",
        }}
        image="🏥"
        title="요양시설 신청하기"
        desc="가까운 집 주변찾기"
        url={"/enroll/hospitals"}
      />
      <Flex style={{ flexGrow: 1 }}>
        <HomeCard
          style={{ margin: "10px 5px 0 0" }}
          image="🙋🏻‍♀️"
          title="요양사 부르기"
          desc="친절한 요양사를 찾아요"
        />
        <HomeCard
          style={{ margin: "10px 0 0 5px" }}
          image="💭"
          title="상담신청하기"
          desc="전문가에게 상담해주세요"
        />
      </Flex>
      <div style={{ marginTop: 20, marginBottom: 10, flexGrow: 1 }}>
        <img src={"/ad.png"} style={{ width: "100%" }} alt={"광고이미지"} />
      </div>
      <HomeCard
        image="📺"
        title="광고 문의"
        desc="병원 및 판매용품 문의해 주세요"
        style={{ marginTop: 10 }}
      />
      <HomeCard
        style={{ marginTop: 10 }}
        image="💸"
        title="상품판매"
        desc="장애 용품 등을 판매하고 있어요"
      />
      <div style={{ height: 20 }}>&nbsp;</div>
    </Flex>
  );
};

export default Main;
