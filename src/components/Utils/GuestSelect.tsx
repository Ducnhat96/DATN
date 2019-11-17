import React, { FunctionComponent, memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { compose } from 'recompose';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import CountBar from '@/components/Utils/CountBar';
import BookingTypeSelectBar from '@/components/Home/BookingTypeSelectBar';
import GuestCount from '@/components/Utils/GuestCount.tsx';
import { makeStyles } from '@material-ui/styles';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    searchWrapper: {
      background: "#fffffff7",
      borderRadius: "4px",
      padding: "32px !important",
      paddingBottom: "24px",
      width: "441px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.25)"
    },
    searchTitle: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "20px"
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: 28
      },
      fontSize: "30px",
      lineHeight: "32px",
      letterSpacing: "normal",
      color: "#484848",
      marginBottom: "20px",
      fontWeight: 700
    },
    heading: {
      textTransform: "uppercase"
    },
    fontSize: {
      fontSize: "1.1rem"
    },
    button: {
      margin: 8
    },
    modal: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "15%",
      width: "40%",
      padding: 40
    },
    inputSearch: {
      [theme.breakpoints.only("xs")]: {
        width: "100%",
        maxWidth: "247px"
      },
      [theme.breakpoints.only("xl")]: {
        width: "100%"
      },
      [theme.breakpoints.only("lg")]: {
        width: "100%",
        maxWidth: "389px"
      },
      [theme.breakpoints.only("sm")]: {
        width: "100%",
        maxWidth: "560px"
      },
      [theme.breakpoints.only("md")]: {
        width: "100%",
        maxWidth: "560px"
      },
      width: "100%",
      border: "none",
      fontSize: "1em",
      fontWeight: 300,
      outline: "none"
    },
    searchButton: {
      height: "100%",
      width: "100%",
      fontSize: "0.9rem",
      color: "#FFFFFF",
      background: "linear-gradient(to right, #FFC54D, #FFA712)",
      boxShadow: "none",
      fontWeight: 800,
      "&:hover": {
        background: "linear-gradient(to right, #ff890f, #fc6b09)"
      }
    },
    grayLighten1: {
      color: "#484848"
    },
    spinner: {
      width: "30px !important",
      height: "30px !important"
    },
    marginSearch: {
      marginLeft: 23
    },
    paperCustom: {
      padding: "25px 30px",
      borderRadius: 4,
      backgroundColor: "#fffffff0"
    },
    paperSize: {
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      boxShadow: 'none',
      border: '2px solid #EBEBEB !important'
    },
    countNumber: {
      fontSize: '1.2rem',
      color: '#ff9800',
    },
    textCount: {
      color: '#1f1f1f'
    },
  })
);

// @ts-ignore
const GuestSelect: FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  return (
    <Grid item md={12} xs={12} sm={12}>
      <Paper elevation={0} className={classes.paperSize}>
        <Grid container spacing={1} justify="center">
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
  memo
)(GuestSelect);
