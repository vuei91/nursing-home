"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/app/_components/TopNav";
import BottomTwoButton from "@/app/_components/BottomTwoButton";
import { Avatar, Flex, Menu } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useHospitalQuery } from "@/app/_hooks/useHospitalQuery";
import useMemberQuery from "@/app/_hooks/useMemberQuery";
import { Modal } from "antd-mobile";
import hospitalStore from "@/app/_service/hospitalStore";

const HospitalLayout = ({ children }) => {
  const { id } = useParams();
  const router = useRouter();
  const { resp, isSuccess } = useMemberQuery();
  const { hospitalId } = hospitalStore((state) => state);
  if (!isSuccess) return null;
  const member = resp.data;
  if (id * 1 !== hospitalId) {
    router.push("/home");
    return null;
  }
  const move = async () => {
    if (member?.["patients"]?.length === 0) {
      await Modal.alert({
        content: "대상자 먼저 등록이 필요합니다",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/register");
        },
      });
    } else {
      router.push("/enroll/choice-patient");
    }
  };
  return (
    <>
      <TopNav title={"신청하기"} isBack />
      <div style={{ position: "relative", top: 46 }}>
        <HospitalInfo />
        <DiagnosisMenu />
      </div>
      <div className="hospital-container">{children}</div>
      <BottomTwoButton
        text1={"추천하기"}
        text2={"예약문의"}
        onClickText2={move}
      />
    </>
  );
};

const HospitalInfo = () => {
  const params = useParams();
  const { resp, isSuccess } = useHospitalQuery(params.id);
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
