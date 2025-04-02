import { Action } from "../../types/action";
import { z } from "zod";
import { EvmAgentKit } from "../../agent";
import { bsc } from "viem/chains";
import { FOUR_MEME_ADDRESSES } from "../../constants";

const fourmemeCreateTokenAction: Action = {
  name: "FOURMEME_CREATE_TOKEN",
  similes: ["create token", "fourmeme", "make token", "fourmeme create token"],
  description:
    "Creates a new token on FourMeme. Requires BNB amount, token name, short name, description, image URL, launch time, and category label. Optional fields include website URL, Twitter URL, and Telegram URL. If the required fields are not provided, you should ask the user for them before proceeding. When the user inputs the launchTime, convert it to seconds from now. BEFORE YOU PROCEED, DOUBLE CHECK EVERYTHING WITH THE USER AND MAKE THEM CONFIRM EVERYTHING.",
  examples: [
    [
      {
        input: {
          bnbAmount: 0.1,
          name: "My Token",
          shortName: "MTK",
          desc: "My Token is a token on the Binance Smart Chain.",
          imgUrl: "https://example.com/mytoken.png",
          launchTimeFromNow: 120,
          label: "Meme",
        },
        output: {
          status: "success",
          summary: {
            txHash: "0x1234567890123456789012345678901234567890",
          },
        },
        explanation:
          "Create a token on FourMeme with 0.1 BNB. The token with name 'My Token' and symbol 'MTK' will be launched 2 minutes from now. It's image is https://example.com/mytoken.png. The token is a meme token.",
      },
    ],
  ],
  schema: z.object({
    bnbAmount: z
      .number()
      .describe("Amount of BNB used for initial purchase of the token"),
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
  handler: async (agent: EvmAgentKit, input: Record<string, any>) => {
    const {
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
    } = input;
    // Get current chain from wallet provider
    const network = agent.wallet.getNetwork();
    if (!network.chainId) {
      throw new Error("Failed to get network chain ID");
    }
    const chainId = parseInt(network.chainId);

    // Check if we're on BSC mainnet
    if (chainId !== bsc.id) {
      return {
        status: "error",
        summary: {
          message: `FourMeme token creation is only supported on BSC mainnet (chainId ${bsc.id}). Current chain: ${network.chainId}`,
        },
      };
    }

    // Get the BSC contract address
    const tokenManagerAddress = FOUR_MEME_ADDRESSES.BSC as `0x${string}`;
    const txHash = await agent.createFourMemeToken(
      tokenManagerAddress,
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
      status: "success",
      summary: {
        txHash: txHash,
      },
    };
  },
};

export default fourmemeCreateTokenAction;
