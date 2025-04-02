# How to Test It Out

Testing the **EVM Agent Kit** ensures that all functionalities are working as expected. You can run automated tests or interact with the agent in different ways to verify its operations.

## Running Automated Tests

The project includes test scripts in the `test/` directory. To execute the tests:

1. **Ensure Dependencies are Installed**
   - If you haven't installed the dependencies yet, refer to the [Setup Locally](./setup_locally.md) guide.

2. **Run the Test Script**
   ```bash
   pnpm run test
   ```
   This will run the main test script. Ensure that your environment variables are correctly set in the `.env` file before running the tests.

3. **Run MCP Tests**
   ```bash
   pnpm run test:mcp
   ```
   This will run the Model Context Protocol tests.

4. **Run Vercel AI Tests**
   ```bash
   pnpm run test:vercel-ai
   ```
   This will run tests for the Vercel AI integration.

## Code Examples

### Check ERC20 Token Balance

```typescript
import { EvmAgentKit } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const balance = await agent.getBalance("0x1234567890123456789012345678901234567890");
console.log("Token Balance:", balance);
```

### Transfer ERC20 Tokens

```typescript
import { EvmAgentKit } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const txHash = await agent.transfer(
  "0x1234567890123456789012345678901234567890", // to address
  1.5, // amount
  "0xabcdef1234567890abcdef1234567890abcdef12" // token address (optional for native token)
);
console.log("Transfer Transaction:", txHash);
```

### Launch a Token on Four.meme (BSC only)

```typescript
import { EvmAgentKit, FOUR_MEME_ADDRESSES } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://bsc-dataseed.binance.org/", // BSC RPC URL
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const result = await agent.createFourMemeToken(
  FOUR_MEME_ADDRESSES.BSC, // Token Manager Address
  0.1, // Fee in BNB
  "My EVM Token", // name
  "MET", // short name/symbol
  "An awesome EVM token for testing", // description
  "https://example.com/token-image.png", // image URL
  Date.now() + 3600 * 1000, // launch time (1 hour from now)
  "Meme", // category
  "https://mytoken.com", // website (optional)
  "https://twitter.com/mytoken", // Twitter URL (optional)
  "https://t.me/mytoken" // Telegram URL (optional)
);

console.log("Token Creation Result:", result);
```

### Get CoinGecko Token Data

```typescript
import { EvmAgentKit } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Get trending tokens
const trending = await agent.getTrendingTokens();
console.log("Trending tokens:", trending);

// Get token price data
const priceData = await agent.getTokenPriceDataUsingCoingecko(
  "0x1234567890123456789012345678901234567890"
);
console.log("Token price data:", priceData);
```

### Get DeFiLlama Protocol TVL

```typescript
import { EvmAgentKit } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const tvl = await agent.fetchProtocolTvl("uniswap");
console.log("Uniswap TVL:", tvl);
```

## Using LangChain Tools

```typescript
import { EvmAgentKit, createEvmTools } from "evm-agent-kit";

const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Get all available tools
const tools = createEvmTools(agent);

// Find a specific tool
const getBalanceTool = tools.find(tool => tool.name === "get_erc20_balance");

// Use the tool
if (getBalanceTool) {
  const result = await getBalanceTool.call("0x1234567890123456789012345678901234567890");
  console.log(JSON.parse(result));
}
```

## Best Practices

### Environment Setup
- Verify `.env` file contains correct and secure values
- Ensure all required environment variables are set
- Use a secure wallet that you know the private key for testing purposes

### Testing
- Maintain comprehensive test coverage
- Monitor console logs during testing
- Start with testnet before moving to mainnet

## Troubleshooting

### Test Failures

#### Missing Environment Variables
- **Issue:** Tests fail due to missing environment variables
- **Solution:** Check `.env` file for all required variables

#### Network Problems
- **Issue:** Network-related errors
- **Solution:** Verify internet connection and EVM RPC endpoint accessibility
- **Solution:** For chain-specific features like Four.meme, ensure you're using the correct chain (BSC)

### Agent Issues

#### Chain Compatibility
- **Issue:** Feature doesn't work on specific chain
- **Solution:** Check if the feature is chain-specific (like Four.meme token creation being BSC-only)