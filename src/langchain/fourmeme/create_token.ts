import { EvmAgentKit } from "../../agent";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { Address } from "viem";
import { bsc } from "viem/chains";
import { FOUR_MEME_ADDRESSES } from "../../constants";

export function createFourMemeTokenTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "create_fourmeme_token",
    description:
      "Creates a new token on FourMeme. Requires BNB amount, token name, short name, description, image URL, launch time, and category label. Optional fields include website URL, Twitter URL, and Telegram URL. If the required fields are not provided, you should ask the user for them before proceeding. When the user inputs the launchTime, convert it to seconds from now. BEFORE YOU PROCEED, DOUBLE CHECK EVERYTHING WITH THE USER AND MAKE THEM CONFIRM EVERYTHING.",
    schema: z.object({
      bnbAmount: z.number().describe("Amount of BNB to create the token"),
      name: z.string().describe("Full name of the token"),
      shortName: z.string().describe("Short name/symbol of the token"),
      desc: z.string().describe("Description of the token"),
      imgUrl: z.string().describe("URL to the token's image"),
      launchTimeFromNow: z
        .number()
        .describe("When do you want the token to be launched?"),
      label: z
        .enum([
          "Meme",
          "AI",
          "Defi",
          "Games",
          "Infra",
          "De-Sci",
          "Social",
          "Depin",
          "Charity",
          "Others",
        ])
        .describe("Category label for the token"),
      webUrl: z.string().optional().describe("Website URL (optional)"),
      twitterUrl: z
        .string()
        .optional()
        .describe("Twitter profile URL (optional)"),
      telegramUrl: z
        .string()
        .optional()
        .describe("Telegram group URL (optional)"),
    }),
    func: async ({
      bnbAmount,
      name,
      shortName,
      desc,
      imgUrl,
      launchTimeFromNow,
      label,
      webUrl,
      twitterUrl,
      telegramUrl,
    }) => {
      try {
        // Get current chain from wallet provider
        const network = agent.wallet.getNetwork();
        if (!network.chainId) {
          throw new Error("Failed to get network chain ID");
        }
        const chainId = parseInt(network.chainId);

        // Check if we're on BSC mainnet
        if (chainId !== bsc.id) {
          return {
            txHash: null,
            status: "error",
            message: `FourMeme token creation is only supported on BSC mainnet (chainId ${bsc.id}). Current chain: ${network.chainId}`,
          };
        }

        // Get the BSC contract address
        const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC;

        const txHash = await agent.createFourMemeToken(
          tokenManagerAddress as Address,
          bnbAmount,
          name,
          shortName,
          desc,
          imgUrl,
          launchTimeFromNow,
          label,
          webUrl,
          twitterUrl,
          telegramUrl,
        );

        return {
          txHash,
          status: "success",
          chain: "BSC",
        };
      } catch (error: any) {
        return {
          txHash: null,
          status: "error",
          message: error.message || "Failed to create token",
        };
      }
    },
  });
}
