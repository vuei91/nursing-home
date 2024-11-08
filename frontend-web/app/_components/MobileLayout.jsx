"use client";
import React, { useEffect } from "react";

const MobileLayout = ({ children }) => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });
  return <div className="mobile">{children}</div>;
};

export default MobileLayout;
