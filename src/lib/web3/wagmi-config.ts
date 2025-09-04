import { createConfig, http } from "wagmi";
import { Chain, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

const isClient = typeof window !== "undefined";

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

const PRODUCTION_CHAINS = [mainnet, polygon, polygonMumbai];
const DEV_CHAINS = [localhostChain];

const chains = (process.env.NODE_ENV === "production"
  ? PRODUCTION_CHAINS
  : DEV_CHAINS) as unknown as [Chain, ...Chain[]];

const createTransports = () => {
  if (process.env.NODE_ENV === "production") {
    const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
    if (!INFURA_API_KEY) {
      throw new Error("NEXT_PUBLIC_INFURA_API_KEY is required for production");
    }
    return {
      [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
      [polygon.id]: http(
        `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      ),
      [polygonMumbai.id]: http(
        `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      ),
    };
  }
  return {
    [localhostChain.id]: http("http://127.0.0.1:8545"),
  };
};

export const config = createConfig({
  chains,
  connectors: [injected(), ...(isClient ? [metaMask()] : [])],
  transports: createTransports(),
});
