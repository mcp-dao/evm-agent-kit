import { DynamicStructuredTool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { sellToken } from "../../tools/fourmeme/token_manager";
import { z } from "zod";
import { FOUR_MEME_ADDRESSES } from "../../constants";
import { Address } from "viem";

export function sellTokenTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "sell_fourmeme_token",
    description:
      "Sells a token on the FourMeme platform. Always confirm with the user, the token address and amount before selling the token. The token address must be a valid FourMeme token address. If no token address is provided, prompt the user to call FOURMEME_GET_TOKENS first.",
    schema: z.object({
      tokenAddress: z.string().describe("The address of the token to sell"),
      tokenAmount: z.string().describe("The amount of tokens to sell"),
    }),
    func: async (input: any) => {
      try {
        const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC as Address;
        return await sellToken({
          agent,
          tokenManagerAddress,
          tokenAddress: input.tokenAddress as Address,
          tokenAmount: input.tokenAmount,
        });
      } catch (error: any) {
        return {
          error: "Failed to sell token",
          errorMsg: error.message || "Failed to sell token",
        };
      }
    },
  });
}
