import { formatEther, formatUnits } from "viem";
import { EvmAgentKit } from "../../agent";
import { Address } from "viem";
import { getTokenBalance, getTokenDecimals } from "../compound/utils";

/**
 * Get the balance of ETH or an ERC20 token for the agent's wallet
 * @param agent - EvmAgentKit instance
 * @param token_address - Optional ERC20 token address. If not provided, returns ETH balance
 * @returns Promise resolving to the balance as a number (in UI units)
 */
export async function get_erc20_balance(
  agent: EvmAgentKit,
  token_address?: Address,
): Promise<number> {
  if (!token_address) {
    const balance = await agent.connection.getBalance({
      address: agent.wallet_address as Address,
    });
    return Number(formatEther(balance));
  }

  const tokenBalance = await getTokenBalance(agent.wallet, token_address);

  const decimals = await getTokenDecimals(agent.wallet, token_address);

  return Number(formatUnits(tokenBalance, decimals));
}
