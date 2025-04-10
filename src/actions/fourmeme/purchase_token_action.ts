import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { Action } from "../../types/action";
import { FOUR_MEME_ADDRESSES } from "../../constants";
import { Address } from "viem";
const fourmemePurchaseTokenAction: Action = {
  name: "FOURMEME_PURCHASE_TOKEN",
  similes: [
    "purchase token",
    "fourmeme purchase token",
    "buy token",
    "fourmeme buy token",
  ],
  description:
    "Purchases a token on the FourMeme platform. Always confirm with the user the token address and amount before purchasing the token. The token address must be a valid FourMeme token address.",
  examples: [
    [
      {
        input: {
          tokenAddress: "0x1234567890123456789012345678901234567890",
          tokenAmount: "1000000000000000000",
        },
        output: {
          status: "success",
          summary: {
            txHash: "0x1234567890123456789012345678901234567890",
          },
        },
        explanation:
          "The user wants to purchase 1000000000000000000 tokens of the token with address 0x1234567890123456789012345678901234567890 on the FourMeme platform. The token address is provided and is valid, so the action is successful.",
      },
    ],
  ],
  schema: z.object({
    tokenAddress: z.string().describe("The address of the token to purchase"),
    tokenAmount: z.string().describe("The amount of tokens to purchase"),
  }),
  handler: async (agent: EvmAgentKit, input: any) => {
    try {
      const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC as Address;
      const txHash = await agent.purchaseFourMemeToken(
        tokenManagerAddress,
        input.tokenAddress,
        input.tokenAmount,
      );
      return {
        status: "success",
        summary: {
          txHash: txHash,
        },
      };
    } catch (error: any) {
      return {
        status: "error",
        error: error.message,
      };
    }
  },
};

export default fourmemePurchaseTokenAction;
