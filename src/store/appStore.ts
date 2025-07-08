import {UserData} from "@/api/getUserData.ts";
import {create} from "zustand/react";

interface AppStore extends UserData {
  spendEnegi: () => void,
  init: (userData: UserData) => void,
  setEnergi: (energi: number) => void
}

const incrementMoneyValue = 0.1;

export const useAppStore = create<AppStore>()((set,) => ({
  energi: 0,
  money: 0,
  max_energi: 30,
  spendEnegi: () => set(({energi, money}) => {
    if (energi === 0)
      return {};

    return { energi: energi - 1, money: Number((money + incrementMoneyValue).toFixed(1)) }
  }),
  init: (userData: UserData) => set({ ...userData }),
  setEnergi: (energi) => set({energi})
}))