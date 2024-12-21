# Pixel Points

A decentralized application (dApp) that is a job board for web3 developers. Users can claim daily points, purchase additional points with ETH, and use their points to extend their navigation time.

## Features

- Daily point claiming system
- Point purchasing with ETH
- Navigation time tracking
- Metamask wallet integration
- ERC20 token implementation

## Tech Stack

- Next.js 14 (with App Router)
- TypeScript
- Hardhat
- Solidity
- Wagmi (Web3 React Hooks)
- Tailwind CSS
- OpenZeppelin Contracts
- Zustand

## Prerequisites

- Node.js (v18 or higher)
- Metamask wallet
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vorsakha/pixel-points-jobs.git
cd pixel-points-jobs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Metamask private key:
```bash
cp .env.example .env.local
```

## Local Development

1. Deploy the smart contracts to your local Hardhat node:
```bash
npm run hardhat:dev
npm run hardhat:compile
npm run hardhat:deploy
```

2. Get the deployed contract addresses from the output and add them to the `.env.local` file:
```bash
NEXT_PUBLIC_PIXEL_POINTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
```

3. Start the development server:
```bash
npm run dev
```

## Contract Details
The PixelPoints contract (contracts/pixel-points.sol) implements the ERC20 token standard and allows users to claim daily points, purchase additional points with ETH, and use their points to extend their navigation time. The contract also includes a userPoints mapping that stores the user's last claim timestamp and the current active entertainment time.

