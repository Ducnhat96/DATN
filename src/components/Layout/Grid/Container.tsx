import React, { Fragment, FC } from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid/Grid';

interface IProps extends Partial<GridProps> {
  classNameItem?: string;
}

const GridContainer: FC<IProps> = (props) => {
  return (
    <Fragment>
      <Grid
        style={props.style}
        onClick={props.onClick}
        container
        justify="center"
        alignContent="center"
        className={props.className}
        spacing={props.spacing || 0}>
        <Grid
          item
          xs={props.xs}
          sm={props.sm}
          md={props.md}
          lg={props.lg}
          xl={props.xl}
          className={props.classNameItem}>
          {props.children}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GridContainer;
