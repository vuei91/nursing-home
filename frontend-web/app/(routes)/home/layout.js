import React from "react";
import BottomNav from "@/app/_components/BottomNav";
import TopNav from "@/app/_components/TopNav";

const MainLayout = ({ children }) => {
  return (
    <>
      <TopNav title={"요양 플랫폼"} />
      <div className="container">{children}</div>
      <BottomNav />
    </>
  );
};

export default MainLayout;
