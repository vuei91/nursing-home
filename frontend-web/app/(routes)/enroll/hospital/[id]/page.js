"use client";
import { Button, Flex, Table } from "antd";
import React from "react";
import { useParams } from "next/navigation";
import { useHospitalQuery } from "@/app/_hooks/useHospitalQuery";
import {
  getConvenience,
  getDoctors,
  getSubjects,
  getToday,
} from "@/app/(routes)/enroll/hospital/[id]/_common";
import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";

const columns = [
  {
    title: "요일",
    dataIndex: "weekName",
    key: "weekName",
    align: "center",
  },
  {
    title: "시간",
    dataIndex: "weekTime",
    key: "weekTime",
    align: "center",
  },
];
const Hospital = () => {
  const params = useParams();
  const { resp, isSuccess } = useHospitalQuery(params.id);
  if (!isSuccess) return null;
  const hospital = resp.data;
  return (
    <>
      <DiagnosisTime />
      <DiagnosisInfo />
      <HospitalPlace
        address={hospital?.address}
        latitude={hospital?.latitude}
        longitude={hospital?.longitude}
        parking={hospital?.parking}
      />
    </>
  );
};

const DiagnosisTime = () => {
  const params = useParams();
  const { resp, isSuccess } = useHospitalQuery(params.id);
  if (!isSuccess) return null;
  const hospital = resp.data;
  const resultList = getToday(hospital);
  if (!resultList || resultList.length === 0) return null;
  const today = resultList.today;
  return (
    <div style={{ margin: 20 }}>
      <strong style={{ fontSize: 16 }}>진료시간</strong>
      <div style={{ margin: 10 }}></div>
      <div>
        <Flex>
          <div
            style={{
              padding: "8px 16px 8px 16px",
              borderRadius: 999,
              background: "#FFEADB",
              color: "#FF8400",
            }}
          >
            진료예정
          </div>
          <div style={{ marginLeft: 10 }}>
            <div>
              <strong style={{ fontSize: 16 }}>
                {today["weekName"] + " " + today["weekTime"]}
              </strong>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#777777" }}>
                {today["breakTime"] ? `점심시간 ${today["breakTime"]}` : ""}
              </div>
            </div>
          </div>
        </Flex>
      </div>
      <div style={{ marginTop: 10 }}>
        <Table
          columns={columns}
          dataSource={resultList["sortedList"]}
          pagination={false}
        ></Table>
      </div>
    </div>
  );
};

const DiagnosisInfo = () => {
  const params = useParams();
  const { resp, isSuccess } = useHospitalQuery(params.id);
  if (!isSuccess) return null;
  const hospital = resp.data;
  const { doctors, doctorTotal } = getDoctors(hospital);
  const { subjects, subjectsTotal } = getSubjects(hospital);
  const { conveniences, convenienceTotal } = getConvenience(hospital);
  return (
    <div style={{ backgroundColor: "white" }}>
      <div id={"info"}>
        {doctors && doctors.length > 0 ? (
          <InfoCard title={"전문의 정보"} total={doctorTotal + "명"}>
            {doctors.map((doctor, idx) => (
              <Info name={doctor} key={idx} />
            ))}
          </InfoCard>
        ) : null}
        {subjects && subjects.length > 0 ? (
          <InfoCard title={"진료과목"} total={subjectsTotal + "개"}>
            {subjects.map((subject, idx) => (
              <Info name={subject} key={idx} />
            ))}
          </InfoCard>
        ) : null}
        {conveniences && conveniences.length > 0 ? (
          <InfoCard title={"편의시설"} total={convenienceTotal + "개"}>
            {conveniences.map((convenience, idx) => (
              <Info name={convenience} key={idx} />
            ))}
          </InfoCard>
        ) : null}
      </div>
    </div>
  );
};

const HospitalPlace = ({ address, latitude, longitude, parking }) => {
  const getParking = (parking) => {
    let list = parking.split("\n");
    if (list.length > 1) {
      return list[0] + `(${list[1]})`;
    }
    return parking;
  };
  return (
    <div style={{ margin: 20 }}>
      <strong style={{ fontSize: 16 }}>병원위치</strong>
      <Flex align="center" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, flexGrow: 1 }} id={"copyText"}>
          {address}
        </div>
        <Button
          onClick={() => {
            const copyText = document.getElementById("copyText").innerText;
            navigator.clipboard.writeText(copyText).then(() => {
              alert("텍스트가 복사되었습니다!");
            });
          }}
        >
          복사
        </Button>
      </Flex>
      <MapDiv
        style={{
          width: "80%",
          height: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <MyMap latitude={latitude} longitude={longitude} />
      </MapDiv>
      {parking ? (
        <div style={{ lineHeight: 1.6, margin: "20px 0" }}>
          <strong style={{ fontSize: 16 }}>주차정보</strong>
          <div style={{ fontSize: 12, color: "#777777" }}>
            {getParking(parking)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MyMap = ({ latitude, longitude }) => {
  const navermaps = useNavermaps();
  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(latitude, longitude)}
      defaultZoom={15}
    >
      <Marker defaultPosition={new navermaps.LatLng(latitude, longitude)} />
    </NaverMap>
  );
};

const Info = ({ name }) => {
  return (
    <span
      style={{
        padding: "2px 10px 2px 10px",
        backgroundColor: "#F6F6F6",
        fontSize: 12,
        margin: 5,
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
};

const InfoCard = ({ title, total, children }) => (
  <div style={{ padding: 20, borderBottom: "1px solid #eee" }}>
    <Flex>
      <strong style={{ flexGrow: 1, fontSize: 14 }}>{title}</strong>
      <div style={{ color: "#777777", marginRight: 10, fontSize: 12 }}>
        총 {total}
      </div>
    </Flex>
    <div style={{ marginTop: 10, lineHeight: 2 }}>{children}</div>
  </div>
);

export default Hospital;
