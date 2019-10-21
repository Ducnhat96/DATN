import { ThemeCustom } from "@/components/Theme/Theme";
import to from "@/components/Utils/to";
import * as animation from "@/store/actions/animationTypes";
import { ReducersList } from "@/store/reducers";
import {
  AnimationState,
  AnimationAction
} from "@/store/reducers/Visual/global-animation";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Toolbar from "@material-ui/core/Toolbar";
import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  useRef,
  useState
} from "react";
import { withCookies } from "react-cookie";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import Cookies from "universal-cookie";
import Hidden from "@material-ui/core/Hidden/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { ISideDrawerProps } from "@/components/ToolBar/SideDrawer";
import Logo from "@/components/ToolBar/Logo";
import People from "@material-ui/icons/PersonRounded";
import PowerSettingsNewRounded from "@material-ui/icons/PowerSettingsNewRounded";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import GridContainer from "@/layouts/Grid/Container";
import Popover from "@material-ui/core/Popover";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import { SearchNavAction, SearchNavState } from "@/store/reducers/searchNav";
import * as types from "@/store/actions/types";
import ForgetPasswordForm from "../Forms/ForgetPasswordForm";
import IconMenu from "@material-ui/icons/Menu";

interface IProps {
  classes: any;
  hiddenListCitySearch?: boolean;
}

interface ILocalProps extends IProps {
  animation: AnimationState;
  cookies: Cookies;
  filter: SearchFilterState;
  searchNavMobile: SearchNavState;

  handleLoginButton(status: boolean): void;
  handleSignUpAnimation(status: boolean): void;
  handleOpenSearchMobile(openSearch: boolean): void;
  handleToggleDrawer(openDrawer: boolean): void;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    containter: {
      zIndex: 1100,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    grow: {
      flexGrow: 1,
      marginLeft: "20px",
      [theme!.breakpoints!.only!("xs")]: {
        marginLeft: 0
      }
    },
    centerLogo: {
      justifyContent: "center"
    },
    button: {
      height: theme!.palette!.button.nav,
      borderRadius: "0px",
      fontWeight: 700,
      textTransform: "capitalize",
      "&:hover": {
        color: "#248489",
        backgroundColor: "transparent",
        borderTop: "2px solid #248489"
      },
      "&:focus": {
        color: "#248489",
        backgroundColor: "transparent",
        borderTop: "2px solid #248489"
      }
    },
    buttonMerchantSite: {
      height: "unset",
      textTransform: "capitalize",
      color: "#248489",
      borderRadius: 10,
      fontWeight: 700,
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
      marginRight: 16,
      MozTransition: "all 0.5s",
      WebkitTransition: "all 0.5s",
      transition: "all 0.5s",
      "&:hover": {
        color:"#248489",
        backgroundColor: "#f9f9f9",
        boxShadow: "none"
      }
    },
    link: {
      textTransform: "inherit",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0)",
        color: "#248489"
      }
    },
    menuButton: {
      marginLeft: -28,
      marginRight: 20
    },
    drawer: {
      [theme!.breakpoints!.only!("xs")]: {
        width: "80%"
      },
      width: "60%"
    },
    Popper: {
      zIndex: 999999
    },
    support: {
      top: "3em"
    },
    listSupport: {
      listStyle: "none"
    },
    roomType: {
      color: "rgb(118, 118, 118)",
      overflow: "hidden",
      fontSize: "1em",
      padding: "0.3em 0.5em",
      borderRadius: "4px",
      border: "1px solid #ffa726",
      whiteSpace: "normal",
      textOverflow: "ellipsis",
      letterSpacing: "normal",
      textAlign: "center"
    },
    fab: {
      margin: theme!.spacing!.unit
    },
    rightIcon: {
      marginLeft: theme!.spacing!.unit
    },
    textSpan: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });

const LoginForm = Loadable({
  loader: (): Promise<any> => import("@/components/Forms/LoginForm"),
  loading: () => {
    return null;
  }
});

const SignUpForm = Loadable({
  loader: (): Promise<any> => import("@/components/Forms/RegisterForm"),
  loading: () => null
});

const SideDrawer = Loadable<ISideDrawerProps, any>({
  loader: () => import("@/components/ToolBar/SideDrawer"),
  loading: () => null
});

// @ts-ignore
const NavTop: FunctionComponent<IProps> = (props: ILocalProps) => {
  const {
    classes,
    cookies,
    filter,
    handleOpenSearchMobile,
    searchNavMobile,
    handleToggleDrawer,
    hiddenListCitySearch
  } = props;

  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const userRefButton = useRef(null);

  const closeMenu = () => {
    setMenuStatus(false);
  };

  const Hotline = (contact: string) => {
    window.location.href = `${contact}`;
  };

  const logoutTrigger = () => {
    window.location.reload();
    cookies.remove("_token", {
      path: "/"
    });
  };

  const loginButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleLoginButton(true);
  };

  const signUpButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleSignUpAnimation(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSearchMobile = () => {
    handleOpenSearchMobile(false);
  };

  return (
    <Fragment>
      <GridContainer
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={10}
        classNameItem={classes.containter}
      >
        <AppBar
          elevation={0}
          position="static"
          color="secondary"
          style={{ backgroundColor: "#fffffff0" }}
        >
          <Toolbar className={hiddenListCitySearch ? classes.centerLogo : null}>
            <Hidden smDown>
              <Logo />
              <div className={classes.grow} />
              <Button
                href="#"
                className={classes.buttonMerchantSite}
                name="merchant-site"
                size="large"
              >
                Kênh chủ nhà
              </Button>

              <Button
                onClick={() => setOpen(!open)}
                buttonRef={userRefButton}
                name="support"
                color="inherit"
                className={classes.button}
              >
                Trợ giúp
              </Button>

              <Popover
                open={open}
                anchorEl={userRefButton.current}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper>
                    <MenuList>
                      <MenuItem
                        name="contact-phone1"
                        component="li"
                        onClick={() => Hotline("tel:0916374057")}
                      >
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        Hotline: 0396899593
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        name="contact-email"
                        onClick={() => Hotline("mailto:phamducnhat96bkhn@gmail.com")}
                      >
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        Email: phamducnhat96bkhn@gmail.com
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              </Popover>
              {cookies.get("_token") ? (
                <Fragment>
                  <Button
                    name="avatar"
                    buttonRef={userRefButton}
                    color="inherit"
                    className={classes.button}
                    onClick={() => setMenuStatus(!menuStatus)}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Avatar>
                      <People />
                    </Avatar>
                  </Button>
                  <Popper
                    open={menuStatus}
                    anchorEl={userRefButton.current}
                    transition
                    className={classes.Popper}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                          minWidth: 300
                        }}
                      >
                        <Paper elevation={1}>
                          <ClickAwayListener onClickAway={closeMenu}>
                            <MenuList>
                              <MenuItem
                                name="profile"
                                onClick={closeMenu}
                                {...to("/profile")}
                              >
                                <ListItemIcon>
                                  <AccountCircleOutlined />
                                </ListItemIcon>
                                Thông tin cá nhân
                              </MenuItem>
                              <Divider />
                              <MenuItem name="sign-out" onClick={logoutTrigger}>
                                <ListItemIcon>
                                  <PowerSettingsNewRounded />
                                </ListItemIcon>
                                Đăng xuất
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Fragment>
              ) : (
                  <Fragment>
                    <Button
                      name="sign-in"
                      color="inherit"
                      className={classes.button}
                      onClick={loginButtonClick}
                      onMouseOver={() => LoginForm.preload()}
                    >
                      Đăng nhập
                  </Button>
                    <Button
                      name="sign-up"
                      color="inherit"
                      className={classes.button}
                      onClick={signUpButtonClick}
                      onMouseOver={() => SignUpForm.preload()}
                    >
                      Đăng ký
                  </Button>
                  </Fragment>
                )}
            </Hidden>
            <Hidden mdUp>
              <Logo />
              <div className={classes.grow} />
              <IconMenu onClick={() => handleToggleDrawer(true)} />

              <Fragment>
                <div>
                  <SwipeableDrawer
                    disableSwipeToOpen
                    open={searchNavMobile.openDrawer}
                    onOpen={() => handleToggleDrawer(true)}
                    onClose={() => handleToggleDrawer(false)}
                    ModalProps={{
                      keepMounted: true // Better open performance on mobile.
                    }}
                    classes={{
                      paper: classes.drawer
                    }}
                  >
                    <SideDrawer setOpen={handleToggleDrawer} />
                  </SwipeableDrawer>
                </div>
              </Fragment>
            </Hidden>
          </Toolbar>
        </AppBar>
        {props.animation.isLoginFormOpen && <LoginForm />}
        {props.animation.isSignUpFormOpen && <SignUpForm />}
        {props.animation.isForgetPasswordFormOpen && <ForgetPasswordForm />}
      </GridContainer>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate,
    filter: state.searchFilter,
    searchNavMobile: state.searchNavMobile
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<AnimationAction | SearchNavAction>
) => {
  return {
    handleLoginButton: (status: boolean) =>
      dispatch({
        type: animation.LOGIN_BUTTON_CLICK,
        status: status
      }),
    handleSignUpAnimation: (status: boolean) =>
      dispatch({
        type: animation.SIGN_UP_BUTTON_CLICK,
        status: status
      }),
    handleOpenSearchMobile: (openSearch: boolean) => {
      dispatch({
        type: types.TOGGLE_SEARCH_NAV_MOBILE,
        openSearch: openSearch
      });
    },
    handleToggleDrawer: (openDrawer: boolean) =>
      dispatch({
        type: types.TOGGLE_DRAWER,
        openDrawer
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCookies,
  withStyles(styles)
)(NavTop);
