declare module 'react-star-ratings' {
  import * as React from 'react';

  export interface ReactStarRatingsProps {
    /**
     * The user's rating. Number of stars to highlight.
     * @default 0
     */
    rating?: number;
    /**
     * The max number of stars to choose from or to display
     * @default 5
     */
    numberOfStars?: number;
    /**
     * Callback that will be passed the new rating a user selects
     * @param {number} rating
     */
    changeRating?(rating: number): void;
    /**
     * Color of stars that the user has rated
     * @default 'rgb(109, 122, 130)'
     */
    starRatedColor?: string;
    /**
     * Color of stars that the use hasn't rated
     * @default 'rgb(203, 211, 227)'
     */
    starEmptyColor?: string;
    /**
     * Color of star when hovering over it in selection mode
     * @default 'rgb(230, 67, 47)'
     */
    starHoverColor?: string;
    /**
     * The width and height of the star
     * @default	'50px'
     */
    starDimension?: string;
    /**
     * The spacing between the stars
     * @default '7px'
     */
    starSpacing?: string;
    /**
     * gradientPathname needed if app's path is not at the root
     * @default ''
     */
    gradientPathName?: string;
    /**
     * ignore all the inline styles and write your own css using the provided classes
     * @default false
     */
    ignoreInlineStyles?: boolean;
    /**
     * Set a path that describes the svg shape
     * @default 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z'
     */
    svgIconPath?: string;
    /**
     * Set the view box for a custom svg path you might have
     * @default 	'0 0 51 48'
     */
    svgIconViewBox?: string;
    /**
     * Component's unique identification. Can be used when more than one star rating components are used
     * @default 	''
     */
    name?: string;
  }

  export default class ReactStarRatings extends React.Component<ReactStarRatingsProps, any> {
  }
}

