import { DynamicStructuredTool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { purchaseFourMemeToken } from "../../tools/fourmeme/token_manager";
import { z } from "zod";
import { FOUR_MEME_ADDRESSES } from "../../constants";
import { Address } from "viem";

export function purchaseFourMemeTokenTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "purchase_fourmeme_token",
    description:
      "Purchases a token on the FourMeme platform. Always confirm with the user the token address and amount before purchasing the token. The token address must be a valid FourMeme token address.",
    schema: z.object({
      tokenAddress: z.string().describe("The address of the token to purchase"),
      tokenAmount: z.string().describe("The amount of tokens to purchase"),
    }),
    func: async (input: any) => {
      try {
        const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC as Address;
        return await purchaseFourMemeToken({
          agent,
          tokenManagerAddress,
          tokenAddress: input.tokenAddress as Address,
          amount: input.tokenAmount,
        });
      } catch (error: any) {
        return {
          error: "Failed to purchase token",
          errorMsg: error.message || "Failed to purchase token",
        };
      }
    },
  });
}
