import { EvmAgentKit } from "../agent";
import { z } from "zod";

export interface Config {
  OPENAI_API_KEY?: string;
  PERPLEXITY_API_KEY?: string;
  PRIORITY_LEVEL?: "medium" | "high" | "veryHigh"; // medium, high, or veryHigh
  ELFA_AI_API_KEY?: string;
  COINGECKO_PRO_API_KEY?: string;
  COINGECKO_DEMO_API_KEY?: string;
}

export interface Creator {
  address: string;
  percentage: number;
}

/**
 * Example of an action with input and output
 */
export interface ActionExample {
  input: Record<string, any>;
  output: Record<string, any>;
  explanation: string;
}

/**
 * Handler function type for executing the action
 */
export type Handler = (
  agent: EvmAgentKit,
  input: Record<string, any>,
) => Promise<Record<string, any>>;

/**
 * Main Action interface inspired by ELIZA
 * This interface makes it easier to implement actions across different frameworks
 */
export interface Action {
  /**
   * Unique name of the action
   */
  name: string;

  /**
   * Alternative names/phrases that can trigger this action
   */
  similes: string[];

  /**
   * Detailed description of what the action does
   */
  description: string;

  /**
   * Array of example inputs and outputs for the action
   * Each inner array represents a group of related examples
   */
  examples: ActionExample[][];

  /**
   * Zod schema for input validation
   */
  schema: z.ZodObject<any>;

  /**
   * Function that executes the action
   */
  handler: Handler;
}

export interface TokenCheck {
  tokenProgram: string;
  tokenType: string;
  risks: Array<{
    name: string;
    level: string;
    description: string;
    score: number;
  }>;
  score: number;
}

// Regular expressions for validating addresses
export const EVM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

// Chain ID validation schema
export const chainIdSchema = z.string().refine(
  (val) => {
    const num = Number.parseInt(val, 10);
    // Regular chain IDs (1-99999)
    if (num > 0 && num < 100000) {
      return true;
    }
    // Special chain IDs (100000000+)
    if (num >= 100000000) {
      return true;
    }
    return false;
  },
  {
    message: "Chain ID must be either 1-99999, or 100000000+",
  },
);

// Token info parameters schema
export const getDebridgeTokensInfoSchema = z.object({
  /** Chain ID to query tokens for */
  chainId: chainIdSchema.describe(
    "Chain ID to get token information for. Examples: '1' (Ethereum), '56' (BNB Chain)",
  ),

  /** Optional token address to filter results */
  tokenAddress: z
    .string()
    .optional()
    .describe(
      "Token address to query information for. For EVM chains: use 0x-prefixed address",
    ),

  /** Optional search term to filter tokens by name or symbol */
  search: z
    .string()
    .optional()
    .describe(
      "Search term to filter tokens by name or symbol (e.g., 'USDC', 'Ethereum')",
    ),
});

export type GetDebridgeTokensInfoParams = z.infer<
  typeof getDebridgeTokensInfoSchema
>;

export interface FluxbeamServerResponse {
  signature: string;
}

export interface Quote {
  amountIn: number;
  inputMint: string;
  minimumOut: number;
  outAmount: number;
  outputMint: string;
  pool: string;
  program: string;
}

export interface TransformedResponse {
  quote: Quote;
}
