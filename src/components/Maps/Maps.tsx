import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState,
  memo
} from "react";
import { compose } from "recompose";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  IRoomIndexContext,
  RoomIndexContext,
  getRooms
} from "@/store/context/Room/RoomIndexContext";
import { TransitionCustom, FILTER, TAB_LIST } from "@/views/Rooms/BottomNav";
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from "@material-ui/icons/Close";
import FilterIcon from "@material-ui/icons/FilterListRounded";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Grid from "@material-ui/core/Grid/Grid";
import Slide from "@material-ui/core/Slide/Slide";
import { Coords } from "google-map-react";
import {
  RoomMapContext,
  IRoomMapContext,
} from "@/store/context/Room/RoomMapContext";
import "rc-pagination/assets/index.css";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { animateScroll as scroll } from "react-scroll";
import { ReactScrollLinkProps } from "react-scroll/modules/components/Link";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

import { Hidden, Theme } from "@material-ui/core";
import MapDetail from "@/components/Maps/MapDetail";
import MapRooms from "@/components/Maps/MapRooms";
import MapFilter from "@/components/Maps/MapFilter";
import FilterDrawerM from "@/views/Rooms/Filter/FilterDrawerM";
import { makeStyles } from "@material-ui/styles";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    closeButton: {
      [theme.breakpoints.only("xs")]: {},
      position: "absolute",
      top: 0,
      right: 0
    },
    closeButtonRoot: {
      [theme.breakpoints.only("xs")]: {
        position: "absolute"
      }
    },
    label: {
      [theme.breakpoints.only("xs")]: {
        textAlign: "center",
        backgroundColor: "#fff",
        width: "1.6em",
        height: "1.6em"
      }
    },
    filterButton: {
      position: "absolute",
      bottom: "13%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 999
    },
    list: {
      [theme.breakpoints.up("lg")]: {
        maxHeight: "83vh"
      },
      [theme.breakpoints.between("sm", "md")]: {
        maxHeight: "43vh",
        order: 1,
        marginTop: 10
      },
      [theme.breakpoints.only("xs")]: {
        maxHeight: "47vh",
        order: 1,
        position: "absolute",
        bottom: 5,
        zIndex: 100
      },
      overflow: "auto"
    },
    mapContainer: {
      [theme.breakpoints.up("lg")]: {
        minHeight: "82vh"
      },
      [theme.breakpoints.between("sm", "md")]: {
        minHeight: "46vh"
      },
      [theme.breakpoints.only("xs")]: {
        minHeight: "100vh"
      }
    },
    dialogContent: {
      [theme.breakpoints.only("xs")]: {
        padding: 0
      }
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.only("xs")]: {
        textAlign: "center",
        position: "absolute",
        zIndex: 9999,
        top: -3,
        left: 9
      }
    }
  })
);

// @ts-ignore
const Maps: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const [page, setPage] = useState<number>(1);
  const [index, setIndex] = useState<number>(TAB_LIST);
  const [hoverId, setHoverId] = useState<number>(-1);
  const [roomChunks, setRoomChunks] = useState<RoomIndexRes[]>([]);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });


  const { location, width } = useContext<IGlobalContext>(GlobalContext);
  const { state } = useContext<IRoomIndexContext>(RoomIndexContext);
  const { state: mapState, dispatch: mapDispatch } = useContext<
    IRoomMapContext
  >(RoomMapContext);

  const { rooms } = state;
  const { isMapOpen, coords } = mapState;
  const xsMode = width === "xs";

  const pageChange = (current: number, pageSize: number) => {
    setPage(current);

    let effect: Partial<ReactScrollLinkProps> = {
      containerId: "room-map-list",
      smooth: "easeInOutQuad",
      duration: 400
    };

    scroll.scrollToTop(effect);
  };

  const handleOpenFilter = () => {
    setIndex(FILTER);
  };

  const mapClose = () => {
    mapDispatch({
      type: "setMapOpen",
      status: false
    });
  };

  const hoverAction = (key: number) => {
    setHoverId(key);
  };

  const focusRoomLocation = (room: RoomIndexRes) => {
    setCenter({
      lat: parseFloat(room.latitude),
      lng: parseFloat(room.longitude)
    });
  };

  useEffect(() => {
    if (rooms.length > 0 && isMapOpen) {
      let lat = parseFloat(rooms[0].latitude);
      let lng = parseFloat(rooms[0].longitude);
      let valid = lat < 90 && lat > 90 && lng < 180 && lng > -180;

      let coords: Coords = {
        lat: valid ? lat : 21.02,
        lng: valid ? lng : 105.83
      };

      setCenter(coords);
    }
  }, [rooms.length > 0, isMapOpen]);

  useEffect(() => {
    // console.log(state);
    if (isMapOpen) {
      // setRoomChunks([]);
      getRooms(location, page, coords).then(res => {
        const rooms = res.data;
        setRoomChunks(rooms);
        setHoverId(0);
      });
    }
  }, [page, isMapOpen, coords, location]);




  /**
   * Room List switch between mobile and desktop mode
   */

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={isMapOpen}
        onClose={mapClose}
        TransitionComponent={TransitionCustom}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Hidden xsDown>
            <Typography variant="h6">
              Bản đồ
            </Typography>
            <MapFilter />
          </Hidden>

          <IconButton
            className={classes.closeButton}
            onClick={mapClose}
            classes={{
              root: classes.closeButtonRoot,
              label: classes.label
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={0}>
            <Hidden mdUp>
              <IconButton
                className={classes.filterButton}
                classes={{
                  root: classes.closeButtonRoot,
                  label: classes.label
                }}
                onClick={handleOpenFilter}
              >
                <FilterIcon />
              </IconButton>
              <Dialog
                fullScreen
                open={index === FILTER}
                TransitionComponent={TransitionCustom}
                scroll="paper"
                onClose={() => setIndex(TAB_LIST)}
              >
                <FilterDrawerM setIndex={setIndex} />
              </Dialog>
            </Hidden>
            <Grid
              container
              item
              xs={12}
              lg={5}
              spacing={xsMode ? 0 : 2}
              className={classes.list}
              id="room-map-list"
              justify="center"
            >
              <MapRooms
                page={page}
                pageChange={pageChange}
                hoverId={hoverId}
                hoverAction={hoverAction}
                focusRoomLocation={focusRoomLocation}
                rooms={roomChunks}
              />
            </Grid>
            <Grid item xs={12} lg={7} className={classes.mapContainer}>
              <MapDetail
                hoverId={hoverId}
                center={center}
                hoverAction={hoverAction}
                rooms={roomChunks}
                setRooms={setRoomChunks}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  memo
)(Maps);
