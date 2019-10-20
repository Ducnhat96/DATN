import {scroller} from 'react-scroll';

export type Animation =
  'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'

export interface ReactScrollLinkProps {
  to?: string;
  containerId?: string;
  activeClass?: string;
  spy?: boolean;
  hashSpy?: boolean;
  smooth?: boolean | Animation;
  offset?: number;
  delay?: number;
  isDynamic?: boolean;
  duration?: number | string;
  absolute?: boolean;
  ignoreCancelEvents?: boolean;

  onClick?(): void;
  onSetActive?(to: string): void;
  onSetInactive?(): void;
}

const scrollEffect: ReactScrollLinkProps = {
  delay: 100,
  smooth: 'easeInQuart',
  offset: 0,
};

/**
 * Scroll DOM
 * @param el Element ID
 * @param offset Offset after scrolling
 * @param delay
 */
export const scrollDefault = (el: string, delay: number = 0, offset: number = -40): void => {
  scrollEffect.offset = offset;
  scrollEffect.delay  = delay;
  scroller.scrollTo(el, scrollEffect);
};
