import { ThemeCustom } from "@/components/Theme/Theme";
import RoomListingDetails from "@/views/Rooms/RoomListingDetails";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState
} from "react";
import { compose } from "recompose";
import FilterLeftBar from "@/components/Rooms/FilterLeftBar";
import Hidden from "@material-ui/core/Hidden/Hidden";
import TabFilter from "@/views/Rooms/Filter/TabFilter";
import ListFilterTop from "@/views/Rooms/Filter/ListFilterTop";
import MapVector from "@/assets/map_draw_westay.svg";
import classNames from "classnames";
import Button from "@material-ui/core/Button/Button";
import Maps from "@/components/Maps/Maps";
import {
  RoomMapContext,
  IRoomMapContext
} from "@/store/context/Room/RoomMapContext";
import ScrollTopButton from "@/components/Rooms/ScrollTopButton";
import DateRangeOutline from "@material-ui/icons/DateRangeOutlined";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
// import {Typography} from '@material-ui/core';
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import qs from "query-string";
import RoomRecently from "@/components/Rooms/RoomRecently";
import { ReducersList } from "@/store/reducers";
import { connect } from "react-redux";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import _ from "lodash";
import { getRoom } from "@/store/context/Room/RoomDetailsContext";
import Typography from "@material-ui/core/Typography/Typography";
import moment from "moment";
import { TransitionCustom } from "./BottomNav";
import { Dialog } from "@material-ui/core";
import FilterDrawerM from "./Filter/FilterDrawerM";
import ChangeFilterMobile from "./Filter/ChangeFilterMobile";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

interface LocalProps extends IProps {
  roomRecently: number[];
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 30,
      [theme.breakpoints.between("xs", "sm")]: {
        marginTop: 5
      }
    },
    margin15: {
      marginTop: 15,
      [theme.breakpoints.down("sm")]: {
        marginTop: 0
      }
    },
    ul: {
      listStyleType: "none",
      marginBlockStart: "0px",
      paddingInlineStart: "1rem",
      paddingBlockStart: "0.5rem"
    },
    filterLeft: {
      padding: 14,
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
      borderRadius: 4
    },
    checkboxRoot: {
      padding: 5
    },
    mapPaper: {
      cursor: "pointer",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
      borderRadius: 4,
      overflow: "hidden"
    },
    boxChangeDate: {
      padding: 10,
      marginBottom: 10
    },
    flexBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

// @ts-ignore
const RoomListing: ComponentType<IProps> = (props: LocalProps) => {
  const classes = useStyles(props);
  const { roomRecently } = props;
  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { dispatch: mapDispatch } = useContext<IRoomMapContext>(RoomMapContext);
  const [roomRecentlyData, setRoomRecently] = useState<RoomIndexRes[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const param = qs.parse(location.search!);

  const mapClick = () => {
    mapDispatch({
      type: "setMapOpen",
      status: true
    });
  };

  useEffect(() => {
    Promise.all(
      _.map(roomRecently, o => {
        return getRoom(o);
      })
    )
      .then(res => {
        setRoomRecently(res);
      })
      .catch(err => {});
  }, []);

  return (
    <Fragment>
      <ScrollTopButton />
      <Maps />
      {/* <Hidden smDown>
        <Grid container spacing={0} className={classes.root}>
          <Grid item sm={6}>
            <TabFilter />
          </Grid>
        </Grid>
      </Hidden> */}
      <Grid container spacing={2} className={classes.root}>
        <Hidden smDown>
          <Grid item sm={3}>
            <Paper
              elevation={1}
              onClick={mapClick}
              classes={{
                root: classes.mapPaper
              }}
            >
              <img src={MapVector} alt="map-vector" />
              <Button variant="text" fullWidth style={{ fontWeight: 700 }}>
                Xem bản đồ
              </Button>
            </Paper>
            <Paper
              elevation={1}
              className={classNames(classes.margin15, classes.filterLeft)}
            >
              <FilterLeftBar />
            </Paper>
            {/* <div style = {{
              marginTop: 20,
            }}>
              <Typography variant = 'h6'>Phòng đã xem</Typography>
              {_.map(roomRecentlyData, o => (
                <Grid container spacing = {8} key = {o.id}>
                  <Grid item xs = {12}>
                    <RoomRecently room = {o} />
                  </Grid>
                </Grid>
              ))}
            </div> */}
          </Grid>
        </Hidden>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <Grid container>
            <Hidden smDown>
              <Grid item sm={12}>
                <ListFilterTop />
              </Grid>
            </Hidden>
            <Grid item sm={12} xs={12} className={classes.margin15}>
              <Hidden smUp>
                <Paper
                  className={classes.boxChangeDate}
                  onClick={() => setOpen(true)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={2} className={classes.flexBox}>
                      <DateRangeOutline
                        color="primary"
                        style={{ verticalAlign: "middle", fontSize: 30 }}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="subtitle2"
                        style={{ fontSize: "0.725rem", fontWeight: 700 }}
                      >
                        {moment(param.check_in).format("DD/MM/YYYY")} -{" "}
                        {moment(param.check_out).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        style={{ fontSize: "0.725rem", fontWeight: 700 }}
                      >
                        {param.number_of_guests} khách, {param.number_of_rooms}{" "}
                        phòng
                      </Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.flexBox}>
                      <Button
                        variant="text"
                        color="primary"
                        style={{
                          fontSize: "0.64rem",
                          verticalAlign: "-webkit-baseline-middle"
                        }}
                      >
                        Thay đổi
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                <Dialog
                  fullScreen
                  TransitionComponent={TransitionCustom}
                  scroll="paper"
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <ChangeFilterMobile setOpen={setOpen} />
                </Dialog>

                {/* end dialog */}
              </Hidden>
              <RoomListingDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    roomRecently: state.searchFilter.roomRecently
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps),
)(RoomListing);
