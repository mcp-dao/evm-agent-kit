import { Tool } from "langchain/tools";
import { EvmAgentKit } from "../../agent";

export class EvmGetWalletAddressTool extends Tool {
  name = "evm_get_wallet_address";
  description = `Get the wallet address of the agent`;

  constructor(private evmKit: EvmAgentKit) {
    super();
  }

  async _call(_input: string): Promise<string> {
    return this.evmKit.wallet_address.toString();
  }
}
