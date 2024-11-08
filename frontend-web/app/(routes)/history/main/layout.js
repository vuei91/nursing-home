import React from "react";
import TopNav from "@/app/_components/TopNav";
import BottomNav from "@/app/_components/BottomNav";

const HistoryLayout = ({ children }) => {
  return (
    <>
      <TopNav title={"신청내역"} />
      <div className="container">{children}</div>
      <BottomNav />
    </>
  );
};

export default HistoryLayout;
