import { DynamicStructuredTool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { getFourMemeTrendingTokens } from "../../tools/fourmeme/token_manager";

export function getTrendingTokensTool(_agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "get_fourmeme_trending_tokens",
    description:
      "Retrieves the latest trending tokens on FourMeme platform. When returning ALWAYS show the full token address, token name, token symbol, description, my token amount, total increase percent, day increase percent, and progress to bonding curve.",
    schema: {},
    func: async (_input: any) => {
      try {
        const trendingTokens = await getFourMemeTrendingTokens(_agent);
        return {
          status: "success",
          summary: {
            trendingTokens: JSON.stringify(trendingTokens),
          },
        };
      } catch (error: any) {
        return {
          error: "Failed to get trending tokens",
          errorMsg: error.message || "Failed to get trending tokens",
        };
      }
    },
  });
}
