export const pixelPointsABI = [
  {
    inputs: [],
    name: "claimDailyPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "pointCount", type: "uint256" }],
    name: "purchasePoints",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "points", type: "uint256" }],
    name: "useTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getRemainingDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "durationMs",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getLastClaimTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "lastClaimTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "lastClaimTimestamp",
            type: "uint256",
          },
          { internalType: "uint256", name: "activeTimeStart", type: "uint256" },
        ],
        internalType: "struct PixelPoints.UserPoints",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
