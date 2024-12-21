import { ClockArrowUp } from "lucide-react";
import { useEffect } from "react";

import { usePixelPoints } from "@/hooks/use-pixel-points";
import { useCountdownStore } from "@/stores/use-countdown-store";

import { Button } from "../../../components/ui/button";

export interface CountdownProps {
  startTimestamp: bigint;
}

export function Countdown({ startTimestamp }: CountdownProps) {
  const { timeRemaining, isExpired, startCountdown, stopCountdown } =
    useCountdownStore();

  const { userPoints, spendTime } = usePixelPoints();

  useEffect(() => {
    startCountdown(startTimestamp);

    return () => stopCountdown();
  }, [startTimestamp, startCountdown, stopCountdown]);

  if (isExpired) {
    return (
      <Button
        onClick={() => spendTime(1)}
        disabled={Number(userPoints) === 0}
        variant="accent"
        size="sm"
      >
        <ClockArrowUp className="w-4 h-4 mr-1" />
        Use PXL
      </Button>
    );
  }

  return timeRemaining;
}
