"use client";
import React, { useEffect } from "react";
import TopNav from "@/app/_components/TopNav";
import BottomButton from "@/app/_components/BottomButton";
import { Modal, Toast } from "antd-mobile";
import { useRouter } from "next/navigation";
import { getApi } from "@/app/_hooks/api";
import useEnrollMutation from "@/app/_hooks/useEnrollMutation";
import enrollStore from "@/app/_service/enrollStore";
import hospitalStore from "@/app/_service/hospitalStore";

const ChoicePatientLayout = ({ children }) => {
  const router = useRouter();
  const { patientIds } = enrollStore((state) => state);
  const { hospitalId } = hospitalStore((state) => state);
  const { createEnroll } = useEnrollMutation();
  useEffect(() => {
    (async () => {
      const { data } = await getApi("/member/");
      if (data?.["patients"]?.length === 0) {
        router.push("/register");
      }
      if (!hospitalId) {
        router.push("/");
      }
    })();
  }, []);
  const enroll = () => {
    Modal.show({
      content: "신청 하시겠습니까?",
      closeOnAction: true,
      actions: [
        {
          key: "Yes",
          text: "네",
          primary: true,
          async onClick() {
            if (patientIds && hospitalId && patientIds.length > 0) {
              await createEnroll(
                { patientIds, hospitalId },
                {
                  onSuccess(data) {
                    if (data.status === "success") {
                      Toast.show({
                        icon: "success",
                        content: "신청완료",
                        position: "bottom",
                      });
                      router.push("/history/main");
                    }
                  },
                },
              );
            } else {
              Toast.show({
                icon: "fail",
                content: "대상자를 선택해주세요",
                position: "bottom",
              });
            }
          },
        },
        {
          key: "No",
          text: "아니오",
        },
      ],
    });
  };
  return (
    <>
      <TopNav title={"신청하기"} isBack />
      <div className="container is_bottom">{children}</div>
      <BottomButton text={"신청하기"} onClick={enroll} />
    </>
  );
};

export default ChoicePatientLayout;
