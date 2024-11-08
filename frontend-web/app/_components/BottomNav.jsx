"use client";
import React from "react";
import {
  HomeFilled,
  MenuOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TabBar } from "antd-mobile";
import { usePathname, useRouter } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const go = (key) => {
    router.push(key);
  };
  const tabs = [
    {
      key: "/home",
      title: "홈",
      icon: <HomeFilled />,
    },
    {
      key: "/manage",
      title: "건강관리",
      icon: <PlusSquareOutlined />,
      badge: "5",
    },
    {
      key: "/history/main",
      title: "신청내역",
      icon: <MenuOutlined />,
      badge: "99+",
    },
    {
      key: "/mypage",
      title: "마이페이지",
      icon: <UserOutlined />,
    },
  ];
  return (
    <div className="bottom">
      <TabBar activeKey={pathname} onChange={go}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default BottomNav;
