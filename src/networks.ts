export type Network = {
  network: string;
  chainId: number;
  chainHandle: string;
};

export const networks: Network[] = [
  {
    network: "Ethereum",
    chainId: 1,
    chainHandle: "mainnet",
  },
  {
    network: "Arbitrum One",
    chainId: 42161,
    chainHandle: "arbitrum",
  },
  {
    network: "Arbitrum Nova",
    chainId: 42170,
    chainHandle: "arbitrum-nova",
  },
  {
    network: "Polygon",
    chainId: 137,
    chainHandle: "polygon",
  },
  {
    network: "Polygon zkEVM",
    chainId: 1101,
    chainHandle: "polygon-zkevm",
  },
  {
    network: "Base",
    chainId: 8453,
    chainHandle: "base",
  },
  {
    network: "Optimism",
    chainId: 10,
    chainHandle: "optimism",
  },
  {
    network: "Astar zkEVM",
    chainId: 3776,
    chainHandle: "astar-zkevm",
  },
  {
    network: "Avalanche",
    chainId: 43114,
    chainHandle: "avalanche",
  },
  {
    network: "HOME Verse",
    chainId: 19011,
    chainHandle: "homeverse",
  },
  {
    network: "BSC",
    chainId: 56,
    chainHandle: "bsc",
  },
  {
    network: "Gnosis",
    chainId: 100,
    chainHandle: "gnosis",
  },
  {
    network: "Xai",
    chainId: 660279,
    chainHandle: "xai",
  },
  {
    network: "Ethereum Sepolia",
    chainId: 11155111,
    chainHandle: "sepolia",
  },
  {
    network: "Arbitrum Sepolia",
    chainId: 421614,
    chainHandle: "arbitrum-sepolia",
  },
  {
    network: "Avalanche Testnet",
    chainId: 43113,
    chainHandle: "avalanche-testnet",
  },
  {
    network: "Base Sepolia",
    chainId: 84532,
    chainHandle: "base-sepolia",
  },
  {
    network: "XR Sepolia",
    chainId: 2730,
    chainHandle: "xr-sepolia",
  },
  {
    network: "Optimism Sepolia",
    chainId: 11155420,
    chainHandle: "optimism-sepolia",
  },
  {
    network: "Polygon Amoy",
    chainId: 80002,
    chainHandle: "amoy",
  },
  {
    network: "Astar zKyoto Testnet",
    chainId: 6038361,
    chainHandle: "astar-zkyoto",
  },
  {
    network: "BSC Testnet",
    chainId: 97,
    chainHandle: "bsc-testnet",
  },
  {
    network: "Xai Sepolia",
    chainId: 37714555429,
    chainHandle: "xai-sepolia",
  },
];
networks.sort((a, b) => a.chainHandle.localeCompare(b.chainHandle));
