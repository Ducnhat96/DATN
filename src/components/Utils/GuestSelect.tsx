import React, { FunctionComponent, memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { compose } from 'recompose';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { style } from '@/layouts/Main/SearchHome';
import CountBar from '@/components/Utils/CountBar';
import BookingTypeSelectBar from '@/components/Home/BookingTypeSelectBar';
import GuestCount from '@/components/Utils/GuestCount.tsx';

interface IProps {
  classes?: any;
}


const styles: any = (theme: Theme) => createStyles({
  ...style(theme),
  paperSize: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: '#fffffff0',
    boxShadow: 'none',
    border: '2px solid #EBEBEB !important'
  },
  countNumber: {
    fontSize: '1.2rem',
    color: '#248489',
  },
  textCount: {
    color: '#1f1f1f'
  },
});

// @ts-ignore
const GuestSelect: FunctionComponent<IProps> = (props: IProps) => {
  const { classes } = props;

  return (
    <Grid item md={12} xs={12} sm={12}>
      <Paper elevation={0} className={classes.paperSize}>
        <Grid container spacing={8} justify="center">
          <Grid item xs={12}>
            <BookingTypeSelectBar />
            <GuestCount />
            <CountBar
              singular='phòng'
              plural='phòng'
              name='rooms'
              p-classes={classes} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(GuestSelect);
