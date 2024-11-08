import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/app/_hooks/api";

export const usePatientOneQuery = (id) => {
  const {
    data: resp,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getApi("patient/" + id),
  });
  return { resp, isLoading, isSuccess, refetch };
};

export const usePatientListQuery = () => {
  const {
    data: resp,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: () => getApi("patient/"),
  });
  return { resp, isLoading, isSuccess };
};
