"use client";
import React from "react";
import { Steps } from "antd-mobile";
import { useParams, useRouter } from "next/navigation";
import { RightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { StepTag } from "@/app/(routes)/history/_components/Tags";
import { useHistoryDetailQuery } from "@/app/_hooks/useEnrollQuery";

const HistoryDetail = () => {
  const { patientId } = useParams();
  const { resp, isSuccess } = useHistoryDetailQuery(patientId);
  if (!isSuccess) return null;
  const enrolls = resp?.data;
  return (
    <>
      <FirstInfo
        memberName={enrolls?.[0]?.["memberName"]}
        patientName={enrolls?.[0]?.["patientName"]}
      />
      <SecondInfo patientId={patientId} />
      {enrolls?.map((enroll, index) => (
        <ThirdInfo
          key={index}
          index={index + 1}
          hospitalName={enroll?.["hospitalName"]}
          hospitalAddress={enroll?.["hospitalAddress"]}
          enrollStatus={enroll?.["enrollStatus"]}
          hospitalId={enroll?.["hospitalId"]}
        />
      ))}
    </>
  );
};

const FirstInfo = ({ memberName, patientName }) => {
  return (
    <Flex
      vertical
      justify={"center"}
      style={{
        width: "100%",
        backgroundColor: "white",
        borderTop: "1px solid #DFE2E4",
        borderBottom: "1px solid #DFE2E4",
        height: 108,
      }}
    >
      <Flex justify="space-between" style={{ padding: "0 20px 10px 20px" }}>
        <div style={{ fontSize: 16 }}>신청인</div>
        <strong style={{ fontSize: 16 }}>{memberName}</strong>
      </Flex>
      <Flex justify="space-between" style={{ padding: "10px 20px 0 20px" }}>
        <div style={{ fontSize: 16 }}>대상자명</div>
        <strong style={{ fontSize: 16 }}>{patientName}</strong>
      </Flex>
    </Flex>
  );
};

const SecondInfo = ({ patientId }) => {
  const router = useRouter();
  return (
    <Flex vertical justify={"center"} style={{ width: "100%", height: 120 }}>
      <div style={{ padding: 20 }}>
        <strong
          style={{
            fontSize: 16,
            marginLeft: 5,
            marginBottom: 5,
            lineHeight: 2,
          }}
        >
          자세한 정보
        </strong>
        <Button
          block
          size={"large"}
          onClick={() => router.push(`/history/progress/${patientId}`)}
        >
          진행현황 한눈에 보기
        </Button>
      </div>
    </Flex>
  );
};

const ThirdInfo = ({
  index,
  hospitalName,
  hospitalAddress,
  enrollStatus,
  hospitalId,
}) => {
  const router = useRouter();
  const getStatus = (status) => {
    switch (status) {
      case "ENROLL":
        return { step: 0, text: "대기중" };
      case "CALL":
        return { step: 1, text: "연락중" };
      case "CONTRACT":
        return { step: 2, text: "계약중" };
      case "COMPLETE":
        return { step: 3, text: "완료" };
      case "CANCEL":
        return { step: 4, text: "취소" };
    }
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderTop: "0.5px solid #DFE2E4",
        borderBottom: "0.5px solid #DFE2E4",
      }}
    >
      <div style={{ padding: 20 }}>
        <NumberDesign number={index} />
        <strong style={{ fontSize: 16, lineHeight: 2 }}>{hospitalName}</strong>
        <div style={{ fontSize: 14, color: "#717375" }}>{hospitalAddress}</div>
        <div style={{ paddingTop: 10 }}>
          <StepTag text={`${getStatus(enrollStatus)?.step + 1}단계`} />
        </div>
      </div>
      <div>
        <Steps current={getStatus(enrollStatus)?.step}>
          <Steps.Step title="1단계" />
          <Steps.Step title="2단계" />
          <Steps.Step title="3단계" />
          <Steps.Step title="4단계" />
        </Steps>
      </div>
      <Flex
        vertical
        justify={"center"}
        style={{
          height: 108,
        }}
      >
        <Flex justify="space-between" style={{ padding: "0 20px 10px 20px" }}>
          <div style={{ color: "#717375", fontSize: 16 }}>진행현황</div>
          <strong style={{ fontSize: 16 }}>
            {getStatus(enrollStatus)?.text}
          </strong>
        </Flex>
        <Flex justify="space-between" style={{ padding: "10px 20px 0 20px" }}>
          <div style={{ color: "#717375", fontSize: 16 }}>병원정보</div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/history/hospital/${hospitalId}`)}
          >
            <strong style={{ fontSize: 16 }}>자세히보기</strong>
            &nbsp;
            <RightOutlined size={14} color={"#717375"} />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

const NumberDesign = ({ number }) => (
  <span
    style={{
      border: "1px solid #DFE2E4",
      borderRadius: 5,
      fontSize: 14,
      padding: "2px 7px",
      marginRight: 5,
    }}
  >
    {number}
  </span>
);

export default HistoryDetail;
