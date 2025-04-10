import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
  PublicClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bsc } from "viem/chains";
import {
  createToken,
  fetchPrices,
  get_erc20_balance,
  getElfaAiApiKeyStatus,
  getFourMemeTrendingTokens,
  getLatestPools,
  getProtocolTvl,
  getSmartMentions,
  getSmartTwitterAccountStats,
  getTokenHoldings,
  getTokenInfo,
  getTokenPriceData,
  getTopGainers,
  getTopMentionsByTicker,
  getTrendingPools,
  getTrendingTokens,
  getTrendingTokensUsingElfaAi,
  pingElfaAiApi,
  purchaseFourMemeToken,
  searchMentionsByKeywords,
  sellToken,
  supply,
  transfer,
} from "../tools";
import { DEFILLAMA_NETWORK_MAPPING } from "../tools/defillama/constants";
import { Config } from "../types";
import { EvmWalletProvider, ViemWalletProvider } from "../wallet-providers";

/**
 * Main class for interacting with Evm blockchains
 * Provides a unified interface for token operations, NFT management, trading and more
 *
 * @class EvmAgentKit
 * @property {PublicClient} connection - EVM RPC connection
 * @property {EvmWalletProvider} wallet - Wallet provider for signing transactions
 * @property {Address} wallet_address - Address of the wallet
 * @property {Config} config - Configuration object
 */
export class EvmAgentKit {
  public connection: PublicClient;
  public wallet: EvmWalletProvider;
  public wallet_address: Address;
  public config: Config | undefined;
  public rpcUrl: string;
  public privateKey: string;

  constructor(private_key: string, rpc_url: string, config?: Config) {
    this.rpcUrl = rpc_url;
    this.connection = createPublicClient({
      transport: http(rpc_url),
    });
    this.wallet_address = privateKeyToAccount(private_key as Address).address;
    this.privateKey = private_key;

    const account = privateKeyToAccount(process.env.EVM_PRIVATE_KEY as Address);

    const client = createWalletClient({
      account,
      // chain: mainnet, // BNB Chain
      chain: bsc,
      transport: http(process.env.RPC_URL!),
    });
    this.wallet = new ViemWalletProvider(client);

    this.config = config;
  }

  async getBalance(token_address?: Address | undefined): Promise<number> {
    return get_erc20_balance(this, token_address);
  }

  async transfer(to: Address, amount: number, mint?: Address): Promise<string> {
    return transfer(this, to, amount, mint);
  }

  async getSupply(
    assetId: string,
    amount: string,
  ): Promise<any | { status: string; summary: any }> {
    return await supply({
      agent: this,
      assetId,
      amount,
    });
  }

  async getFourMemeTokens() {
    return await getTokenHoldings(this);
  }

  async createFourMemeToken(
    tokenManagerAddress: Address, // FourMeme Token Manager Address
    feeInBnb: number,
    name: string,
    shortName: string,
    desc: string,
    imgUrl: string,
    launchTimeFromNow: number,
    label:
      | "Meme"
      | "AI"
      | "Defi"
      | "Games"
      | "Infra"
      | "De-Sci"
      | "Social"
      | "Depin"
      | "Charity"
      | "Others",
    webUrl?: string,
    twitterUrl?: string,
    telegramUrl?: string,
  ) {
    return createToken({
      agent: this,
      tokenManagerAddress,
      bnbAmount: feeInBnb,
      name,
      shortName,
      desc,
      imgUrl,
      launchTimeFromNow,
      label,
      webUrl,
      twitterUrl,
      telegramUrl,
    });
  }

  async getFourMemeTrendingTokens() {
    return await getFourMemeTrendingTokens(this);
  }

  async sellFourMemeToken(
    tokenManagerAddress: Address,
    tokenAddress: Address,
    tokenAmount: bigint,
  ) {
    return await sellToken({
      agent: this,
      tokenManagerAddress,
      tokenAddress,
      tokenAmount,
    });
  }

  async purchaseFourMemeToken(
    tokenManagerAddress: Address,
    tokenAddress: Address,
    tokenAmount: bigint,
  ) {
    return await purchaseFourMemeToken({
      agent: this,
      tokenManagerAddress,
      tokenAddress,
      amount: tokenAmount,
    });
  }

  async fetchTokenPriceByChainId(tokenAddr: string, chainId: number) {
    const chainSlug = DEFILLAMA_NETWORK_MAPPING[chainId];
    const chainTokenIdentifier = `${chainSlug}:${tokenAddr}`;
    return fetchPrices({
      chainTokenAddrStrings: [chainTokenIdentifier],
    });
  }

  async fetchTokenPriceByChainSlug(tokenAddr: string, chainSlug: string) {
    const chainTokenIdentifier = `${chainSlug}:${tokenAddr}`;
    return fetchPrices({
      chainTokenAddrStrings: [chainTokenIdentifier],
    });
  }

  async fetchTokenPrices(chainTokenIdentifiers: string[]) {
    return fetchPrices({
      chainTokenAddrStrings: chainTokenIdentifiers,
    });
  }

  async fetchProtocolTvl(slug: string): Promise<string> {
    return getProtocolTvl(slug);
  }

  async getTokenInfoUsingCoingecko(tokenAddress: string) {
    return await getTokenInfo(this, tokenAddress);
  }

  async getCoingeckoLatestPools() {
    return await getLatestPools(this);
  }

  async getTokenPriceDataUsingCoingecko(...tokenAddresses: string[]) {
    return await getTokenPriceData(this, tokenAddresses);
  }

  async getTopGainersOnCoingecko(
    duration?: "1h" | "24h" | "7d" | "14d" | "30d" | "60d" | "1y",
    noOfCoins?: 300 | 500 | 1000 | "all",
  ) {
    return await getTopGainers(this, duration, noOfCoins);
  }

  async getCoingeckoTrendingPools(duration?: "5m" | "1h" | "24h" | "6h") {
    return await getTrendingPools(this, duration);
  }

  async getTrendingTokensOnCoingecko() {
    return await getTrendingTokens(this);
  }

  async getTrendingTokens(): Promise<any> {
    const response = await getTrendingTokens(this);
    return response;
  }

  async getTrendingTokensUsingElfaAi(): Promise<any> {
    const response = await getTrendingTokensUsingElfaAi(this);
    return response;
  }

  async pingElfaAiApi(): Promise<any> {
    const response = await pingElfaAiApi(this);
    return response;
  }

  async getElfaAiApiKeyStatus(): Promise<any> {
    const response = await getElfaAiApiKeyStatus(this);
    return response;
  }

  async getSmartMentions(
    limit: number = 100,
    offset: number = 0,
  ): Promise<any> {
    const response = await getSmartMentions(this, limit, offset);
    return response;
  }

  async getSmartTwitterAccountStats(username: string): Promise<any> {
    const response = await getSmartTwitterAccountStats(this, username);
    return response;
  }

  async getTopMentionsByTicker(
    ticker: string,
    timeWindow: string = "1h",
    page: number = 1,
    pageSize: number = 10,
    includeAccountDetails: boolean = false,
  ): Promise<any> {
    const response = await getTopMentionsByTicker(
      this,
      ticker,
      timeWindow,
      page,
      pageSize,
      includeAccountDetails,
    );
    return response;
  }

  async searchMentionsByKeywords(
    keywords: string,
    from: number,
    to: number,
    limit: number = 20,
  ): Promise<any> {
    const response = await searchMentionsByKeywords(
      this,
      keywords,
      from,
      to,
      limit,
    );
    return response;
  }
}
