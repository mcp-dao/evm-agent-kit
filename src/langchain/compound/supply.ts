import { z } from "zod";
import { Tool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { supply } from "../../tools/compound/supply";

export const CompoundSupplySchema = z.object({
  assetId: z.string().describe("The asset ID to supply to Compound"),
  amount: z.string().describe("The amount to supply"),
});

/**
 * Tool for supplying assets to Compound
 */
export class CompoundSupplyTool extends Tool {
  name = "COMPOUND_SUPPLY";
  description = `
    This tool allows supplying collateral assets to Compound.
    It takes:
    - assetId: The asset to supply, one of 'weth', 'cbbtc', 'wsteth', or 'usdc'
    - amount: The amount of tokens to supply in human-readable format
    Examples:
    - 1 WETH
    - 0.1 WETH
    - 0.01 WETH
    Important notes:
    - Use the exact amount provided
    - The token must be an approved collateral asset for the Compound market

    Inputs (JSON string):
    - assetId: string, eg "weth" (required)
    - amount: string, eg "1" (required)
  `;

  constructor(private agent: EvmAgentKit) {
    super();
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    const { assetId, amount } = JSON.parse(input);
    const result = await supply({
      agent: this.agent,
      assetId,
      amount,
    });
    if (typeof result === "string") {
      return result;
    }
    return JSON.stringify(result);
  }
}
