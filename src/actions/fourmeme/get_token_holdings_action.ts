import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { Action } from "../../types/action";

const fourmemeGetTokenHoldingsAction: Action = {
  name: "FOURMEME_GET_TOKEN_HOLDINGS",
  similes: [
    "get my token holdings",
    "fourmeme get my token holdings",
    "get my tokens",
    "fourmeme get my tokens",
  ],
  description:
    "Retrieves all token listings held by the current user on FourMeme platform. When returning ALWAYS show the full token address, token name, token symbol, description, my token amount, total increase percent, day increase percent, and progress to bonding curve.",
  examples: [],
  schema: z.object({}),
  handler: async (agent: EvmAgentKit, _input: any) => {
    const tokens = await agent.getFourMemeTokens();
    return {
      status: "success",
      summary: {
        tokens: tokens,
      },
    };
  },
};

export default fourmemeGetTokenHoldingsAction;
