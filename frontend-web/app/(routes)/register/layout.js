"use client";
import React, { Suspense } from "react";
import RegisterLayout from "@/app/(routes)/register/_components/RegisterLayout";
import Loading from "@/app/(routes)/register/loading";

const RegisterRootLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterLayout>{children}</RegisterLayout>
    </Suspense>
  );
};

export default RegisterRootLayout;
