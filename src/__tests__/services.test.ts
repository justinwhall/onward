import {
  EMPTY_A,
  ERROR_MAP,
  FILL_A,
  FILL_B,
  POUR_INTO_A,
  POUR_INTO_B,
} from '@/constants';
import { calculateSteps } from '@/services';

describe('calculateSteps()', () => {
  it('should find the most efficient steps to get 4 units of water with containers of sizes 3 and 5', () => {
    const result = calculateSteps(3, 5, 4);
    expect(result).toEqual([
      {
        containerA: 0,
        containerB: 5,
        desc: FILL_B,
      },
      {
        containerA: 3,
        containerB: 2,
        desc: POUR_INTO_A,
      },
      {
        containerA: 0,
        containerB: 2,
        desc: EMPTY_A,
      },
      {
        containerA: 2,
        containerB: 0,
        desc: POUR_INTO_A,
      },
      {
        containerA: 2,
        containerB: 5,
        desc: FILL_B,
      },
      {
        containerA: 3,
        containerB: 4,
        desc: POUR_INTO_A,
      },
    ]);
  });

  it('should find the most efficient steps to get 2 units of water with containers of sizes 1 and 10', () => {
    const result = calculateSteps(1, 10, 2);
    expect(result).toEqual([
      {
        containerA: 1,
        containerB: 0,
        desc: FILL_A,
      },
      {
        containerA: 0,
        containerB: 1,
        desc: POUR_INTO_B,
      },
      {
        containerA: 1,
        containerB: 1,
        desc: FILL_A,
      },
      {
        containerA: 0,
        containerB: 2,
        desc: POUR_INTO_B,
      },
    ]);
  });

  it('should return and error that the C bucket is too large to solve for', () => {
    const result = calculateSteps(1, 10, 20);
    expect(result).toEqual({ error: ERROR_MAP.C_BUCKET_TOO_BIG });
  });

  it('should return and error that two even buckets can not result in an odd answer', () => {
    const result = calculateSteps(2, 10, 3);
    expect(result).toEqual({ error: ERROR_MAP.EVEN_BUCKETS });
  });

  it('should return and C cannot be solved', () => {
    const result = calculateSteps(3, 6, 2);
    expect(result).toEqual({ error: ERROR_MAP.DEFAULT });
  });
});
