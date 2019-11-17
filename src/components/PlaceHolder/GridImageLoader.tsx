import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment } from 'react';
import { compose } from 'recompose';
import ContentLoader from 'react-content-loader';

interface IProps {
  classes?: any
}

// @ts-ignore
const GridImageLoader: ComponentType<IProps> = (props: IProps) => {

  return (
    <Fragment>
      <ContentLoader
        height={440}
        width={1920}
        speed={2}
        primaryColor='#f3f3f3'
        secondaryColor='#e0e2fe'
        {...props}
      >
        <rect x='2.31' y='0.67' rx='0' ry='0' width='960' height='440' />
        <rect x='965.84' y='0.67' rx='0' ry='0' width='480' height='220' />
        <rect x='966.11' y='221.67' rx='0' ry='0' width='480' height='220' />
        <rect x='1448.37' y='0.67' rx='0' ry='0' width='480' height='220' />
        <rect x='1448.23' y='221.67' rx='0' ry='0' width='480' height='220' />
      </ContentLoader>
    </Fragment>
  );
};

export default GridImageLoader;
