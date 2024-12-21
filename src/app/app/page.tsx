"use client";

import { Loader2, Zap, ShoppingCart, MapPin, ClockArrowUp } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { usePixelPoints } from "@/hooks/use-pixel-points";
import { useWalletConnection } from "@/hooks/use-wallet-connection";
import { useCountdownStore } from "@/stores/use-countdown-store";

// Mocked job data
const mockedJobs = [
  {
    id: 1,
    title: "Blockchain Developer",
    company: "Crypto Innovations",
    location: "Remote",
    salary: "$120k - $150k",
    tags: ["Solidity", "Web3", "Smart Contracts"],
  },
  {
    id: 2,
    title: "Frontend Web3 Engineer",
    company: "Decentralized Dreams",
    location: "San Francisco",
    salary: "$110k - $140k",
    tags: ["React", "Ethereum", "MetaMask"],
  },
  {
    id: 3,
    title: "Smart Contract Auditor",
    company: "SecureChain",
    location: "Remote",
    salary: "$130k - $160k",
    tags: ["Solidity", "Security", "DeFi"],
  },
  {
    id: 4,
    title: "Web3 Product Manager",
    company: "Blockchain Builders",
    location: "New York",
    salary: "$100k - $130k",
    tags: ["Product", "Blockchain", "Strategy"],
  },
];

function JobBoardApp() {
  const { isConnected } = useWalletConnection();
  const {
    isUserPending,
    userPoints,
    purchasePoints,
    spendTime,
    isUserPointsPending,
  } = usePixelPoints();
  const isExpired = useCountdownStore((state) => state.isExpired);

  if (!isConnected) {
    redirect("/");
  }

  if (isUserPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-xl font-semibold text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <Zap className="mx-auto mb-4 w-16 h-16 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Time Expired
          </h2>
          <p className="text-gray-600 mb-6">
            Your daily access time has run out. Purchase PXL or use one of yours
            to continue browsing jobs.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => purchasePoints(1)}
              className="w-full"
              isLoading={isUserPointsPending}
            >
              <ShoppingCart className="mr-1 w-5 h-5" />
              Buy and use 1 PXL Point (30 mins)
            </Button>
            <Button
              variant="accent"
              onClick={() => spendTime(1)}
              className="w-full"
              isLoading={isUserPending}
              disabled={Number(userPoints) === 0}
            >
              <ClockArrowUp className="mr-1 w-5 h-5" />
              Use 1 PXL To Extend Access (30 mins)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {job.salary}
                </div>
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-4 space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button className="btn-block">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default JobBoardApp;
