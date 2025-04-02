import { EvmAgentKit } from "../../agent";

/**
 * Get the agents wallet address
 * @param agent - EvmAgentKit instance
 * @returns string
 */
export function get_wallet_address(agent: EvmAgentKit) {
  // return agent.wallet_address.toBase58();
  return agent.wallet_address;
}
