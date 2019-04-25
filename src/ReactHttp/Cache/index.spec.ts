import { Cache } from './index';
describe('Cache mechanisim', () => {
  it('should save key value pairs', () => {
    const [key, value] = ['test', 'someValue'];
    Cache.save([key, value]);
    expect(Cache.getPairs()).toEqual([[key, value]]);
  });

  it('should get the value correspanding to the key', () => {
    const [key, value] = ['test', 'someValue'];
    Cache.save([key, value]);
    expect(Cache.get(key)).toBe(value);
  });

  it('should remove the key,value pair', () => {
    const [key, value] = ['test', 'someValue'];
    Cache.save([key, value]);
    expect(Cache.get(key)).toBe(value);
    Cache.delete(key);
    expect(Cache.get(key)).toBe(undefined);
  });

  it('should return indicate if the key is in the cache', () => {
    const [key, value] = ['test', 'someValue'];
    Cache.save([key, value]);
    expect(Cache.has(key)).toBe(true);
    expect(Cache.has(key + '1')).toBe(false);
  });

  it('should reset the cache', () => {
    const [key, value] = ['test', 'someValue'];
    Cache.save([key, value]);
    expect(Cache.has(key)).toBe(true);
    Cache.resetCache();
    expect(Cache.getPairs()).toEqual([]);
  });
});
