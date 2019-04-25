declare type Pair = [string, any];
interface ICache {
    getPairs(): Pair[];
    save(pair: Pair): void;
    delete(key: string): void;
    get(key: string): any;
    has(key: string): boolean;
    resetCache(): void;
}
export declare const Cache: ICache;
export {};
