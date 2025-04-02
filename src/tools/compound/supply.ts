import { parseUnits, formatUnits, encodeFunctionData } from "viem";
import { COMET_ABI } from "./constants";
import {
  getCometAddress,
  getAssetAddress,
  getHealthRatio,
  getTokenDecimals,
  getTokenBalance,
  getTokenSymbol,
} from "./utils";
import { approve } from "../../utils";
import { EvmAgentKit } from "../../agent";

/**
 * Supply assets to Compound
 * @param agent - The agent instance
 * @param args - The supply arguments containing assetId and amount
 * @returns A string with the result of the supply operation
 */
export async function supply(props: {
  agent: EvmAgentKit;
  assetId: string;
  amount: string;
}): Promise<string | { status: string; summary: any }> {
  const { agent, assetId, amount } = props;
  try {
    const network = agent.wallet.getNetwork();
    const cometAddress = getCometAddress(network);
    const tokenAddress = getAssetAddress(network, assetId);

    if (!tokenAddress) {
      throw new Error(`Token address undefined for assetId ${assetId}`);
    }

    const decimals = await getTokenDecimals(agent.wallet, tokenAddress);
    const amountAtomic = parseUnits(amount, decimals);

    // Check wallet balance before proceeding
    const walletBalance = await getTokenBalance(agent.wallet, tokenAddress);
    if (walletBalance < amountAtomic) {
      const humanBalance = formatUnits(walletBalance, decimals);
      return `Error: Insufficient balance. You have ${humanBalance}, but trying to supply ${amount}`;
    }

    // Get current health ratio for reference
    const currentHealth = await getHealthRatio(agent.wallet, cometAddress);

    // Approve Compound to spend tokens
    const approvalResult = await approve(
      agent.wallet,
      tokenAddress,
      cometAddress,
      amountAtomic,
    );
    if (approvalResult.startsWith("Error")) {
      return `Error approving token: ${approvalResult}`;
    }

    // Supply tokens to Compound
    const data = encodeFunctionData({
      abi: COMET_ABI,
      functionName: "supply",
      args: [tokenAddress, amountAtomic],
    });

    const txHash = await agent.wallet.sendTransaction({
      to: cometAddress,
      data,
    });
    await agent.wallet.waitForTransactionReceipt(txHash);

    // Get new health ratio and token symbol
    const newHealth = await getHealthRatio(agent.wallet, cometAddress);
    const tokenSymbol = await getTokenSymbol(agent.wallet, tokenAddress);

    // Format the amount for display
    const formattedAmount = formatUnits(amountAtomic, decimals);

    return {
      status: "success",
      summary: {
        supplyBalance: formattedAmount,
        tokenSymbol: tokenSymbol,
        tokenDecimals: decimals,
        txHash: txHash,
        healthRatio: {
          before: currentHealth.toFixed(2),
          after: newHealth.toFixed(2),
        },
      },
    };
    // Construct a detailed success message
    // return `Successfully supplied ${formattedAmount} ${tokenSymbol} to Compound. Transaction hash: ${txHash}. Health ratio changed from ${currentHealth.toFixed(2)} to ${newHealth.toFixed(2)}.`;
  } catch (error) {
    return `Error supplying to Compound: ${
      error instanceof Error
        ? error.message
        : error && typeof error === "object" && "message" in error
          ? `Error: ${error.message}`
          : error
    }`;
  }
}
