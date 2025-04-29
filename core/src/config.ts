// SolAgentConfig interface
export interface SolAgentConfig {
    jupiterReferralAccount?: string; // Optional
    jupiterFeeBps?: number; // Optional; Assuming fee is represented as a percentage (0-10000)
    flashPrivilege?: string; // Optional
    flexlendApiKey?: string; // Optional
    heliusApiKey?: string; // Optional
    cookieApiKey?: string; // Optional
    birdeyeApiKey?: string; // Optional
}

// SolAgentConfigBuilder class
export class SolAgentConfigBuilder {
    private jupiterReferralAccount?: string;
    private jupiterFeeBps?: number;
    private flashPrivilege?: string;
    private flexlendApiKey?: string;
    private heliusApiKey?: string;
    private cookieApiKey?: string;
    private birdeyeApiKey?: string;

    // Setters for each property
    public setJupiterReferralAccount(account: string): this {
        this.jupiterReferralAccount = account;
        return this;
    }

    public setJupiterFeeBps(fee: number): this {
        this.jupiterFeeBps = fee;
        return this;
    }

    public setFlashPrivilege(privilege: string): this {
        this.flashPrivilege = privilege;
        return this;
    }

    public setFlexlendApiKey(key: string): this {
        this.flexlendApiKey = key;
        return this;
    }

    public setHeliusApiKey(key: string): this {
        this.heliusApiKey = key;
        return this;
    }

    public setCookieApiKey(key: string): this {
        this.cookieApiKey = key;
        return this;
    }

    public setBirdeyeApiKey(key: string): this {
        this.birdeyeApiKey = key;
        return this;
    }

    // Build method to return the final configuration object
    public build(): SolAgentConfig {
        return {
            jupiterReferralAccount: this.jupiterReferralAccount,
            jupiterFeeBps: this.jupiterFeeBps,
            flashPrivilege: this.flashPrivilege,
            flexlendApiKey: this.flexlendApiKey,
            heliusApiKey: this.heliusApiKey,
            cookieApiKey: this.cookieApiKey,
            birdeyeApiKey: this.birdeyeApiKey,
        };
    }
}