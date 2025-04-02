<div align="center">

# EVM Agent Kit

![EVM Agent Kit](https://evm-mcp.s3.us-east-1.amazonaws.com/evm-agent-kit.jpg)

</div>

An open-source toolkit for connecting AI agents to EVM protocols. Now, any agent, using any model can autonomously perform various EVM actions:

- Check ERC20 token balances
- Transfer ERC20 tokens
- Launch tokens on Four.meme
- Get token pricing data
- Fetch trending tokens
- Monitor market movements
- Access DeFi protocols
- And more...

Anyone - whether an SF-based AI researcher or a crypto-native builder - can bring their AI agents trained with any model and seamlessly integrate with EVM-compatible blockchains.

## 🔧 Core Blockchain Features

- **Token Operations**
  - Check ERC20 token balances
  - Transfer ERC20 tokens
  - Launch new tokens on Four.meme (BSC)
  - Bridge tokens across chains

- **Market Data Integration**
  - CoinGecko Pro API integration
  - Real-time token price data
  - Trending tokens and pools
  - Top gainers analysis
  - Token information lookup

- **DeFi Data Access**
  - Protocol TVL tracking with DeFiLlama
  - Price feeds and aggregation
  - Token trading data

- **Social Data**
  - Elfa AI social media insights
  - Trending tokens by social activity
  - Smart mentions tracking
  - Social account analysis

## 🤖 AI Integration Features

- **LangChain Integration**
  - Ready-to-use LangChain tools for blockchain operations
  - DynamicStructuredTool-based implementation
  - Zod schema validation
  - Comprehensive error handling

- **Vercel AI SDK Integration**
  - Vercel AI SDK for AI agent integration
  - Framework agnostic support
  - Quick and easy toolkit setup

- **MCP Integration**
  - Support for the Model Context Protocol
  - Action-based architecture
  - Structured schema definitions

- **AI Tools**
  - DALL-E integration for image generation
  - Natural language processing for blockchain commands
  - Price feed integration for market analysis

## 📦 Installation

```bash
npm install evm-agent-kit
```

## Quick Start

```typescript
import { EvmAgentKit, createEvmTools } from "evm-agent-kit";

// Initialize with private key and optional RPC URL
const agent = new EvmAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Create LangChain tools
const tools = createEvmTools(agent);
```

## Usage Examples

### Check ERC20 Token Balance

```typescript
const balance = await agent.getBalance("0x1234567890123456789012345678901234567890");
console.log("Token Balance:", balance);
```

### Transfer ERC20 Tokens

```typescript
const txHash = await agent.transfer(
  "0x1234567890123456789012345678901234567890", // to address
  1.5, // amount
  "0xabcdef1234567890abcdef1234567890abcdef12" // token address (optional for native token)
);
console.log("Transfer Transaction:", txHash);
```

### Launch a Token on Four.meme (BSC)

```typescript
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

### Get Token Price Data from CoinGecko

```typescript
const priceData = await agent.getTokenPriceDataUsingCoingecko(
  "0x1234567890123456789012345678901234567890", // Token address
  "0xabcdef1234567890abcdef1234567890abcdef12" // Another token address
);
console.log("Token prices:", priceData);
```

### Get Trending Tokens

```typescript
const trendingTokens = await agent.getTrendingTokens();
console.log("Trending tokens:", trendingTokens);
```

### Get Protocol TVL from DeFiLlama

```typescript
const tvl = await agent.fetchProtocolTvl("uniswap");
console.log("Uniswap TVL:", tvl);
```

## Supported Chains

The toolkit supports all EVM-compatible chains. Specific features like Four.meme token creation are currently only available on specific chains (BSC for Four.meme).

## Dependencies

The toolkit relies on several key EVM libraries:

- viem for blockchain interactions
- @langchain/core for AI agent tools
- zod for schema validation
- CoinGecko API for market data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute to this project.

## License

Apache-2 License

## Security

This toolkit handles private keys and transactions. Always ensure you're using it in a secure environment and never share your private keys.