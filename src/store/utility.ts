import moment from "moment";
import { extendMoment } from "moment-range";

// @ts-ignore
export const momentRange = extendMoment(moment);

/**
 * Merge `new object` to `old object`
 * @param {T} oldObject
 * @param {Partial<N>} newObject
 * @returns {Partial<N> & T}
 */
export const updateObject = <T, N extends T = T>(
  oldObject: T,
  newObject: Partial<N>
): Partial<N> & T => {
  return {
    ...oldObject,
    ...newObject
  };
};
