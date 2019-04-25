type Pair = [string, any];
interface ICache {
  getPairs(): Pair[];
  save(pair: Pair): void;
  delete(key: string): void;
  get(key: string): any;
  has(key: string): boolean;
  resetCache(): void;
}

// workaround to use static interface
export const Cache: ICache = class Cache {
  private static cache = new Map();

  static getPairs(): [string, any][] {
    return Array.from(Cache.cache.entries());
  }

  static save([key, value]: [string, any]) {
    Cache.cache.set(key, value);
  }
  static delete(key: string) {
    Cache.cache.delete(key);
  }
  static get(key: string): any {
    return Cache.cache.get(key);
  }
  static has(key: string): boolean {
    return Cache.cache.has(key);
  }

  static resetCache() {
    Cache.cache = new Map();
  }
};
