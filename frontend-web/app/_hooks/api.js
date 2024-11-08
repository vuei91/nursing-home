"use client";
import axios from "axios";
import { BACKEND_URL } from "@/app/_constants";
import { useQuery } from "@tanstack/react-query";

function getBaseAxios() {
  return axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${window?.localStorage?.getItem("token")}`,
    },
  });
}

export async function getApi(url, params) {
  return (await getBaseAxios().get(url, { params })).data;
}

export async function postApi(url, params) {
  return (await getBaseAxios().post(url, params)).data;
}

export async function putApi(url, params) {
  return (await getBaseAxios().put(url, params)).data;
}

export async function deleteApi(url) {
  return (await getBaseAxios().delete(url)).data;
}

export const useCommonQuery = (key, url, params) => {
  const {
    data: resp,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: key,
    queryFn: () => getApi(url, params),
  });
  return { resp, isError, isLoading, isSuccess };
};
