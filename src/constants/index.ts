import { bsc } from "viem/chains";

// FourMeme contract addresses by chain
export const FOUR_MEME_ADDRESSES: Record<string, string> = {
  // BSC Mainnet
  [bsc.id.toString()]: "0x5c952063c7fc8610FFDB798152D69F0B9550762b",
  // For backwards compatibility
  BSC: "0x5c952063c7fc8610FFDB798152D69F0B9550762b",
  // Default to BSC Mainnet for now
  DEFAULT: "0x5c952063c7fc8610FFDB798152D69F0B9550762b",
};

// For backwards compatibility
export const FOUR_MEME_BSC_ADDRESS = FOUR_MEME_ADDRESSES.BSC;
