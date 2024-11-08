"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/app/_components/TopNav";
import { Avatar, Flex, Menu } from "antd";
import { useParams } from "next/navigation";
import { useHospitalQuery } from "@/app/_hooks/useHospitalQuery";
import BottomButton from "@/app/_components/BottomButton";

const HospitalLayout = ({ children }) => {
  return (
    <>
      <TopNav title={"병원 자세히보기"} isBack />
      <div style={{ position: "relative", top: 46 }}>
        <HospitalInfo />
        <DiagnosisMenu />
      </div>
      <div className="hospital-container">{children}</div>
      <BottomButton text={"추천하기"} />
    </>
  );
};

const HospitalInfo = () => {
  const { hospitalId } = useParams();
  const { resp, isSuccess } = useHospitalQuery(hospitalId);
  if (!isSuccess) return null;
  const hospital = resp.data;
  return (
    <Flex align="center">
      <Avatar
        style={{ backgroundColor: "white", margin: "10px 20px 10px 10px" }}
        size="large"
        icon={"🏥"}
      />
      <div style={{ lineHeight: 1.6 }}>
        <strong style={{ fontSize: 16 }}>{hospital.name}</strong>
        <div style={{ fontSize: 12, color: "#777777" }}>{hospital.address}</div>
      </div>
    </Flex>
  );
};

const DiagnosisMenu = () => {
  const [nav, setNav] = useState("time");
  const [scroll, setScroll] = useState({});
  useEffect(() => {
    const hospitalContainer = document.querySelector(".hospital-container");
    const scrollHandler = (e) => {
      const info = document.querySelector(
        "div.hospital-container > div:nth-child(1)",
      );
      const info2 = document.querySelector(
        "div.hospital-container > div:nth-child(2)",
      );
      if (
        e.target.scrollTop + e.target.offsetHeight + 10 >
        e.target.scrollHeight
      ) {
        setNav("place");
      } else if (e.target.scrollTop > info.scrollHeight + info2.scrollHeight) {
        setNav("place");
      } else if (e.target.scrollTop > info.scrollHeight) {
        setNav("info");
      } else {
        setNav("time");
      }
    };
    hospitalContainer.addEventListener("scroll", scrollHandler);
    return () => {
      hospitalContainer.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["time"]}
      selectedKeys={[nav]}
      style={{
        backgroundColor: "#F7F9FC",
        height: 40,
        zIndex: 2,
      }}
      items={[
        {
          key: "time",
          label: "진료시간",
          style: { flexGrow: 1, textAlign: "center" },
          onClick: () => {
            document.querySelector(".hospital-container").scrollTo(0, 0);
          },
        },
        {
          key: "info",
          label: "진료정보",
          style: { flexGrow: 1, textAlign: "center" },
          onClick: () => {
            const info = document.querySelector(
              "div.hospital-container > div:nth-child(1)",
            );
            document
              .querySelector(".hospital-container")
              .scrollTo(0, info.scrollHeight + 1);
          },
        },
        {
          key: "place",
          label: "병원위치",
          style: { flexGrow: 1, textAlign: "center" },
          onClick: () => {
            const hospitalContainer = document.querySelector(
              ".hospital-container",
            );
            document
              .querySelector(".hospital-container")
              .scrollTo(0, hospitalContainer.scrollHeight);
          },
        },
      ]}
    />
  );
};

export default HospitalLayout;
