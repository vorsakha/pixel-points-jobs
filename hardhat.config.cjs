/* eslint-disable @typescript-eslint/no-require-imports */
require('@nomicfoundation/hardhat-toolbox-viem');
require('@nomicfoundation/hardhat-ignition-viem');

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.28",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

module.exports = config;