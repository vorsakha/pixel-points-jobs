import { createConfig, http } from "wagmi";
import { Chain, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

const localhostChain = {
  id: 31337,
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
};

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const PRODUCTION_CHAINS = [mainnet, polygon, polygonMumbai];
const DEV_CHAINS = [localhostChain, ...PRODUCTION_CHAINS];

const chains = (process.env.NODE_ENV === "development"
  ? DEV_CHAINS
  : PRODUCTION_CHAINS) as unknown as [Chain, ...Chain[]];

export const config = createConfig({
  chains,
  connectors: [injected(), metaMask()],
  transports: {
    ...(process.env.NODE_ENV === "development" && {
      [localhostChain.id]: http("http://127.0.0.1:8545"),
    }),
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [polygon.id]: http(
      `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    ),
    [polygonMumbai.id]: http(
      `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
    ),
  },
});
