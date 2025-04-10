export * from "./agent";
export * from "./elfa_ai";
export * from "./fourmeme";
export * from "./compound";

import type { EvmAgentKit } from "../agent";

import {
  ElfaPingTool,
  ElfaApiKeyStatusTool,
  ElfaGetMentionsTool,
  ElfaTrendingTokensTool,
  ElfaSearchMentionsTool,
  ElfaGetTopMentionsTool,
  ElfaAccountSmartStatsTool,
  createFourMemeTokenTool,
  getTokenHoldingsTool,
  sellTokenTool,
  CompoundSupplyTool,
  getTrendingTokensTool,
  purchaseFourMemeTokenTool,
} from "./index";

export function createEvmTools(evmKit: EvmAgentKit) {
  return [
    new ElfaPingTool(evmKit),
    new ElfaApiKeyStatusTool(evmKit),
    new ElfaGetMentionsTool(evmKit),
    new ElfaTrendingTokensTool(evmKit),
    new ElfaSearchMentionsTool(evmKit),
    new ElfaGetTopMentionsTool(evmKit),
    new ElfaAccountSmartStatsTool(evmKit),

    // FourMeme
    createFourMemeTokenTool(evmKit),
    getTokenHoldingsTool(evmKit),
    getTrendingTokensTool(evmKit),
    sellTokenTool(evmKit),
    purchaseFourMemeTokenTool(evmKit),
    // Compound
    new CompoundSupplyTool(evmKit),
  ];
}
