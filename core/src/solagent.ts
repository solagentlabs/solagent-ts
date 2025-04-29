import { Connection } from '@solana/web3.js';
import { SolAgentWallet } from '@solagent/wallet';
import { SolAgentConfig } from './config';

export class SolAgent {
  constructor(
    public readonly wallet: SolAgentWallet,
    public readonly connection: Connection,
    public readonly config: SolAgentConfig = {}
  ) {}

  static create(
    wallet: SolAgentWallet,
    config: SolAgentConfig = {},
  ): SolAgent {
    const connection = new Connection(wallet.rpcUrl);
    return new SolAgent(wallet, connection, config);
  }

  async function prompt(
    model: SolAgentModel,
    tools: Tool[],
    prompt: string,
    callbacks?: AIStreamCallbacksAndOptions,
  ): Promise<string | ReadableStream<Uint8Array>> {
    try {
      const agent = await createAgent(model, tools);
      return await agent.prompt(prompt, callbacks);
    } catch (error: any) {
      console.error("Error during prompt execution:", error);
      throw new Error(`Failed to get response: ${error.message}`);
    }
  }
}