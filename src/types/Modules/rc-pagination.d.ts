declare module 'rc-pagination' {

  import * as React from 'react';

  export interface ReactPaginationProps {
    /**
     * uncontrolled current page
     * @default 1
     */
    defaultCurrent?: number

    /**
     * current page
     * @default undefined
     */
    current?: number

    /**
     * items total count
     * @default 0
     */
    total?: number

    /**
     * default items per page
     * @default 10
     */
    defaultPageSize?: number

    /**
     * items per page
     * @default 10
     */
    pageSize?: number

    /**
     * page change callback
     * @param {number} current
     * @param {number} pageSize
     */
    onChange?(current: number, pageSize: number): void

    /**
     * show pageSize changer
     * @default false
     */
    showSizeChanger?: boolean

    /**
     * specify the sizeChanger selections
     * @default [10,20,30,40]
     */
    pageSizeOptions?: number[]

    /**
     * pageSize change callback
     * @param {number} current
     * @param {number} size
     */
    onShowSizeChange?(current: number, size: number): void

    /**
     * hide on single page
     * @default false
     */
    hideOnSinglePage?: boolean

    /**
     * show jump-prev, jump-next
     * @default true
     */
    showPrevNextJumpers?: boolean

    /**
     * show quick goto jumper
     * @default false / {goButton: true}
     */
    showQuickJumper?: boolean | { goButton: boolean }

    /**
     * show total records and range
     * @param {number} total
     * @param {number} from
     * @param {number} to
     */
    showTotal?(total: number, [from, to]: [number, number]): void

    /**
     * className of pagination
     */
    className?: string

    /**
     * when set, show simple pager
     * @default null
     */
    simple?: object,

    /**
     * to set l10n config
     * @default
     */
    locale?: object

    /**
     * the style of pagination
     */
    style?: object

    /**
     * show less page items
     * @default false
     */
    showLessItems?: boolean

    /**
     * show page items title
     * @default true
     */
    showTitle?: boolean

    /**
     * custom page item renderer
     * @param {number} page
     * @param {string} type
     * @param {React.ReactNode} element
     * @returns {React.ReactNode}
     */
    itemRender?(page: number, type: string, element: React.ReactNode): React.ReactNode;

    /**
     * specific the default previous icon
     */
    prevIcon?: React.ReactNode

    /**
     * specific the default previous icon
     */
    nextIcon?: React.ReactNode

    /**
     * specific the default previous icon
     */
    jumpPrevIcon?: React.ReactNode

    /**
     * specific the default previous icon
     */
    jumpNextIcon?: React.ReactNode
  }

  export default class RcPagination extends React.Component<ReactPaginationProps, any> {

  }
}

declare module 'rc-pagination/lib/locale/*';
