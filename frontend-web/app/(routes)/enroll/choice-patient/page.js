"use client";
import React, { useState } from "react";
import { Button, Checkbox, Collapse, Flex } from "antd";
import useMemberQuery from "@/app/_hooks/useMemberQuery";
import enrollStore from "@/app/_service/enrollStore";
import hospitalStore from "@/app/_service/hospitalStore";
import { useEnrollsByHospitalQuery } from "@/app/_hooks/useEnrollQuery";
import { useRouter } from "next/navigation";
import { CloseOutlined } from "@ant-design/icons";
import { useDeletePatientMutation } from "@/app/_hooks/usePatientMutation";
import { Modal, Toast } from "antd-mobile";

const ChoicePatient = () => {
  const router = useRouter();
  const { hospitalId } = hospitalStore((state) => state);
  const { setPatientIds } = enrollStore((state) => state);
  const { resp, isSuccess, refetch } = useMemberQuery();
  const { deletePatient } = useDeletePatientMutation();
  const { resp: enrollResp, isSuccess: enrollIsSuccess } =
    useEnrollsByHospitalQuery(hospitalId);
  const [keys, setKeys] = useState([]);
  if (!isSuccess) return null;
  if (!enrollIsSuccess) return null;
  const member = resp.data;
  const patients = member?.["patients"];
  const patientIds = enrollResp?.data?.map((e) => e?.["patientId"]);
  const onChange = (e) => {
    if (e.target.checked) {
      const k = keys.concat(e.target.value);
      setKeys(k);
      setPatientIds(k);
    } else {
      const k = keys.filter((elem) => elem !== e.target.value);
      setKeys(k);
      setPatientIds(k);
    }
  };
  const remove = async (id) => {
    await Modal.confirm({
      content: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
        deletePatient(id, {
          onSuccess(data) {
            if (data.status === "success") {
              refetch().then(() => {
                Toast.show({
                  icon: "success",
                  content: "삭제완료",
                  position: "bottom",
                });
                if (parseInt(data.data) === 0) {
                  Modal.alert({
                    content: "대상자 먼저 등록이 필요합니다",
                    confirmText: "확인",
                    onConfirm: () => {
                      router.push("/register");
                    },
                  });
                }
              });
            } else {
              Modal.alert({
                content: "삭제가 되지 않았습니다",
                title: "삭제 실패",
                confirmText: "확인",
              });
            }
          },
        });
      },
      confirmText: "삭제",
      cancelText: "취소",
    });
  };
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        activeKey={keys}
        size="small"
        style={{ borderRadius: 0, backgroundColor: "inherit" }}
        items={patients.map((patient) => ({
          key: patient.id,
          label: (
            <Flex style={{ padding: 20 }}>
              <Checkbox
                disabled={patientIds?.includes(patient.id) || false}
                onChange={onChange}
                value={patient.id}
                style={{ flexGrow: 1, alignItems: "center" }}
              >
                {patient.name}
                {patientIds?.includes(patient.id) || false ? (
                  <span
                    style={{
                      borderRadius: 4,
                      backgroundColor: "#BBBBBB",
                      padding: 5,
                      color: "white",
                      marginLeft: 20,
                    }}
                  >
                    이미 신청되었습니다
                  </span>
                ) : null}
              </Checkbox>
              {patientIds?.includes(patient.id) || false ? null : (
                <Button danger type={"link"} onClick={() => remove(patient.id)}>
                  <CloseOutlined />
                </Button>
              )}
            </Flex>
          ),
          children: (
            <PatientDetail
              memberName={member.name || member.username}
              address={patient.address + " " + patient.detailAddress}
              grade={patient.grade}
              onClick={() => {
                setKeys([]);
                setPatientIds([]);
                router.push("/register?id=" + patient.id);
              }}
            />
          ),
          showArrow: false,
          headerClass: "header",
        }))}
      />
      <div style={{ width: "95%", margin: "auto" }}>
        <Button
          size={"large"}
          block
          type={"primary"}
          ghost
          onClick={() => {
            setKeys([]);
            setPatientIds([]);
            router.push("/register");
          }}
        >
          + 신청 대상자 추가하기
        </Button>
      </div>
    </div>
  );
};

const PatientDetail = ({ memberName, grade, address, onClick }) => {
  return (
    <>
      <style jsx>{`
        th {
          color: #717375;
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          vertical-align: top;
        }

        td {
          font-size: 16px;
        }
      `}</style>
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width={"18%"} />
          <col width={"82%"} />
        </colgroup>
        <tbody>
          {memberName && (
            <tr>
              <th>보호자</th>
              <td>{memberName}</td>
            </tr>
          )}
          {grade && (
            <tr>
              <th>요양 등급</th>
              <td>{grade && grade !== -1 ? `요양 ${grade}등급` : "없음"}</td>
            </tr>
          )}
          {address && (
            <tr>
              <th>주소</th>
              <td>{address}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Button block size={"large"} onClick={onClick}>
        수정하기
      </Button>
    </>
  );
};

export default ChoicePatient;
