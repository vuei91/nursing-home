import { create } from "zustand";

const enrollStore = create((set) => ({
  patientIds: [],
  setPatientIds: (patientIds) => set({ patientIds }),
}));

export default enrollStore;
