function getRemainingTime(startTimestamp: bigint): string {
  const MAX_DURATION_MS = 30 * 60 * 1000;
  const currentTimestamp = BigInt(Date.now());
  const elapsedTime = currentTimestamp - startTimestamp * 1000n;

  if (elapsedTime >= BigInt(MAX_DURATION_MS)) {
    return "00:00";
  }

  const remainingTimeMs = Number(BigInt(MAX_DURATION_MS) - elapsedTime);

  const minutes = Math.floor(remainingTimeMs / (1000 * 60));
  const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export { getRemainingTime };
