"use client";

import { Clock, Key, Zap } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { useWalletConnection } from "@/hooks/use-wallet-connection";

function LandingPage() {
  const { connectWallet, isConnected, isConnecting } = useWalletConnection();

  if (isConnected) {
    redirect("/app");
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <Zap className="h-16 w-16 text-primary" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Pixel Job Board</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-secondary" />
              <p>Daily Access: 1 Hour</p>
            </div>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-accent" />
              <p>Extend with PXL Tokens</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>1 PXL = 30 Minutes of Access</p>
            </div>
          </div>
          <div className="card-actions w-full mt-6">
            <Button
              className="w-full"
              onClick={connectWallet}
              isLoading={isConnecting}
            >
              MetaMask Login
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Limited daily access. Acquire PXL tokens to extend your time.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
