"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getApi } from "@/app/_hooks/api";

const LoginLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const resp = await getApi("/member/");
        if (resp.status === "success") {
          if (pathname === "/login") {
            router.push("/home");
          }
        }
      } catch (e) {
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    })();
  }, [pathname]);
  return <>{children}</>;
};

export default LoginLayout;
