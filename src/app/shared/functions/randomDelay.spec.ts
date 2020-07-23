import {getRandomDelay} from './randomDelay';

describe('Random delay', () => {
  it('should return value between 200 and 300', () => {
    expect(getRandomDelay(200, 300)).toBeGreaterThanOrEqual(200);
    expect(getRandomDelay(200, 300)).toBeLessThanOrEqual(300);
  });
});
