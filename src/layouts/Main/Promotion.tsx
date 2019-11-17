import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { compose } from 'recompose';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import { ThemeCustom } from '@/components/Theme/Theme';
import Hidden from '@material-ui/core/Hidden/Hidden';
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
    paperSize: {
      height: 400,
      padding: 16
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
  })
);

const Promotion: FunctionComponent<IProps> = props => {
  const classes = useStyles(props);
  return (
    <Grid item lg={7} md={6} xs={12}>
      {/* <Typography variant = 'h4' className = {classes.heading} color = 'primary' gutterBottom>
        The title of promotions
      </Typography>
      <Typography variant = 'subtitle1' color = 'primary' className = {classes.fontSize}>
        Description
      </Typography> */}
      <Hidden smDown>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={6}>
            <Paper elevation={4} className={classes.paperSize} square>
              {/* <img src = {'https://westay.vn/static/media/promotion-83.ad5bb3ae.png'}/> */}
            </Paper>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <Paper elevation={4} className={classes.paperSize} square>

            </Paper>
          </Grid>
          {/* <Grid item md = {6} xs = {6}>
            <Paper elevation = {4} className = {classes.paperSize} square>

            </Paper>
          </Grid>
          <Grid item md = {6} xs = {6}>
            <Paper elevation = {4} className = {classes.paperSize} square>

            </Paper>
          </Grid> */}
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Promotion;
