import { EvmAgentKit } from "../../agent";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { fetchPrices } from "../../tools";

export function fetchPriceTool(_agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "fetch_price",
    description: "Fetch the price of a token",
    schema: z.object({
      chainTokenAddrStrings: z
        .array(z.string())
        .describe(
          'String array of strings in format of "chain:token_address" (e.g. "ethereum:0x0000000000000000000000000000000000000000")',
        ),
      searchWidth: z
        .string()
        .optional()
        .describe(
          "The width of the search window for the price data. Default is '6h'",
        ),
    }),
    func: async (input: any) => {
      try {
        const { chainTokenAddrStrings, searchWidth } = input;
        const prices = await fetchPrices({
          chainTokenAddrStrings,
          searchWidth,
        });
        return {
          prices,
          status: "success",
        };
      } catch (error: any) {
        return {
          status: "error",
          summary: {
            error: error.message,
          },
        };
      }
    },
  });
}
