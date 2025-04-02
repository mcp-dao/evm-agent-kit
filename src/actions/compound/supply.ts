import { Action } from "../../types/action";
import { z } from "zod";
import { EvmAgentKit } from "../../agent";

const supplyCompoundAction: Action = {
  name: "COMPOUND_SUPPLY",
  similes: [
    "supply compound",
    "supply compound token",
    "supply compound token to compound",
    "supply compound token to compound protocol",
    "supply compound token to compound protocol for a specific token",
    "supply compound token to compound protocol for a specific token for a specific user",
  ],
  description:
    "Supply a token to Compound protocol for a specific token. The token must be an approved collateral asset for the Compound market.",
  examples: [
    [
      {
        input: {
          assetId: "usdc",
          amount: "1",
        },
        output: {
          status: "success",
          summary: {
            supplyBalance: "1000.50",
            tokenSymbol: "USDC",
            tokenDecimals: 6,
          },
        },
        explanation: "Supply 1 USDC to Compound protocol.",
      },
    ],
  ],
  schema: z.object({
    assetId: z
      .string()
      .describe(
        "The asset to supply, one of 'weth', 'cbbtc', 'wsteth', or 'usdc'",
      ),
    amount: z.string().describe("The amount of tokens to supply"),
  }),
  handler: async (agent: EvmAgentKit, input: Record<string, any>) => {
    const { assetId, amount } = input;
    try {
      const supplyData = await agent.getSupply(assetId, amount);

      return {
        status: "success",
        summary: JSON.stringify(supplyData),
      };
    } catch (error) {
      return {
        status: "error",
        summary: {
          message: `Failed to supplyCompound: ${(error as Error).message}`,
        },
      };
    }
  },
};

export default supplyCompoundAction;
