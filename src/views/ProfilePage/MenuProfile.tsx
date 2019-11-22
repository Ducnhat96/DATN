import BG from "@/assets/avatar_demo.jpg";
import verifiedMail from "@/assets/verified.png";
import InformationOfHomestay from "@/components/IntroHomestay/InformationOfHomestay";
import GridContainer from "@/layouts/Grid/Container";
import BookingProfile from "@/views/ProfilePage/BookingProfile";

import HomeSweetHome from "@/views/ProfilePage/HomeSweetHome";
import RewardsProfile from "@/views/ProfilePage/RewardsProfile";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Bookmarks from "@material-ui/icons/BookmarksOutlined";
import Person from "@material-ui/icons/PersonOutlined";
import PhotoCamera from "@material-ui/icons/PhotoCameraOutlined";
import React, {
  ChangeEvent,
  ComponentType,
  Fragment,
  useState,
  useContext
} from "react";
import { compose } from "recompose";
import Grow from "@material-ui/core/Grow";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  IProfileContext,
  ProfileContext
} from "@/store/context/Profile/ProfileContext";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Hidden, Drawer, List, Paper } from "@material-ui/core";
import IconMenu from "@material-ui/icons/Menu";
import * as types from "@/store/actions/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { SearchNavAction } from "@/store/reducers/searchNav";
import Loadable from "react-loadable";
import EditProfile from "@/views/ProfilePage/EditProfile";
import InboxIcon from "@material-ui/icons/MoveToInboxRounded";
import NotiIcon from "@material-ui/icons/NotificationsNoneRounded";
import PersonIcon from "@material-ui/icons/PersonOutlineRounded";
import ReviewIcon from "@material-ui/icons/StarBorderRounded";
import { Link } from "react-router-dom";
// const EditProfile = Loadable({
//   loader: (): Promise<any> => import("@/views/ProfilePage/EditProfile"),
//   loading: () => null
// });
// const BookingProfile = Loadable({
//   loader: (): Promise<any> => import("@/views/ProfilePage/BookingProfile"),
//   loading: () => null
// });

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    NaviBottom: {
      position: "fixed",
      zIndex: 9,
      width: "100%",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      justifyContent: "center"
    },

    wrapper: {
      textAlign: "inherit",
      [theme!.breakpoints!.up!("md")]: {
        maxWidth: "1280px !important",
        marginTop: 0
      },

      margin: "40px auto 0 auto",

      width: "auto",
      paddingRight: "24px",
      paddingLeft: "24px"
    },
    boxPadding: {
      padding: 16,
      [theme!.breakpoints!.down!("xs")]: {
        padding: "10px 0"
      }
    },
    paper: {
      width: "22vw",
      height: "100%",
      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      borderRadius: 0
    },
    drawerPaper: {
      width: 300
    },
    sideNavList: {
      padding: "100px 0 0 1vw"
    },
    sideNavItem: {
      "&:hover": {
        backgroundColor: "#fff",
        borderRight: "1px solid red",
        color: "#000"
      },
      "&:focus": {
        backgroundColor: "#fff",
        borderRight: "1px solid red",
        color: "#000"
      },
      padding: "12px 0"
    },
    sideNavItemText: {
      padding: 0,
      textAlign: "left"
    },
    sideNavText: {
      fontSize: 16,
      color: "#767676"
    },
    content: {
      flexGrow: 1,
      [theme!.breakpoints!.up!("md")]: {
        paddingLeft: 300
      }
    },
    viewProfileLink: {
      color: "#484848",
      textDecoration: "none"
    },

    viewProfileTab: {
      width: "100%",
      borderRadius: 4,
      border: "1px solid #c4c4c4",
      marginTop: 20,
      "&:hover": {
        borderColor: "#248489"
      }
    },
  });

interface ITabContainer {
  children: any;
}

interface IMenuProfile {
  classes?: any;
  handleToggleDrawer(value: boolean): void;
}

const TabContainer: ComponentType<ITabContainer> = (props: ITabContainer) => {
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12}>
      {props.children}
    </GridContainer>
  );
};

const MenuProfile: ComponentType<IMenuProfile> = (props: IMenuProfile) => {
  const { classes, handleToggleDrawer } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const [value, setValue] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const { state, dispatch } = useContext<IProfileContext>(ProfileContext);

  const { profile } = state;

  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  const VerticalTabs = withStyles(theme => ({
    flexContainer: {
      flexDirection: "column"
    },
    indicator: {
      display: "none"
    }
  }))(Tabs);

  const MyTab = withStyles(theme => ({
    selected: {
      color: "#248489",
      borderRight: "1px solid #248489",
      fontWeight: "bold"
    },
    wrapper: {
      flexDirection: "initial",
      padding: "6px 0",
      "&:hover": {
        color: "#248489",
        cursor: "pointer"
      }
    },
    labelIcon: {
      minHeight: "initial"
    },
    label: {
      textTransform: "initial",
      fontSize: 16,
      [theme!.breakpoints!.down!(1110)]: {
        fontSize: 14
      }
    },
    labelContainer: {
      textAlign: "inherit"
    }
  }))(Tab);

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Hidden smDown>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Paper className={classes.paper} elevation={0}>
                <List className={classes.sideNavList}>
                  <VerticalTabs
                    value={value}
                    onChange={handleChange}
                    variant={width == "xs" ? "scrollable" : "fullWidth"}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="off"
                  >
                    <MyTab
                      label="Thông tin người dùng"
                      className={classes.sideNavItemText}
                      icon={<PersonIcon />}
                    />

                    <MyTab
                      label="Danh sách phòng"
                      className={classes.sideNavItemText}
                      icon={<NotiIcon />}
                    />
                    {profile ? (
                      <Link
                        to={`/user/${profile!.id}`}
                        className={classes.viewProfileLink}
                      >
                        <MyTab
                          label="Xem Thông Tin"
                          className={classes.viewProfileTab}
                        />
                      </Link>
                    ) : (
                      ""
                    )}

                    {/* <MyTab
                        label="Chỗ ở đã lưu"
                        className={classes.sideNavItemText}
                        icon={<InboxIcon />}
                      />
                      <MyTab
                        label="Đánh giá"
                        className={classes.sideNavItemText}
                        icon={<ReviewIcon />}
                      /> */}
                  </VerticalTabs>
                </List>
              </Paper>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <BottomNavigation
              value={value}
              onChange={handleChange}
              className={classes.NaviBottom}
            >
              <BottomNavigationAction
                label="Hồ sơ"
                value={0}
                icon={<Person />}
              />
              <BottomNavigationAction
                label="Danh sách phòng"
                value={1}
                icon={<Bookmarks />}
              />
              {/* <BottomNavigationAction
                    label="Home"
                    onClick={() => handleToggleDrawer(true)}
                    value={2}
                    icon={<IconMenu />}
                  /> */}
              {/*<BottomNavigationAction label = 'Yêu thích' value = {2} icon = {<Favorite />} />*/}
              {/*<BottomNavigationAction label = 'Điểm thưởng' value = {3} icon = {<CardGift />} />*/}
              {/*<BottomNavigationAction label = 'Thiết lập' value = {4} icon = {<Weekend />} />*/}
            </BottomNavigation>
          </Hidden>

          <Grid item xs={12} sm={12} md={9} lg={9}>
            {value === 0 && (
              <TabContainer>
                {" "}
                <EditProfile />
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer>
                {" "}
                <BookingProfile />
              </TabContainer>
            )}

            {value === 2 && (
              <TabContainer>
                {" "}
                <InformationOfHomestay />
              </TabContainer>
            )}

            {value === 3 && (
              <TabContainer>
                {" "}
                <RewardsProfile />
              </TabContainer>
            )}

            {value === 4 && (
              <TabContainer>
                {" "}
                <HomeSweetHome />
              </TabContainer>
            )}
          </Grid>
        </Grid>
      </div>
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

export default compose<IMenuProfile, any>(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(MenuProfile);
