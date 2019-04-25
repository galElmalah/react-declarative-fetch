import { throwIfNoContext, consumerCreator } from './index';

describe('context', () => {
  it('should throw if there is no value provided', () => {
    expect(() => throwIfNoContext(null)).toThrow();
  });

  it('should not throw if there is a value provided', () => {
    expect(() => throwIfNoContext({ someValue: '123' })).not.toThrow();
  });

  it('shoud return a function', () => {
    expect(consumerCreator('error')).toBeInstanceOf(Function);
  });
});
