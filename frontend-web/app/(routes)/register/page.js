"use client";
import React, { useEffect, useState } from "react";
import { Flex, Input, Mentions, Select, Typography } from "antd";
import patientInfoStore from "@/app/_service/patientInfoStore";
import { useSearchParams } from "next/navigation";
import { usePatientOneQuery } from "@/app/_hooks/usePatientQuery";
import DaumPostcode from "react-daum-postcode";

const RegisterPatient = () => {
  const [isOpenDaumPost, setIsOpenDaumPost] = useState(false);
  const [juso, setJuso] = useState();
  const [detail, setDetail] = useState();
  const { setName, setPhone, setGrade, setAddress, setDetailAddress } =
    patientInfoStore((state) => state);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { resp, isSuccess } = usePatientOneQuery(id);
  useEffect(() => {
    const patient = resp?.data;
    if (patient) {
      setName(patient.name);
      setPhone(patient.phone);
      setGrade(patient.grade);
      setAddress(patient.address);
      setDetailAddress(patient.detailAddress);
    }
  }, [isSuccess]);
  if (!isSuccess) return null;
  const patient = resp.data;
  return (
    <Flex vertical justify="center" style={{ margin: "auto", width: "90%" }}>
      <Typography.Title level={5}>이름</Typography.Title>
      <Input
        placeholder="대상자의 이름을 입력해주세요"
        defaultValue={patient?.["name"]}
        allowClear
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Typography.Title level={5}>휴대폰번호</Typography.Title>
      <Input
        placeholder="연락 가능한 휴대폰 번호를 입력해 주세요."
        defaultValue={patient?.["phone"]}
        allowClear
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <Typography.Title level={5}>요양등급</Typography.Title>
      <Select
        placeholder={"요양등급을 선택해주세요"}
        defaultValue={patient?.["grade"]}
        onChange={(e) => setGrade(e)}
        options={[
          { value: 1, label: "1등급" },
          { value: 2, label: "2등급" },
          { value: 3, label: "3등급" },
          { value: 4, label: "4등급" },
          { value: 5, label: "5등급" },
          { value: -1, label: "없음" },
        ]}
      />
      <Typography.Title level={5}>주소</Typography.Title>
      <Mentions
        placeholder="대상자의 주소를 입력해 주세요."
        readOnly
        defaultValue={patient?.["address"]}
        value={juso}
        onClick={() => {
          setDetail(null);
          setJuso(null);
          setIsOpenDaumPost(!isOpenDaumPost);
        }}
      />
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Input
          placeholder="주소를 먼저 입력하시고, 상세주소를 입력해주세요"
          disabled={!juso}
          defaultValue={patient?.["detailAddress"]}
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
            setAddress(juso);
            setDetailAddress(e.target.value);
          }}
          allowClear
        />
      </div>
      {isOpenDaumPost ? (
        <DaumPostcode
          onComplete={(data) => {
            setJuso(data.address);
            setIsOpenDaumPost(false);
          }}
          autoClose={false}
        />
      ) : null}
    </Flex>
  );
};

export default RegisterPatient;
