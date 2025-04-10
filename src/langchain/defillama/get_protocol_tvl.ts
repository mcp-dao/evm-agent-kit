import { EvmAgentKit } from "../../agent";
import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import { getProtocolTvl } from "../../tools";

export function getProtocolTvlTool(_agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "get_protocol_tvl",
    description: "Get Total Value Locked (TVL) for a specific protocol",
    schema: z.object({
      slug: z.array(z.string()).describe("The protocol slug identifier"),
    }),
    func: async (input: any) => {
      try {
        const { slug } = input;
        const prices = await getProtocolTvl(slug);
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
