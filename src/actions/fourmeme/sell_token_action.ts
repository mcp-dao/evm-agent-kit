import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { Action } from "../../types/action";
import { Address } from "viem";
import { FOUR_MEME_ADDRESSES } from "../../constants";

const fourmemeSellTokenAction: Action = {
  name: "FOURMEME_SELL_TOKEN",
  similes: [
    "sell token",
    "fourmeme sell token",
    "sell my token",
    "fourmeme sell my token",
  ],
  description:
    "Sells a token on the FourMeme platform. Always confirm with the user, the token address and amount before selling the token. The token address must be a valid FourMeme token address. If no token address is provided, prompt the user to call FOURMEME_GET_TOKENS first.",
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
          "The user wants to sell 1000000000000000000 tokens of the token with address 0x1234567890123456789012345678901234567890 on the FourMeme platform. The token address is provided, so the action is successful.",
      },
    ],
  ],
  schema: z.object({
    tokenAddress: z.string().describe("The address of the token to sell"),
    tokenAmount: z.string().describe("The amount of tokens to sell"),
  }),
  handler: async (agent: EvmAgentKit, input: any) => {
    const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC as Address;
    const txHash = await agent.sellFourMemeToken(
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
  },
};

export default fourmemeSellTokenAction;
