import { getProduct } from '@/services';
import { addWeeks, subMonths } from 'date-fns';
import format from 'date-fns/format';

const today = new Date();
const bornToday = format(today, 'yyyy-MM-dd');
const oneWeekInFuture = format(addWeeks(today, 1), 'yyyy-MM-dd');
const threeMonthOld = format(subMonths(today, 3), 'yyyy-MM-dd');
const tenMonthOld = format(subMonths(today, 10), 'yyyy-MM-dd');
const twelveMonthOld = format(subMonths(today, 12), 'yyyy-MM-dd');

describe('getBirthDateRangeForProduct()', () => {
  it('finds correct product for a child born today', () => {
    const product = getProduct(bornToday);
    expect(product?.id).toBe(1);
  });
  it('finds correct product for a child born in the future', () => {
    const product = getProduct(oneWeekInFuture);
    expect(product?.id).toBe(1);
  });

  it('finds correct product for a three month old', () => {
    const product = getProduct(threeMonthOld);
    expect(product?.id).toBe(2);
  });

  it('finds correct product for a ten month old', () => {
    const product = getProduct(tenMonthOld);
    expect(product?.id).toBe(6);
  });

  it('finds correct product for a twelve month old', () => {
    const product = getProduct(twelveMonthOld);
    expect(product?.id).toBe(undefined);
  });
});
