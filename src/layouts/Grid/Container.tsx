import React, {ComponentType, Fragment} from 'react';
import Grid, {GridSize, GridSpacing} from '@material-ui/core/Grid/Grid';

interface IProps {
  xs: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
  sm?: GridSize
  spacing?: GridSpacing
  className?: string
  classNameItem? : string
}

const GridContainer: ComponentType<IProps> = props => {
  return (
    <Fragment>
      <Grid
        container
        justify = 'center'
        alignContent = 'center'
        className = {props.className}
        spacing={props.spacing ? props!.spacing : 0}
      >
        <Grid item
              xs = {props.xs}
              sm = {props.sm || props.xs}
              md = {props.md || props.xs}
              lg = {props.lg || props.xs}
              xl = {props.xl || props.xs}
              className= {props.classNameItem}>
          {props.children}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GridContainer;
