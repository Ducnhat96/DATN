import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment } from 'react';
import { compose } from 'recompose';
import ContentLoader from 'react-content-loader';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({});

// @ts-ignore
const ContentPlaceHolder: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;

  return (
    <Fragment>
      <ContentLoader
        height={440}
        width={500}
        speed={2}
        primaryColor='#f3f3f3'
        secondaryColor='#e0e2fe'
        {...props}
      >
        <rect x='3' y='7' rx='4' ry='4' width='450' height='10' />
        <rect x='3' y='28' rx='3' ry='3' width='85' height='10' />
        <rect x='3' y='50' rx='3' ry='3' width='270' height='10' />
        <rect x='3.72' y='76' rx='3' ry='3' width='380' height='10' />
        <rect x='3' y='95' rx='3' ry='3' width='201' height='10' />
      </ContentLoader>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(ContentPlaceHolder);
