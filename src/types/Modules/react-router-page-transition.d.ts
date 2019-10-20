declare module 'react-router-page-transition' {
  import * as React from 'react'

  export interface PageTransition {
    /**
     * Transition time
     */
    timeout?: number
  }

  export default class ReactPageTransition extends React.Component<PageTransition, any> {
  }
}
