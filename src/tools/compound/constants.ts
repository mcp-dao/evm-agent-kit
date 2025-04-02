import { Address } from "viem";

export const SUPPORTED_NETWORKS = ["ethereum-mainnet", "ethereum-sepolia"];

export const COMET_ADDRESSES: Record<string, Address> = {
  "ethereum-mainnet": "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
};

export const ASSET_ADDRESSES: Record<string, Record<string, Address>> = {
  "ethereum-mainnet": {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    cbbtc: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    wsteth: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
};

// Re-export the ERC20 ABI from the erc20 action provider constants

export const COMET_ABI = [
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "supply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "priceFeed", type: "address" }],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numAssets",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "i", type: "uint8" }],
    name: "getAssetInfo",
    outputs: [
      {
        components: [
          { internalType: "uint8", name: "offset", type: "uint8" },
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "priceFeed", type: "address" },
          { internalType: "uint64", name: "scale", type: "uint64" },
          {
            internalType: "uint64",
            name: "borrowCollateralFactor",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "liquidateCollateralFactor",
            type: "uint64",
          },
          { internalType: "uint64", name: "liquidationFactor", type: "uint64" },
          { internalType: "uint128", name: "supplyCap", type: "uint128" },
        ],
        internalType: "struct CometCore.AssetInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseTokenPriceFeed",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address", name: "asset", type: "address" },
    ],
    name: "collateralBalanceOf",
    outputs: [{ internalType: "uint128", name: "balance", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const PRICE_FEED_ABI = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
