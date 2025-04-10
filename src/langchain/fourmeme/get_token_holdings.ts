import { DynamicStructuredTool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { getTokenHoldings } from "../../tools/fourmeme/token_manager";

export function getTokenHoldingsTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "get_fourmeme_token_holdings",
    description:
      "Retrieves all token holdings held by the current user on FourMeme platform. When returning ALWAYS show the full token address, token name, token symbol, description, my token amount, total increase percent, day increase percent, and progress to bonding curve.",
    schema: {},
    func: async (_input: any) => {
      try {
        const tokens = await getTokenHoldings(agent);
        return {
          status: "success",
          summary: {
            tokens: JSON.stringify(tokens),
          },
        };
      } catch (error: any) {
        return {
          error: "Failed to get token holdings",
          errorMsg: error.message || "Failed to get token holdings",
        };
      }
    },
  });
}
