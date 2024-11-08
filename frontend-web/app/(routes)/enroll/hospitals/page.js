"use client";
import { Card, Flex } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useHospitalsQuery } from "@/app/_hooks/useHospitalQuery";
import hospitalStore from "@/app/_service/hospitalStore";

const Hospitals = () => {
  const { resp, isSuccess } = useHospitalsQuery();
  if (!isSuccess) return null;
  const hospitals = resp.data;
  return (
    <Flex
      vertical
      style={{
        margin: 10,
        overflow: "scroll",
        flexGrow: 1,
        top: 48,
        position: "relative",
      }}
    >
      {hospitals.map((item, key) => (
        <HospitalsCard
          key={key}
          title={item.name}
          dist={item.distance + " km"}
          addr={item.address}
          review={"12"}
          id={item.id}
        />
      ))}
    </Flex>
  );
};

const HospitalsCard = ({ title, dist, addr, review, id }) => {
  const { setHospitalId } = hospitalStore((state) => state);
  const router = useRouter();
  return (
    <Card
      hoverable
      style={{ lineHeight: 1.6, marginBottom: 10 }}
      onClick={() => {
        setHospitalId(id);
        router.push("/enroll/hospital/" + id);
      }}
    >
      <strong style={{ fontSize: 16 }}>{title}</strong>
      <div style={{ fontSize: 12 }}>
        <strong>{dist}</strong>&nbsp;{addr}
      </div>
      <div style={{ fontSize: 12 }}>리뷰 {review}</div>
    </Card>
  );
};

export default Hospitals;
