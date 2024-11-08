import { useCommonQuery } from "@/app/_hooks/api";

export const useHospitalQuery = (id) => {
  return useCommonQuery(["hospital", id], `hospital/${id}`);
};

export const useHospitalsQuery = () => {
  return useCommonQuery(["hospitals"], "hospital/list");
};
