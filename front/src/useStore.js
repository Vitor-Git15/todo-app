import { create } from "zustand";

export const useStore = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
