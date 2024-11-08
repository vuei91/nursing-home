import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/app/_hooks/api";

const useEnrollMutation = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["enroll"],
    mutationFn: (params) => {
      return postApi("/enroll/", params);
    },
  });

  const createEnroll = (params, option) => {
    return mutate(params, option);
  };

  return { data, createEnroll };
};

export default useEnrollMutation;
