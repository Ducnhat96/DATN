import moment, {Moment} from 'moment';
import {ChangeEvent, useMemo} from 'react';
import _ from 'lodash';
import {PromiseCallBack} from '@/types/Requests/RequestTemplate';

/**
 * Format money to user friendly
 * @param amount Money amount
 * @param decimalCount Number of decimal
 * @param decimal Decimal Separator
 * @param thousands Thousand separator
 * @returns {string}
 */
export const formatMoney = (amount: any, decimalCount: number = 0, decimal: string = '.', thousands: string = ','): string | void => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j: number = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') +
           i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
           (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
  } catch (e) {
    console.error(e);
  }
};

export const formatTime = (date: string, hours: number = 0, minutes: number = 0, seconds: number = 0): string => {

  let momentObject: Moment = moment(date, 'YYYY-MM-DD')
    .hours(hours)
    .minutes(minutes)
    .seconds(seconds);

  if (!momentObject.isValid()) throw 'Date format invalid';

  return momentObject.format('YYYY-MM-DD HH:mm:ss');
};

export const arrayFilterCheckBoxEvent = <E extends HTMLInputElement>(current: number[], event: ChangeEvent<E>, status: boolean) => {
  let list  = [...current];
  let value = parseInt(event.target.value);
  status ? list.push(value) : _.remove(list, n => n === value);

  return list;
};

export const selfMemo = <T = any>(value: T): T => {
  return useMemo(() => value, [value]);
};
