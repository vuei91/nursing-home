"use client";
import React, { useState } from "react";
import { Button, Space, Tabs } from "antd-mobile";
import {
  Complete,
  Contacting,
  Waiting,
} from "@/app/(routes)/history/_components/Tags";
import { useRouter } from "next/navigation";
import { List } from "antd";
import { useHistoryMainQuery } from "@/app/_hooks/useEnrollQuery";

const HistoryMain = () => {
  const { resp, isSuccess } = useHistoryMainQuery();
  const [nav, setNav] = useState("progress");
  if (!isSuccess) return null;
  const enrolls = resp?.data;
  const progressList = enrolls?.filter(
    (e) => e?.["enrollStatus"] !== "COMPLETE",
  );
  const progressCount = progressList?.length || 0;
  const completeList = enrolls?.filter(
    (e) => e?.["enrollStatus"] === "COMPLETE",
  );
  const completeCount = completeList?.length || 0;
  const onChange = (tab) => {
    setNav(tab);
  };
  return (
    <div>
      <Tabs
        activeLineMode={"full"}
        defaultActiveKey={"progress"}
        activeKey={nav}
        onChange={onChange}
      >
        <Tabs.Tab title={`진행중(${progressCount})`} key="progress" />
        <Tabs.Tab title={`완료(${completeCount})`} key="complete" />
      </Tabs>
      <List
        style={{ width: "100%", margin: "auto" }}
        dataSource={nav === "progress" ? progressList : completeList}
        renderItem={(item) => (
          <List.Item style={{ backgroundColor: "white", margin: 10 }}>
            {nav === "progress" ? (
              <MainCard
                state={"waiting"}
                startTime={item?.["enrollStartTime"] ?? "2024-04-12(금)"}
                hospitalName={item?.["hospitalName"]}
                memberName={item?.["memberName"]}
                patientId={item?.["patientId"]}
                patientName={item?.["patientName"]}
                exceptCount={item?.["exceptCount"]}
              />
            ) : (
              <MainCard state={"complete"} />
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

const MainCard = ({
  state,
  startTime,
  hospitalName,
  memberName,
  patientName,
  patientId,
  exceptCount,
}) => {
  const router = useRouter();
  const goToDetail = () => {
    router.push(`/history/detail/${patientId}`);
  };
  return (
    <Space direction="vertical" style={{ width: "100%", padding: "10px 20px" }}>
      {state === "waiting" ? <Waiting /> : null}
      {state === "contacting" ? <Contacting /> : null}
      {state === "complete" ? <Complete /> : null}
      <div style={{ fontSize: 12, color: "#B1B9C0" }}>{startTime}</div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {hospitalName + (exceptCount > 0 ? ` 외 ${exceptCount}곳` : "")}
      </div>
      <Space direction={"vertical"}>
        <Space>
          <span style={{ color: "#717375", fontSize: 16 }}>신청인</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{memberName}</span>
        </Space>
        <Space>
          <span style={{ color: "#717375", fontSize: 16 }}>대상자명</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{patientName}</span>
        </Space>
      </Space>
      <Button color="primary" fill="outline" block onClick={goToDetail}>
        자세히 보기
      </Button>
    </Space>
  );
};

export default HistoryMain;
