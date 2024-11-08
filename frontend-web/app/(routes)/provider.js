"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavermapsProvider } from "react-naver-maps";
import { MAP_CLIENT_ID } from "@/app/_constants";

const queryClient = new QueryClient();

const Provider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId={MAP_CLIENT_ID}>
        {children}
      </NavermapsProvider>
    </QueryClientProvider>
  );
};

export default Provider;
