import React from "react";
import TopNav from "@/app/_components/TopNav";

const HistoryProgressLayout = ({ children }) => {
  return (
    <>
      <TopNav title={"진행 현황 한눈에 보기"} isBack />
      <div className="container none_bottom">{children}</div>
    </>
  );
};

export default HistoryProgressLayout;
