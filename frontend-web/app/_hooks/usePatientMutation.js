import { useMutation } from "@tanstack/react-query";
import { deleteApi, postApi, putApi } from "@/app/_hooks/api";

export const useCreatePatientMutation = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["patient"],
    mutationFn: (params) => {
      return postApi("/patient/", params);
    },
  });

  const createPatient = (params, options) => {
    return mutate(params, options);
  };

  return { data, createPatient };
};

export const useUpdatePatientMutation = (id) => {
  const { data, mutate } = useMutation({
    mutationKey: ["update-patient", id],
    mutationFn: (params) => {
      return putApi("/patient/" + id, params);
    },
  });

  const updatePatient = (params, options) => {
    return mutate(params, options);
  };

  return { data, updatePatient };
};

export const useDeletePatientMutation = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["remove-patient"],
    mutationFn: (id) => {
      return deleteApi(`/patient/${id}`);
    },
  });

  const deletePatient = (id, options) => {
    return mutate(id, options);
  };

  return { data, deletePatient };
};
