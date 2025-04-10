import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { Action } from "../../types/action";

const fourmemeGetTrendingTokensAction: Action = {
  name: "FOURMEME_GET_TRENDING_TOKENS",
  similes: ["get trending tokens", "fourmeme get trending tokens"],
  description:
    "Retrieves the latest trending tokens on FourMeme platform. When returning ALWAYS show the full token address, token name, token symbol, description, current price and market cap.",
  examples: [],
  schema: z.object({}),
  handler: async (agent: EvmAgentKit, _input: any) => {
    const trendingTokens = await agent.getFourMemeTrendingTokens();
    return {
      status: "success",
      summary: {
        trendingTokens: JSON.stringify(trendingTokens),
      },
    };
  },
};

export default fourmemeGetTrendingTokensAction;
