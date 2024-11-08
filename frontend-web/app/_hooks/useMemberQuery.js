import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/app/_hooks/api";

const useMemberQuery = () => {
  const {
    data: resp,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["member"],
    queryFn: () => getApi("member/"),
  });
  return { resp, isLoading, isSuccess, refetch };
};

export default useMemberQuery;
