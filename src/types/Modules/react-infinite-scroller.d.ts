// Type definitions for react-infinite-scroller 1.2
// Project: https://github.com/CassetteRocks/react-infinite-scroller
// Definitions by: Lauri Lavanti <https://github.com/Lapanti>,
//                 Piotr Srebniak <https://github.com/psrebniak>
//                 Brett Miller <https://github.com/WrathZA>
//                 Yipeng Zhao <https://github.com/daggerjames>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-infinite-scroller' {
  import * as React from 'react';

  /**
   * <InfiniteScroll /> properties.
   */
  interface InfiniteScrollProps {
    /**
     * Name of the element that the component should render as.
     * @default 'div'.
     */
    element?: string;
    /**
     * Whether there are more items to be loaded. Event listeners are removed if false.
     * @default false.
     */
    hasMore?: boolean;
    /**
     * Whether the component should load the first set of items.
     * @default true.
     */
    initialLoad?: boolean;
    /**
     * Whether new items should be loaded when user scrolls to the top of the scrollable area.
     * Default to false.
     */
    isReverse?: boolean;
    /**
     * A callback for when more items are requested by the user.
     * Page param is next page index.
     */
    loadMore(page: number): void;
    /**
     * The number of the first page to load, with the default of 0, the first page is 1.
     * @default 0.
     */
    pageStart?: number;
    /**
     * The distance in pixels before the end of the items that will trigger a call to loadMore.
     * @default 250.
     */
    threshold?: number;
    /**
     * Proxy to the useCapture option of the added event listeners.
     * @default false.
     */
    useCapture?: boolean;
    /**
     * Add scroll listeners to the window, or else, the component's parentNode.
     * @default true.
     */
    useWindow?: boolean;
    /**
     * Loader component for indicating "loading more".
     */
    loader?: React.ReactElement<any>;
    /**
     * Override method to return a different scroll listener if it's not the immediate parent of InfiniteScroll.
     */
    getScrollParent?(): HTMLElement | null;
  }

  export default class InfiniteScroll extends React.Component<InfiniteScrollProps, any> {
  }
}

