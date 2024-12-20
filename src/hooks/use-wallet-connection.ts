import { useAccount, useConnect, useDisconnect } from "wagmi";

export function useWalletConnection() {
  const { address, isConnected, isReconnecting } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  const connectWallet = () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.type === "metaMask",
    );

    if (metamaskConnector) {
      connect({ connector: metamaskConnector });
    }
  };

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet: disconnect,
    isConnecting: isConnecting || isReconnecting,
    isDisconnecting,
  };
}
