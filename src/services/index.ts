import {
  C_BUCKET_TOO_BIG,
  EEMPTY_B,
  EMPTY_A,
  EVEN_BUCKETS,
  FILL_A,
  FILL_B,
  POUR_INTO_A,
  POUR_INTO_B,
  ERROR_MAP,
} from '@/constants';

interface InitialState {
  containerA: number;
  containerB: number;
  steps: ISteps[];
}

interface Error {
  error: string;
}

function bucketsAreValid(sizeA: number, sizeB: number, target: number): true | string {
  // Check that target is not too big
  if (target > (sizeA + sizeB)) {
    return ERROR_MAP.C_BUCKET_TOO_BIG;
  }

  // Two even buckets can't be used to get an odd number
  if (target % 2 === 1 && sizeA % 2 === 0 && sizeB % 2 === 0) {
    return ERROR_MAP.EVEN_BUCKETS;
  }

  return true;
}

export function calculateSteps(sizeA: number, sizeB: number, target: number): ISteps[] | Error {
  // Check that the buckets are valid
  const isValid = bucketsAreValid(sizeA, sizeB, target);
  if (isValid !== true) {
    return { error: isValid };
  }
  // Create the initial state
  const initialState: InitialState = {
    containerA: 0,
    containerB: 0,
    steps: [],
  };

  // Create the queue and visited set
  const queue = [initialState];
  const visited = new Set<String>();

  // Loop until the queue is empty
  while (queue.length > 0) {
    // Dequeue the next state
    const { containerA, containerB, steps } = queue.shift()!;

    // Check if the target amount is reached
    if (containerA === target || containerB === target) {
      return steps;
    }

    // Generate the next states
    const nextStates = [
      {
        containerA: sizeA,
        containerB,
        desc: FILL_A,
      },
      {
        containerA,
        containerB: sizeB,
        desc: FILL_B,
      },
      {
        containerA: 0,
        containerB,
        desc: EMPTY_A,
      },
      {
        containerA,
        containerB: 0,
        desc: EEMPTY_B,
      },
      {
        containerA: containerA - Math.min(containerA, sizeB - containerB),
        containerB: containerB + Math.min(containerA, sizeB - containerB),
        desc: POUR_INTO_B,
      },
      {
        containerA: containerA + Math.min(containerB, sizeA - containerA),
        containerB: containerB - Math.min(containerB, sizeA - containerA),
        desc: POUR_INTO_A,
      },
    ];

    // Enqueue the unvisited next states
    nextStates.forEach((state) => {
      if (!visited.has(JSON.stringify(state))) {
        queue.push({ ...state, steps: [...steps, state] });
        visited.add(JSON.stringify(state));
      }
    });
  }

  // Return empty array if no solution is found
  return { error: ERROR_MAP.DEFAULT };
}
