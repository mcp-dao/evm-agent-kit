import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { Action } from "../../types/action";

const fetchPriceAction: Action = {
  name: "DEFILLAMA_FETCH_PRICE",
  similes: [
    "get token price",
    "fetch price",
    "check token price",
    "get price from defillama",
  ],
  description:
    "Fetches the price of one or more tokens using the DeFiLlama price API. Tokens are specified using chain:address format.",
  examples: [
    [
      {
        input: {
          chainTokenAddrStrings: [
            "ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          ],
          // searchWidth: "6h"
        },
        output: {
          status: "success",
          summary: {
            prices: {
              "ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": 2000.5,
            },
          },
        },
        explanation:
          "The user wants to fetch the price of WETH on Ethereum. The action returns the current price in USD.",
      },
    ],
  ],
  schema: z.object({
    chainTokenAddrStrings: z
      .array(z.string())
      .describe(
        'Array of strings in format of "chain:token_address" (e.g. "ethereum:0x0000000000000000000000000000000000000000")',
      ),
    // searchWidth: z.string().optional().describe("The width of the search window for the price data. Default is '6h'"),
  }),
  handler: async (agent: EvmAgentKit, input: any) => {
    try {
      const prices = await agent.fetchTokenPrices(input.chainTokenAddrStrings);

      return {
        status: "success",
        summary: {
          prices,
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

export default fetchPriceAction;
