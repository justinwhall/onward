import '@testing-library/jest-dom/extend-expect'
import DATABASE from './src/lib/db';
import { getMaxDateForProduct } from './src/services';


Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

const maxProduct = DATABASE[DATABASE.length - 1];
const maxAgeDate = getMaxDateForProduct(
  maxProduct.ageMax,
  maxProduct.ageUnit,
).setUTCHours(0, 0, 0, 0);

global.maxAgeDate = maxAgeDate;