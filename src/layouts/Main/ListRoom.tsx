import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, { ComponentType, Fragment, useContext, useReducer } from "react";
import { compose } from "recompose";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridContainer from "@/layouts/Grid/Container";
import ListRoomCity from "@/layouts/Main/ListRoomCity";
import ListRoomCollection from "@/layouts/Main/ListRoomCollection";

import ListRoomHot from "@/layouts/Main/ListRoomHot";
import ListRoomNew from "@/layouts/Main/ListRoomNew";
import {
  RoomHomepageState,
  RoomHomepageAction,
  RoomHotReducer,
  RoomHotStateInit,
  RoomHomepageContext
} from "@/store/context/Room/RoomHomepageContext";
import VillaHomestay from "@/layouts/Main/VillaHomestay";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxListRoom: {
      width: "100%",
      paddingTop: 8,
      paddingBottom: 40
    }
  })
);

// @ts-ignore
const ListRoom: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const [state, dispatch] = useReducer<RoomHomepageState, RoomHomepageAction>(
    RoomHotReducer,
    RoomHotStateInit
  );
  return (
    <Fragment>
      <div className={classes.boxListRoom}>
        <GridContainer xs={10}>
          <RoomHomepageContext.Provider value={{ state, dispatch }}>
            {/* <ListRoomHot /> */}
            <VillaHomestay />
            <ListRoomNew />
            <ListRoomCity />
          </RoomHomepageContext.Provider>
        </GridContainer>
      </div>
    </Fragment>
  );
};

export default ListRoom;
