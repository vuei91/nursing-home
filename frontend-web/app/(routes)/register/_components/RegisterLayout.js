"use client";
import React from "react";
import TopNav from "@/app/_components/TopNav";
import BottomButton from "@/app/_components/BottomButton";
import patientInfoStore from "@/app/_service/patientInfoStore";
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "@/app/_hooks/usePatientMutation";
import { Modal } from "antd-mobile";
import { useRouter, useSearchParams } from "next/navigation";
import { usePatientOneQuery } from "@/app/_hooks/usePatientQuery";

const RegisterLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { name, phone, grade, address, detailAddress, clear } =
    patientInfoStore((state) => state);
  const { createPatient } = useCreatePatientMutation();
  const { updatePatient } = useUpdatePatientMutation(id);
  const { refetch } = usePatientOneQuery(id);
  const create = async (latitude, longitude) => {
    await createPatient(
      { name, phone, grade, address, detailAddress, latitude, longitude },
      { onSuccess },
    );
  };
  const update = async (latitude, longitude) => {
    await updatePatient(
      { name, phone, grade, address, detailAddress, latitude, longitude },
      { onSuccess },
    );
  };
  const onSuccess = (data) => {
    if (data?.status === "success") {
      refetch().then(() => {
        router.push("/enroll/choice-patient");
        clear();
      });
    } else {
      Modal.alert({
        content: "문제가 있으니 다시 입력해주세요",
        confirmText: "확인",
      });
    }
  };
  const submit = async () => {
    if (!name || !name.replace(/ /g, "")) {
      return Modal.alert({
        content: "이름을 입력해주세요",
        confirmText: "확인",
      });
    }
    if (!phone || !phone.replace(/ /g, "")) {
      return Modal.alert({
        content: "휴대폰번호를 입력해주세요",
        confirmText: "확인",
      });
    }
    if (!grade) {
      return Modal.alert({
        content: "요양등급을 입력해주세요",
        confirmText: "확인",
      });
    }
    if (!address || !address.replace(/ /g, "")) {
      return Modal.alert({
        content: "대상자의 주소를 입력해주세요",
        confirmText: "확인",
      });
    }
    if (!detailAddress || !detailAddress.replace(/ /g, "")) {
      return Modal.alert({
        content: "대상자의 상세주소를 입력해주세요",
        confirmText: "확인",
      });
    }
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder?.addressSearch(
      address + " " + detailAddress,
      async function (result, status) {
        let longitude, latitude;
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          longitude = result[0].x;
          latitude = result[0].y;
        }
        !id
          ? await create(latitude, longitude)
          : await update(latitude, longitude);
      },
    );
  };
  return (
    <>
      <TopNav title={"대상자 정보입력"} isBack />
      <div className="container">{children}</div>
      <BottomButton text={!id ? "등록" : "수정"} onClick={submit} />
    </>
  );
};

export default RegisterLayout;
