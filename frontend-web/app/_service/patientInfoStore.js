import { create } from "zustand";

const patientInfoStore = create((set) => ({
  name: null,
  grade: null,
  phone: null,
  address: null,
  detailAddress: null,
  setName: (name) => set({ name }),
  setGrade: (grade) => set({ grade }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setDetailAddress: (detailAddress) => set({ detailAddress }),
  clear: () =>
    set({
      name: null,
      grade: null,
      phone: null,
      address: null,
      detailAddress: null,
    }),
}));

export default patientInfoStore;
