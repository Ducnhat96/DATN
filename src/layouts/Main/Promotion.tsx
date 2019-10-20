import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { compose } from 'recompose';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { style } from '@/layouts/Main/SearchHome';
import Typography from '@material-ui/core/Typography/Typography';
import { ThemeCustom } from '@/components/Theme/Theme';
import Hidden from '@material-ui/core/Hidden/Hidden';

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  ...style(theme),
  paperSize: {
    height: 400,
    padding: 16
  },
});

const Promotion: FunctionComponent<IProps> = props => {
  const { classes } = props;
  return (
    <Grid item lg={7} md={6} xs={12}>
      {/* <Typography variant = 'h4' className = {classes.heading} color = 'primary' gutterBottom>
        The title of promotions
      </Typography>
      <Typography variant = 'subtitle1' color = 'primary' className = {classes.fontSize}>
        Description
      </Typography> */}
      <Hidden smDown>
        <Grid container spacing={16}>
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

export default compose<IProps, any>(
  withStyles(styles),
)(Promotion);
