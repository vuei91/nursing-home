"use client";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NavBar } from "antd-mobile";
import { useRouter } from "next/navigation";

const TopNav = ({ title, isBack }) => {
  const router = useRouter();
  const back = () => {
    router.back();
  };
  return (
    <div className="top">
      <NavBar
        back={isBack ? <ArrowLeftOutlined /> : null}
        backArrow={false}
        onBack={isBack ? back : null}
      >
        {title}
      </NavBar>
    </div>
  );
};

export default TopNav;
