import { create } from "zustand";

import { getRemainingTime } from "@/utils/time";

interface CountdownState {
  timeRemaining: string;
  isExpired: boolean;
  startCountdown: (startTimestamp: bigint) => void;
  stopCountdown: () => void;
}

export const useCountdownStore = create<CountdownState>((set) => {
  let timer: NodeJS.Timeout | null = null;

  const startCountdown = (startTimestamp: bigint) => {
    if (timer) clearInterval(timer);

    const updateCountdown = () => {
      const remainingTimeStr = getRemainingTime(startTimestamp);

      if (remainingTimeStr === "00:00") {
        set({ isExpired: true, timeRemaining: "00:00" });
        if (timer) clearInterval(timer);
        return;
      }

      set({ timeRemaining: remainingTimeStr, isExpired: false });
    };

    updateCountdown();

    timer = setInterval(updateCountdown, 1000);
  };

  const stopCountdown = () => {
    if (timer) clearInterval(timer);
    set({ isExpired: false, timeRemaining: "30:00" });
  };

  return {
    timeRemaining: "30:00",
    isExpired: false,
    startCountdown,
    stopCountdown,
  };
});
