import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { parseEther } from "viem";
import { useWriteContract, useReadContract, useAccount } from "wagmi";

import { pixelPointsABI } from "@/lib/web3/pixel-points-abi";

const PIXEL_POINTS_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_PIXEL_POINTS_CONTRACT_ADDRESS as `0x${string}`;

export function usePixelPoints() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();

  // Read user's current points
  const {
    data: userPoints,
    isPending: isUserPointsPending,
    queryKey: userPointsKey,
  } = useReadContract({
    address: PIXEL_POINTS_CONTRACT_ADDRESS,
    abi: pixelPointsABI,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  // Read user object
  const {
    data: user,
    isPending: isUserPending,
    queryKey: userKey,
  } = useReadContract({
    address: PIXEL_POINTS_CONTRACT_ADDRESS,
    abi: pixelPointsABI,
    functionName: "getUserData",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  // Read user's pixel time balance
  const {
    data: remainingDuration,
    isPending: isRemainingDurationPending,
    queryKey: remainingDurationQueryKey,
  } = useReadContract({
    address: PIXEL_POINTS_CONTRACT_ADDRESS,
    abi: pixelPointsABI,
    functionName: "getRemainingDuration",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  // Read user's last claim timestamp
  const {
    data: lastClaimTimestamp,
    isPending: isLastClaimPending,
    queryKey: lastClaimTimestampKey,
  } = useReadContract({
    address: PIXEL_POINTS_CONTRACT_ADDRESS,
    abi: pixelPointsABI,
    functionName: "getLastClaimTimestamp",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const invalidateQueries = useCallback(() => {
    queryClient.resetQueries({
      queryKey: userPointsKey,
    });
    queryClient.resetQueries({
      queryKey: remainingDurationQueryKey,
    });
    queryClient.invalidateQueries({
      queryKey: lastClaimTimestampKey,
    });
    queryClient.invalidateQueries({
      queryKey: userKey,
    });
  }, [
    queryClient,
    userPointsKey,
    remainingDurationQueryKey,
    lastClaimTimestampKey,
    userKey,
  ]);

  // Claim daily points
  const claimDailyPoints = useCallback(() => {
    if (!address) return;

    writeContract(
      {
        address: PIXEL_POINTS_CONTRACT_ADDRESS,
        abi: pixelPointsABI,
        functionName: "claimDailyPoints",
      },
      {
        onSuccess: () => invalidateQueries(),
      },
    );
  }, [address, invalidateQueries, writeContract]);

  // Purchase additional points
  const purchasePoints = useCallback(
    (pointCount: number) => {
      if (!address) return;

      writeContract(
        {
          address: PIXEL_POINTS_CONTRACT_ADDRESS,
          abi: pixelPointsABI,
          functionName: "purchasePoints",
          args: [BigInt(pointCount)],
          value: parseEther(`${pointCount * 0.01}`),
        },
        {
          onSuccess: () => {
            invalidateQueries();
          },
        },
      );
    },
    [address, invalidateQueries, writeContract],
  );

  // Use entertainment time
  const spendTime = useCallback(
    (points: number) => {
      if (!address) return;

      writeContract(
        {
          address: PIXEL_POINTS_CONTRACT_ADDRESS,
          abi: pixelPointsABI,
          functionName: "useTime",
          args: [BigInt(points)],
        },
        { onSuccess: () => invalidateQueries() },
      );
    },
    [address, invalidateQueries, writeContract],
  );

  // Check if the user can claim daily points
  const canClaimPoints = useMemo(
    () =>
      lastClaimTimestamp !== undefined
        ? Math.floor(Date.now() / 1000) - Number(lastClaimTimestamp) >=
          24 * 60 * 60
        : false,
    [lastClaimTimestamp],
  );

  return {
    user,
    userPoints,
    remainingDuration,
    claimDailyPoints,
    canClaimPoints,
    purchasePoints,
    spendTime,
    isUserPointsPending,
    isRemainingDurationPending,
    isLastClaimPending,
    isUserPending,
  } as const;
}
