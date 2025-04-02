# How to Add Your Own Tool

Extending the **EVM Agent Kit** with custom tools allows you to add specialized functionalities tailored to your needs. This guide walks you through creating and integrating a new tool into the existing framework.

## Overview

1. Create a new tool file
2. Export the new tool
3. Add supporting functions to EvmAgentKit
4. Implement the LangChain tool class
5. Export the LangChain tool
6. Export your protocol's LangChain tools (if not already exported)
7. Define an Action class for given tool
8. Export Action
9. Use the custom tool

## Implementation Guide

### 1. Create a New Tool File

Create a new TypeScript file in the `src/tools/your_protocol` directory for your tool (e.g., `custom_tool.ts`). If the `src/tools/your_protocol` directory does not exist, create it.

### 2. Export the Tool (if not already exported)
> `src/tools/index.ts`
```typescript:src/tools/index.ts
export * from "./defillama";
export * from "./coingecko";
export * from "./your_protocol"; // Add your protocol here if it's not already in the list
```

### 3. Add Supporting Functions to EvmAgentKit
> `src/agent/index.ts`
```typescript:src/agent/index.ts
export class EvmAgentKit {
  // ... existing code ...

  async customFunction(input: string): Promise<string> {
    // Implement your custom functionality
    return `Processed input: ${input}`;
  }
}
```

### 4. Implement the LangChain Tool Class
> `src/langchain/your_protocol/custom_tool.ts`
```typescript:src/langchain/your_protocol/custom_tool.ts
import { DynamicStructuredTool } from "@langchain/core/tools";
import { EvmAgentKit } from "../../agent";
import { z } from "zod";

export function createCustomTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "custom_tool",
    description: "Description of what the custom tool does.",
    schema: z.object({
      input: z.string().describe("Description of the input parameter"),
    }),
    func: async ({ input }) => {
      try {
        const result = await agent.customFunction(input);
        return {
          status: "success",
          message: "Custom tool executed successfully",
          data: result,
        };
      } catch (error: any) {
        return {
          status: "error",
          message: error.message || "Failed to execute custom tool",
          code: error.code || "UNKNOWN_ERROR",
        };
      }
    },
  });
}
```

### 5. Export LangChain Tool
> `src/langchain/your_protocol/index.ts`
```typescript:src/langchain/your_protocol/index.ts
export * from "./custom_tool";
```

### 6. Export your protocol's LangChain tools (if not already exported)
> `src/langchain/index.ts`
```typescript:src/langchain/index.ts
export * from "./agent";
export * from "./your_protocol"; // Add your protocol here if it's not already in the list
```

### 7. Define an Action class for given tool

> `src/actions/your_protocol/custom_action.ts`
```typescript:src/actions/your_protocol/custom_action.ts
import { Action } from "../../types/action";
import { EvmAgentKit } from "../../agent";
import { z } from "zod";

const customAction: Action = {
  name: "CUSTOM_ACTION",
  similes: ["custom tool"],
  description: "Description of what the custom tool does.",
  examples: [
    [
      {
        input: { input: "test" },
        output: {
          status: "success",
          message: "Custom tool executed successfully",
          data: "Processed input: test",
        },
        explanation: "Custom tool executed successfully",
      }
    ]
  ],
  schema: z.object({
    input: z.string().describe("Description of the input parameter"),
  }),
  handler: async (agent: EvmAgentKit, input: Record<string, any>) => {
    const result = await agent.customFunction(input.input);
    return {
      status: "success",
      message: "Custom tool executed successfully",
      data: result,
    };
  },
};

export default customAction;
```

### 8. Export Action
> `src/actions/index.ts`
```typescript:src/actions/index.ts
import customAction from "./your_protocol/custom_action";

export const ACTIONS = {
    // ... existing actions ...
  CUSTOM_ACTION: customAction,
}
```

### 9. Usage Example

```typescript
import { EvmAgentKit, createEvmTools } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Use via LangChain tools
const tools = createEvmTools(agent);
const customTool = tools.find(tool => tool.name === "custom_tool");

if (customTool) {
  const result = await customTool.call({ input: "test-input" });
  console.log(result);
}

// Or use directly from the agent
const result = await agent.customFunction("test-input");
console.log(result);
```

## Example: Token Price Fetching Tool

Here's a complete example of implementing a tool to fetch token prices using DeFiLlama:

> `src/tools/custom_price/fetch_token_price.ts`
```typescript:src/tools/custom_price/fetch_token_price.ts
import { EvmAgentKit } from "../../agent";

export async function fetchTokenPrice(agent: EvmAgentKit, tokenAddress: string, chainId: number) {
  try {
    // Use existing DeFiLlama integration
    const price = await agent.fetchTokenPriceByChainId(tokenAddress, chainId);
    return {
      status: "success",
      price,
      message: `Price fetched successfully for ${tokenAddress}.`,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to fetch token price",
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}
```

> `src/langchain/custom_price/fetch_token_price_tool.ts`
```typescript:src/langchain/custom_price/fetch_token_price_tool.ts
import { EvmAgentKit } from "../../agent";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { fetchTokenPrice } from "../../tools/custom_price/fetch_token_price";

export function createFetchTokenPriceTool(agent: EvmAgentKit) {
  return new DynamicStructuredTool({
    name: "fetch_token_price",
    description: "Fetches the current price of a specified token by address and chain ID.",
    schema: z.object({
      tokenAddress: z.string().describe("The token address"),
      chainId: z.number().describe("The chain ID where the token exists"),
    }),
    func: async ({ tokenAddress, chainId }) => {
      return fetchTokenPrice(agent, tokenAddress, chainId);
    },
  });
}
```

> `src/actions/custom_price/fetch_token_price_action.ts`
```typescript:src/actions/custom_price/fetch_token_price_action.ts
import { Action } from "../../types/action";
import { EvmAgentKit } from "../../agent";
import { z } from "zod";
import { fetchTokenPrice } from "../../tools/custom_price/fetch_token_price";

const fetchTokenPriceAction: Action = {
  name: "FETCH_TOKEN_PRICE",
  similes: ["fetch token price", "get token price", "token price lookup"],
  description: "Fetches the current price of a specified token by address and chain ID.",
  examples: [
    [
      {
        input: { 
          tokenAddress: "0x1234567890123456789012345678901234567890",
          chainId: 1
        },
        output: {
          status: "success",
          message: "Price fetched successfully for 0x1234567890123456789012345678901234567890.",
          price: 150,
        },
        explanation: "Fetch the current price of a token on Ethereum mainnet (chainId 1)",
      }
    ]
  ],
  schema: z.object({
    tokenAddress: z.string().describe("The token address"),
    chainId: z.number().describe("The chain ID where the token exists"),
  }),
  handler: async (agent: EvmAgentKit, input: Record<string, any>) => {
    return fetchTokenPrice(agent, input.tokenAddress, input.chainId);
  },
};

export default fetchTokenPriceAction;
```

## Best Practices

- Implement robust error handling
- Add chain validation for chain-specific features
- Document your tool's purpose and usage
- Write tests for reliability
- Keep tools focused on single responsibilities
- Reuse existing functionality when possible

## Need Help?

If you encounter any issues while implementing your custom tool:

- Open an issue in the repository
- Contact the maintainer
- Check existing tools for implementation examples

---