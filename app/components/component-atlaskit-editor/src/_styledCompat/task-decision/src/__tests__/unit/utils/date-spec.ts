import * as sinon from 'sinon';
import {
  getFormattedDate,
  getStartOfDate,
  isSameDate,
} from '../../../util/date';
import { setHours, subDays, subWeeks, subYears } from 'date-fns';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

describe('util/date', () => {
  let clock: sinon.SinonFakeTimers;
  beforeEach(function() {
    clock = sinon.useFakeTimers(new Date(1985, 9, 24, 13, 0).valueOf());
  });

  afterEach(function() {
    clock.restore();
  });

  describe('getFormattedDate', () => {
    it('Today', () => {
      expect(getFormattedDate(new Date())).toBe('Today');
    });

    it('Yesterday', () => {
      const yesterday = subDays(new Date(), 1);
      expect(getFormattedDate(yesterday)).toBe('Yesterday');
    });

    it('Last week', () => {
      const lastWeek = subWeeks(new Date(), 1);
      expect(getFormattedDate(lastWeek)).toBe(
        `${months[lastWeek.getMonth()]} ${lastWeek.getDate()}`,
      );
    });

    it('Last year', () => {
      const lastYear = subYears(new Date(), 1);
      expect(getFormattedDate(lastYear)).toBe(
        `${
          months[lastYear.getMonth()]
        } ${lastYear.getDate()}, ${lastYear.getFullYear()}`,
      );
    });
  });

  describe('getStartOfDate', () => {
    it('Date returns is same without time component', () => {
      const now = new Date();
      const startOfDate = getStartOfDate(now);
      expect(startOfDate.getFullYear()).toBe(now.getFullYear());
      expect(startOfDate.getMonth()).toBe(now.getMonth());
      expect(startOfDate.getDate()).toBe(now.getDate());
      expect(startOfDate.getHours()).toBe(0);
      expect(startOfDate.getMinutes()).toBe(0);
      expect(startOfDate.getSeconds()).toBe(0);
      expect(startOfDate.getMilliseconds()).toBe(0);
    });
  });

  describe('isSameDate', () => {
    it('Same date with two different times are same', () => {
      const d1 = setHours(new Date(), 12);
      const d2 = setHours(new Date(), 13);
      expect(isSameDate(d1, d2)).toBe(true);
    });

    it('Different date with two sames times are not same', () => {
      const d1 = new Date();
      const d2 = subDays(d1, 1);
      expect(isSameDate(d1, d2)).toBe(false);
    });
  });
});
