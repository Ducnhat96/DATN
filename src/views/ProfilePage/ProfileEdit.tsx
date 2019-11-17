import BG from "@/assets/avatar_demo.jpg";
import verifiedMail from "@/assets/verified.png";
import InformationOfHomestay from "@/components/IntroHomestay/InformationOfHomestay";
import GridContainer from "@/layouts/Grid/Container";
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
  useContext,
  useEffect
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
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Theme
} from "@material-ui/core";
import IconMenu from "@material-ui/icons/Menu";

import InboxIcon from "@material-ui/icons/MoveToInboxRounded";
import NotiIcon from "@material-ui/icons/NotificationsNoneRounded";
import PersonIcon from "@material-ui/icons/PersonOutlineRounded";
import ReviewIcon from "@material-ui/icons/StarBorderRounded";
import * as types from "@/store/actions/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { SearchNavAction } from "@/store/reducers/searchNav";
import UserBox from "./ProfileView/UserBox";
import UserDetail from "./ProfileView/UserDetail";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import classNames from "classnames";
import Loadable from "react-loadable";
import "@/styles/profileEdit.scss";
import BookingProfile from "@/views/ProfilePage/BookingProfile";
import { makeStyles } from "@material-ui/styles";

// const BookingProfile = Loadable({
//   loader: (): Promise<any> => import("@/views/ProfilePage/BookingProfile"),
//   loading: () => null
// });
const EditProfile = Loadable({
  loader: (): Promise<any> => import("@/views/ProfilePage/EditProfile"),
  loading: () => null
});
interface ITabContainer {
  children: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapper: {
      [theme.breakpoints.up("md")]: {
        maxWidth: "1280px !important",
        marginTop: "24px !important"
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
    drawer: {
      width: 300,
      flexShrink: 0
    },
    drawerPaper: {
      width: 300
    },
    sideNavList: {
      padding: "130px 0 0 40px"
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
      padding: 0
    },
    sideNavText: {
      fontSize: 16,
      color: "#767676"
    },
    content: {
      flexGrow: 1,
      paddingLeft: 300
    }
  })
);

interface IMenuProfile {
  classes?: any;
  handleToggleDrawer(value: boolean): void;
}

const ProfileEdit: ComponentType<IMenuProfile> = (props: IMenuProfile) => {
  const classes = useStyles(props);
  const { handleToggleDrawer } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const { state, dispatch } = useContext<IProfileContext>(ProfileContext);
  const [value, setValue] = useState<number>(0);

  const { profile } = state;
  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    console.log("fucking big change");
    setValue(value);
  };

  useEffect(() => {
    console.log("value", value);
  }, []);

  const VerticalTabs = withStyles(() => createStyles({
    flexContainer: {
      flexDirection: "column"
    },
    indicator: {
      display: "none"
    }
  }))(Tabs);

  const MyTab = withStyles(() => createStyles({
    selected: {
      color: "#ff9800",
      borderRight: "1px solid #ff9800",
      fontWeight: "bold"
    },
    wrapper: {
      flexDirection: "initial",
      padding: "6px 0"
    },
    labelIcon: {
      minHeight: "initial"
    },
    label: {
      textTransform: "initial",
      fontSize: 16
    },
    labelContainer: {
      textAlign: "left"
    }
  }))(Tab);

  const TabContainer: ComponentType<ITabContainer> = (props: ITabContainer) => {
    return (
      <Typography component="div" style={{ padding: 24 }}>
        {props.children}
      </Typography>
    );
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        {profile ? (
          <GridContainer xs={12} sm={12} md={11} lg={12} xl={12}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <List className={classes.sideNavList}>
                <VerticalTabs
                  value={value}
                  onChange={handleChange}
                  variant={width == "xs" ? "scrollable" : "fullWidth"}
                  scrollButtons="off"
                >
                  <MyTab
                    disableRipple
                    label="Thông tin người dùng"
                    className={classes.sideNavItemText}
                    icon={<PersonIcon />}
                    // primary={text}
                    // classes={{ primary: classes.sideNavText }}
                  />

                  <MyTab
                    disableRipple
                    label="Danh sách phòng"
                    className={classes.sideNavItemText}
                    icon={<NotiIcon />}
                    // primary={text}
                    // classes={{ primary: classes.sideNavText }}
                  />
                  {/* <MyTab
                    disableRipple
                    label="Chỗ ở đã lưu"
                    className={classes.sideNavItemText}
                    icon={<InboxIcon />}
                    // primary={text}
                    // classes={{ primary: classes.sideNavText }}
                  />
                  <MyTab
                    disableRipple
                    label="Đánh giá"
                    className={classes.sideNavItemText}
                    icon={<ReviewIcon />}
                    // primary={text}
                    // classes={{ primary: classes.sideNavText }}
                  /> */}
                </VerticalTabs>
              </List>
            </Drawer>

            <Grid
              item
              // xs={12}
              // sm={12}
              // md={9}
              // lg={9}
              // xl={9}
              className={classes.content}
            >
              {value === 0 && (
                <TabContainer>
                  {/* {" "} */}
                  <EditProfile />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  {/* {" "} */}
                  <BookingProfile />
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <InformationOfHomestay />
                </TabContainer>
              )}
              {value === 3 && (
                <TabContainer>
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
          </GridContainer>
        ) : (
          ""
        )}
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
  connect(
    null,
    mapDispatchToProps
  )
)(ProfileEdit);
