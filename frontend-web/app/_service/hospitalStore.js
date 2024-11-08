import { create } from "zustand";

const hospitalStore = create((set) => ({
  hospitalId: null,
  setHospitalId: (hospitalId) => set({ hospitalId }),
}));

export default hospitalStore;
