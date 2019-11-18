import React, {
  ComponentType,
  useReducer,
  useEffect,
  memo,
  Fragment
} from "react";
import ProfileEdit from "@/views/ProfilePage/ProfileEdit";
import NavTop from "@/components/ToolBar/NavTop";
import { compose } from "recompose";
import { createStyles, withStyles, Theme } from "@material-ui/core";
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
import { withCookies } from "react-cookie";
import Footer from "@/layouts/Main/Footer";
import { makeStyles } from "@material-ui/styles";

export interface IProfileProps {
  classes?: any;
}

interface ILocalProps extends IProfileProps {
  cookies?: Cookies;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    bgColor: {
      backgroundColor: "#fcfcfc"
    }
  })
);

const Profile: ComponentType<IProfileProps> = (props: ILocalProps) => {
  const classes = useStyles(props);
  const { cookies } = props;
  const [state, dispatch] = useReducer(ProfileReducer, ProfileStateInit);
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

export default compose<IProfileProps, any>(withCookies, memo)(Profile);
