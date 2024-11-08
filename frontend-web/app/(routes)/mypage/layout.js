import React from "react";
import TopNav from "@/app/_components/TopNav";
import BottomNav from "@/app/_components/BottomNav";

const Layout = ({ children }) => {
  return (
    <>
      <TopNav title={"마이페이지"} />
      <div className="container">{children}</div>
      <BottomNav />
    </>
  );
};

export default Layout;
