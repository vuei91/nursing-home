"use client";
import React from "react";
import { Flex, List } from "antd";
import { DayTag } from "@/app/(routes)/history/_components/Tags";
import { useEnrollsByPatientQuery } from "@/app/_hooks/useEnrollQuery";
import { useParams } from "next/navigation";

const data = [
  {
    day: "1-2일 소요",
    status: "ENROLL",
    step: "1단계",
    content: "의료기관 연락 중",
  },
  {
    day: "1일 소요 예상",
    status: "CALL",
    step: "2단계",
    content: "의료기관에서 고객님께 연락 예정",
  },
  {
    day: "1일 소요 예상",
    step: "3단계",
    status: "CONTRACT",
    content: "의료기관과 계약 진행",
  },
  {
    day: "최종 단계",
    step: "4단계",
    status: "COMPLETE",
    content: "서비스 수수료 입금 필요",
  },
];

const HistoryProgress = () => {
  const { patientId } = useParams();
  const { resp, isSuccess } = useEnrollsByPatientQuery(patientId);
  if (!isSuccess) return null;
  const enrolls = resp?.data;
  const getHospitalsFromStatus = (enrolls) => {
    const result = {};
    for (const enroll of enrolls) {
      if (!result[enroll?.["enrollStatus"]]) {
        result[enroll?.["enrollStatus"]] = [];
      }
      result[enroll?.["enrollStatus"]].push(enroll?.["hospitalName"]);
    }
    return result;
  };
  const status = getHospitalsFromStatus(enrolls);
  return (
    <div style={{ backgroundColor: "white" }}>
      <List
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ width: "100%" }}>
            <ProgressCard
              day={item.day}
              step={item.step}
              content={item.content}
              hospitals={status?.[item.status] || []}
              active={status?.[item.status] || false}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const ProgressCard = ({ day, step, content, hospitals, active }) => {
  return (
    <div style={{ width: "100%" }}>
      <DayTag text={day} disabled={!active} />
      <Flex>
        <div
          style={{
            color: active ? "#0085FF" : "#717375",
            fontSize: 16,
          }}
        >
          {step}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              fontSize: 16,
              paddingLeft: 10,
              color: active ? "black" : "#BBC1C4",
            }}
          >
            {content}
          </div>
          {active ? (
            <div
              style={{
                backgroundColor: "#F7F8F9",
                padding: "10px 0",
                width: "100%",
                borderRadius: 5,
              }}
            >
              {hospitals?.map((name, index) => (
                <Flex align={"center"} key={index}>
                  <Dot />
                  <div>{name}</div>
                </Flex>
              ))}
            </div>
          ) : null}
        </div>
      </Flex>
    </div>
  );
};

const Dot = () => (
  <div
    style={{
      width: 5,
      height: 5,
      borderRadius: 999,
      backgroundColor: "#BBC1C4",
      margin: 10,
    }}
  ></div>
);

export default HistoryProgress;
