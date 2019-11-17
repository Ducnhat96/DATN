import React, { ComponentType, useReducer, useEffect, useContext } from "react";

import NavTop from "@/components/ToolBar/NavTop";
import { compose } from "recompose";
import { createStyles, withStyles, Grid, Paper, Theme } from "@material-ui/core";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  ProfileViewStateInit,
  ProfileViewAction,
  ProfileViewReducer,
  ProfileViewState,
  IProfileViewContext,
  ProfileViewContext
} from "@/store/context/Profile/ProfileViewContext";
import GridContainer from "@/layouts/Grid/Container";
import UserBox from "@/views/ProfilePage/ProfileView/UserBox";
import UserDetail from "@/views/ProfilePage/ProfileView/UserDetail";
import Loadable from 'react-loadable';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { makeStyles } from "@material-ui/styles";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      [theme.breakpoints.up("md")]: {
        maxWidth: "1080px !important",
        marginTop: "120px !important"
      },
      [theme.breakpoints.down("md")]: {
        maxWidth: "960px !important"
      },

      margin: "40px auto 48px auto",

      width: "auto",
      paddingRight: "24px",
      paddingLeft: "24px"
    },
    boxPadding: {
      padding: 16,
      [theme.breakpoints.down("xs")]: {
        padding: "10px 0"
      }
    },
    detailPaper: {
      [theme.breakpoints.up("md")]: {
        marginLeft: 80
      }
    }
  })
);

const ProfileMain: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const { state, dispatch } = useContext<IProfileViewContext>(
    ProfileViewContext
  );

  const { profile } = state;

  return (
    <div className={classes.wrapper}>
      {profile ? (
        <GridContainer xs={12} sm={12} md={11} lg={12} xl={12}>
          <Grid container justify="center">
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              className={classes.boxPadding}
            >
              <Paper elevation={0} className={classes.PaperBooking}>
                <UserBox />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              className={classes.boxPadding}
            >
              <Paper elevation={0} className={classes.detailPaper}>
                <UserDetail />
              </Paper>
            </Grid>
          </Grid>
        </GridContainer>
      ) : (
        <SimpleLoader />
      )}
    </div>
  );
};

export default ProfileMain;
