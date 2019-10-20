import React, { ComponentType, useReducer, useEffect, memo, Fragment } from "react";
import ProfileEdit from "@/views/ProfilePage/ProfileEdit";
import NavTop from "@/components/ToolBar/NavTop";
import { compose } from "recompose";
import { createStyles, withStyles } from "@material-ui/core";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  ProfileState,
  ProfileAction,
  ProfileReducer,
  ProfileStateInit,
  getDataProfile,
  ProfileContext
} from "@/store/context/Profile/ProfileContext";
import MenuProfile from "./MenuProfile";
import Cookies from "universal-cookie";
import { withCookies } from "react-cookie"
import Footer from "@/layouts/Main/Footer";

export interface IProfileProps {
  classes?: any;
}

interface ILocalProps extends IProfileProps {
  cookies?: Cookies;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    bgColor: {
      backgroundColor: "#fcfcfc"
    }
  });

const Profile: ComponentType<IProfileProps> = (props: ILocalProps) => {
  const { classes, cookies } = props;
  const [state, dispatch] = useReducer<ProfileState, ProfileAction>(
    ProfileReducer,
    ProfileStateInit
  );
  const isLogin = !!cookies!.get("_token");

  useEffect(() => {
    if (!isLogin) {
      window.location.replace("/");
      return;
    }
    getDataProfile(dispatch);
  }, []);

  return (
    <Fragment>
      {isLogin ? (
        <ProfileContext.Provider value={{ state, dispatch }}>
          <div className={classes.bgColor}>
            <NavTop />
            <MenuProfile />
            <Footer />
          </div>
        </ProfileContext.Provider>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default compose<IProfileProps, any>(
  withStyles(styles),
  withCookies,
  memo
)(Profile);
