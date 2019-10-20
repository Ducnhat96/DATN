import PriceRange from '@/components/Rooms/PriceRange';
import SearchProperty from '@/components/Rooms/SearchProperty';
import StarsRatingRoomIndex from '@/components/Rooms/StarsRating';
import {ThemeCustom} from '@/components/Theme/Theme';
import {createStyles, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import classNames from 'classnames';
import React, {ComponentType, Fragment, useState, MouseEvent, TouchEvent, memo} from 'react';
import {compose} from 'recompose';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    marginTop: 8,
  },
  paperPadding: {
    padding: 20,
    transition: theme!.transitions!.create!(['max-height', 'box-shadow'], {
      duration: 500,
      easing: 'ease-in-out',
    }),
    maxHeight: 400,
    overflow: 'hidden',
  },
  notOverflow: {
    overflow: 'visible'
  },
  rating: {
    maxHeight: 116,
  },
  syncHeight: {
    height: 116,
  },
  zDexRating: {
    zIndex: 1,
  },
});

// @ts-ignore
const TopBarFilter: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [ratingSectionStatus, setRatingSectionStatus] = useState<boolean>(false);

  const hoverAbsoluteChange = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    setRatingSectionStatus(true);
  };

  return (
    <Fragment>
      <Grid container spacing = {0} className = {classes.root}>
        <Grid item xs = {4}>
          <Paper elevation = {1} className = {classes.paperPadding} square>
            <PriceRange/>
          </Paper>
        </Grid>
        <Grid item xs = {4} className = {classes.zDexRating}>
          <Paper
            elevation = {ratingSectionStatus ? 10 : 1}
            onMouseEnter = {(e) => hoverAbsoluteChange(e)}
            onTouchStart = {(e) => hoverAbsoluteChange(e)}
            onMouseLeave = {() => setRatingSectionStatus(false)}
            className = {classNames(
              classes.paperPadding, {
                [classes.rating]: !ratingSectionStatus,
              },
            )} square>
            <StarsRatingRoomIndex />
          </Paper>
        </Grid>
        <Grid item xs = {4}>
          <Paper elevation = {1} className = {classNames(
            classes.paperPadding, classes.syncHeight, classes.notOverflow
          )} square>
            <SearchProperty />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose(
  withStyles(styles),
  memo
)(TopBarFilter);
