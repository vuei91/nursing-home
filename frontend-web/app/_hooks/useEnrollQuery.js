import { useCommonQuery } from "@/app/_hooks/api";

export const useHistoryMainQuery = () => {
  return useCommonQuery(["enrolls"], "/enroll/");
};

export const useHistoryDetailQuery = (patientId) => {
  return useCommonQuery(["enrolls", patientId], `/enroll/${patientId}`);
};

export const useEnrollsByHospitalQuery = (hospitalId) => {
  return useCommonQuery(
    ["enrolls", "hospital", hospitalId],
    `/enroll/hospital/${hospitalId}`,
  );
};

export const useEnrollsByPatientQuery = (patientId) => {
  return useCommonQuery(
    ["enrolls_patient", patientId],
    `/enroll/patient/${patientId}`,
  );
};
