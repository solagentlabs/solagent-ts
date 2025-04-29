import { SolAgentWallet, SolAgentWalletError } from '../src/wallet';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('SolAgentWallet', () => {
    const rpcUrl = 'http://localhost:8899'; // Replace with your RPC URL for testing

    it('should create a new wallet with a random keypair', () => {
        const wallet = new SolAgentWallet(rpcUrl);
        expect(wallet).toBeInstanceOf(SolAgentWallet);
        expect(wallet.keypair).toBeDefined();
        expect(wallet.pubkey).toBeDefined();
        expect(wallet.rpcUrl).toBe(rpcUrl);
    });

    it('should create a wallet from a base58 encoded private key', () => {
        const privateKey = '589tRkopeUjvRjSJnKtiCtcnyVYTmqJWFKsd99G1o2CRN2MqJLmdV9imC65avY9vJFv3as92J9dk4tYMfQcfoys'; // Replace with a valid private key for testing
        const wallet = SolAgentWallet.fromBase58(privateKey, rpcUrl);
        expect(wallet).toBeInstanceOf(SolAgentWallet);
        expect(wallet.pubkey).toBe('93s2JAfNAWvK собственные данные'); // Replace with the expected public key for the private key above
        expect(wallet.rpcUrl).toBe(rpcUrl);
    });

    it('should throw an error if the base58 encoded private key is invalid', () => {
        const invalidPrivateKey = 'invalid-private-key';
        expect(() => SolAgentWallet.fromBase58(invalidPrivateKey, rpcUrl)).toThrowError(SolAgentWalletError);
    });

    it('should create a wallet from an environment variable', () => {
        const privateKey = '589tRkopeUjvRjSJnKtiCtcnyVYTmqJWFKsd99G1o2CRN2MqJLmdV9imC65avY9vJFv3as92J9dk4tYMfQcfoys'; // Replace with a valid private key for testing
        process.env.TEST_PRIVATE_KEY = privateKey;
        const wallet = SolAgentWallet.fromEnv('TEST_PRIVATE_KEY', rpcUrl);
        expect(wallet).toBeInstanceOf(SolAgentWallet);
        expect(wallet.pubkey).toBe('93s2JAfNAWvK собственные данные'); // Replace with the expected public key for the private key above
        expect(wallet.rpcUrl).toBe(rpcUrl);
        delete process.env.TEST_PRIVATE_KEY;
    });

    it('should throw an error if the environment variable is not found', () => {
        expect(() => SolAgentWallet.fromEnv('NON_EXISTENT_VARIABLE', rpcUrl)).toThrowError(SolAgentWalletError);
    });

    it('should return the base58 encoded private key', () => {
        const privateKey = '589tRkopeUjvRjSJnKtiCtcnyVYTmqJWFKsd99G1o2CRN2MqJLmdV9imC65avY9vJFv3as92J9dk4tYMfQcfoys'; // Replace with a valid private key for testing
        const wallet = SolAgentWallet.fromBase58(privateKey, rpcUrl);
        expect(wallet.toBase58()).toBe(privateKey);
    });

    it('should save the wallet to a file and load it back', () => {
        const wallet = new SolAgentWallet(rpcUrl);
        const tmpDir = os.tmpdir();
        const filePath = path.join(tmpDir, 'test-wallet.key');
        wallet.saveToFile(filePath);
        const loadedWallet = SolAgentWallet.fromFile(filePath, rpcUrl);
        expect(loadedWallet).toBeInstanceOf(SolAgentWallet);
        expect(loadedWallet.pubkey).toBe(wallet.pubkey);
        expect(loadedWallet.rpcUrl).toBe(rpcUrl);
        fs.unlinkSync(filePath); // Clean up the file after the test
    });

    it('should throw an error if saving to a file fails', () => {
        const wallet = new SolAgentWallet(rpcUrl);
        const filePath = '/path/to/non/existent/directory/wallet.key'; // Replace with a path that will cause an error
        expect(() => wallet.saveToFile(filePath)).toThrowError(SolAgentWalletError);
    });

    it('should throw an error if loading from a file fails', () => {
        const filePath = '/path/to/non/existent/file.key'; // Replace with a path that will cause an error
        expect(() => SolAgentWallet.fromFile(filePath, rpcUrl)).toThrowError(SolAgentWalletError);
    });

    it('should throw an error if the key in the file is invalid', () => {
        const tmpDir = os.tmpdir();
        const filePath = path.join(tmpDir, 'test-wallet.key');
        fs.writeFileSync(filePath, 'invalid-key');
        expect(() => SolAgentWallet.fromFile(filePath, rpcUrl)).toThrowError(SolAgentWalletError);
        fs.unlinkSync(filePath); // Clean up the file after the test
    });
});