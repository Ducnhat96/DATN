import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useState,
  useContext,
  useEffect,
  memo
} from "react";
import { compose } from "recompose";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import List from "@material-ui/icons/List";
import { Adjust, PinDrop } from "@material-ui/icons";
import FilterDrawerM from "@/views/Rooms/Filter/FilterDrawerM";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import {
  IRoomMapContext,
  RoomMapContext
} from "@/store/context/Room/RoomMapContext";
import Zoom from "@material-ui/core/Zoom/Zoom";
import IconMenu from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SearchNavAction } from "@/store/reducers/searchNav";
import * as types from "@/store/actions/types";

interface IProps {
  classes?: any;
  handleToggleDrawer(openDrawer: boolean): void;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    root: {
      position: "fixed",
      width: "100%",
      bottom: 0,
      height: 60
    }
  });

export const FILTER = 0;
export const TAB_LIST = 1;
export const MAP = 2;
export const NAV = 3;

export const TransitionCustom = (props: any) => (
  <Slide direction="up" {...props} />
);

export const TransitionZoom = (props: any) => <Zoom {...props} />;

// @ts-ignore
const BottomNav: ComponentType<IProps> = (props: IProps) => {
  const { classes, handleToggleDrawer } = props;
  const [index, setIndex] = useState<number>(TAB_LIST);
  const { dispatch: mapDispatch, state: mapState } = useContext<
    IRoomMapContext
  >(RoomMapContext);

  const { isMapOpen } = mapState;

  useEffect(() => {
    if (index === MAP) {
      mapDispatch({
        type: "setMapOpen",
        status: true
      });
    }
  }, [index]);

  useEffect(() => {
    if (!isMapOpen) {
      setIndex(TAB_LIST);
    }
  }, [isMapOpen]);

  return (
    <Fragment> 
      <BottomNavigation
        value={index}
        onChange={(e, value) => {
          setIndex(value);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Bộ lọc" icon={<Adjust />} />
        <BottomNavigationAction label="Danh sách" icon={<List />} />
        <BottomNavigationAction label="Khu vực" icon={<PinDrop />} />
        
      </BottomNavigation>
      <Dialog
        fullScreen
        TransitionComponent={TransitionCustom}
        scroll="paper"
        open={index === FILTER}
        onClose={() => setIndex(TAB_LIST)}
      >
        <FilterDrawerM setIndex = {setIndex}/>
      </Dialog>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<SearchNavAction>) => {
  return {
    handleToggleDrawer: (openDrawer: boolean) =>
      dispatch({
        type: types.TOGGLE_DRAWER,
        openDrawer
      })
  };
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
  connect(
    null,
    mapDispatchToProps
  )
)(BottomNav);
