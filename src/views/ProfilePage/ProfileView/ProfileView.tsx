import React, { ComponentType, useReducer, useEffect, useContext } from "react";
import ProfileMain from "@/views/ProfilePage/ProfileView/ProfileMain";

import NavTop from "@/components/ToolBar/NavTop";
import { compose } from "recompose";
import {match, RouteChildrenProps} from 'react-router';
import { createStyles, withStyles } from "@material-ui/core";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  ProfileViewState,
  ProfileViewAction,
  ProfileViewReducer,
  ProfileViewStateInit,
  getDataProfile,
  ProfileViewContext
} from "@/store/context/Profile/ProfileViewContext";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import Footer from "@/layouts/Main/Footer";

interface IProps extends RouteChildrenProps {
  classes: any;
  match: match<any>
}


const ProfileView: ComponentType<IProps> = (props: IProps) => {
  const { classes, match } = props;
  const {history}           = useContext<IGlobalContext>(GlobalContext);


  const [state, dispatch] = useReducer(
    ProfileViewReducer,
    ProfileViewStateInit
  );



  useEffect(() => {
    let id = parseInt(match.params.id);
    getDataProfile(id, dispatch, history);
    
  }, []);


  return (
    <ProfileViewContext.Provider value={{ state, dispatch }}>
      <div>
        <NavTop />
        <ProfileMain />
        <Footer />
      </div>
    </ProfileViewContext.Provider>
  );
};

export default ProfileView;
