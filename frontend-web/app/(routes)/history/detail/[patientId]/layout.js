import React from "react";
import TopNav from "@/app/_components/TopNav";

const HistoryDetailLayout = ({ children }) => {
  return (
    <>
      <TopNav title={"신청내역 상세"} isBack />
      <div className="container none_bottom">{children}</div>
    </>
  );
};

export default HistoryDetailLayout;
