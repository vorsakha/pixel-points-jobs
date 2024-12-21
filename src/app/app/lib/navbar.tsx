"use client";

import { Clock, Gift, LogOut, ShoppingCart, Zap } from "lucide-react";
import React from "react";

import { Countdown } from "@/app/app/lib/countdown";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePixelPoints } from "@/hooks/use-pixel-points";
import { useWalletConnection } from "@/hooks/use-wallet-connection";

export default function Navbar() {
  const { disconnectWallet, isDisconnecting } = useWalletConnection();

  const {
    user,
    userPoints,
    claimDailyPoints,
    canClaimPoints,
    purchasePoints,
    isUserPointsPending,
    isLastClaimPending,
    isUserPending,
  } = usePixelPoints();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Pixel Jobs</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-sm flex items-center">
              {isUserPointsPending ? (
                <Skeleton className="mr-2 h-4 w-8" />
              ) : (
                `${userPoints} PXL`
              )}

              <span className="ml-2 font-light text-gray-500">
                {isUserPending ? (
                  <Skeleton className="mr-2 h-4 w-8" />
                ) : (
                  <Countdown startTimestamp={user?.activeTimeStart || 0n} />
                )}
              </span>
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={claimDailyPoints}
              variant="primary"
              size="sm"
              isLoading={isLastClaimPending}
              disabled={!canClaimPoints}
            >
              <Gift
                className={`w-4 h-4 mr-1 ${canClaimPoints ? "animate-bounce" : ""}`}
              />
              Daily Claim
            </Button>
            <Button
              onClick={() => purchasePoints(1)}
              variant="primary"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Buy PXL
            </Button>
            <Button
              onClick={() => disconnectWallet()}
              isLoading={isDisconnecting}
              variant="error"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
