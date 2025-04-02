import { EvmAgentKit } from "../../agent";
import { Address, erc20Abi, encodeFunctionData } from "viem";
import { parseUnits } from "viem";

/**
 * Transfer ETH or ERC20 tokens to a recipient
 * @param agent EvmAgentKit instance
 * @param destination Recipient's address
 * @param amount Amount to transfer in token units
 * @param tokenAddress Optional ERC20 token address. If not provided, transfers ETH
 * @returns Transaction hash
 */
export async function transfer(
  agent: EvmAgentKit,
  destination: Address,
  amount: number,
  tokenAddress?: Address,
): Promise<Address> {
  try {
    if (!tokenAddress) {
      // Transfer native ETH
      const hash = await agent.wallet.sendTransaction({
        to: destination,
        value: parseUnits(amount.toString(), 18),
      });
      return hash;
    } else {
      // Transfer ERC20 token
      // const decimals = await agent.connection.readContract({
      //   address: tokenAddress,
      //   abi: erc20Abi,
      //   functionName: "decimals",
      // });

      // const { request } = await agent.connection.simulateContract({
      //   address: tokenAddress,
      //   abi: erc20Abi,
      //   functionName: "transfer",
      //   args: [destination, parseUnits(amount.toString(), decimals)],
      //   account: agent.wallet,
      // });

      // Fallback to regular transfer
      // Get token decimals first to ensure correct amount parsing
      const decimals = await agent.connection.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      });

      const hash = await agent.wallet.sendTransaction({
        to: tokenAddress,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [destination, parseUnits(amount.toString(), Number(decimals))],
        }),
      });
      return hash;
    }
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
}
