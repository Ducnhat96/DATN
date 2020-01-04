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
import blue from "@material-ui/core/colors/blue";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
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
import Logo from "@/components/ToolBar/Logo";
import People from "@material-ui/icons/PersonRounded";
import PowerSettingsNewRounded from "@material-ui/icons/PowerSettingsNewRounded";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Orange from "@material-ui/core/colors/orange";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import GridContainer from "@/layouts/Grid/Container";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import { SearchNavAction, SearchNavState } from "@/store/reducers/searchNav";
import * as types from "@/store/actions/types";
import ListCitySearch, {
  TransitionCustom
} from "@/views/Rooms/Filter/ListCitySearch";
import Dialog from "@material-ui/core/Dialog";
import { KeyboardArrowDown } from "@material-ui/icons";
import ForgetPasswordForm from "@/components/Forms/ForgetPasswordForm";

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
    searchWrapper: {
      width: "100%",
      top: 0,
      display: "block",
      content: "''",
      position: "absolute",
      transition: "all 200ms ease-in-out 0ms",
      borderRadius: "8px",
      backgroundImage: "linear-gradient(to bottom,#00000057, transparent)"
    },
    button: {
      padding: "8px 20px",
      fontSize: "0.9375rem",
      color: "#ffffff",
      height: theme!.palette!.button.nav,
      borderRadius: "0px",
      fontWeight: 700,
      textTransform: "capitalize",
      "&:hover": {
        color: '#248489',
        backgroundColor: "transparent",
        borderTop: `2px solid #248489`
      },
      "&:focus": {
        color: '#248489',
        backgroundColor: "transparent",
        borderTop: `2px solid #248489`
      }
    },
    link: {
      textTransform: "inherit",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0)",
        color: blue[500]
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



// @ts-ignore
const NavTopHomePage: FunctionComponent<IProps> = (props: ILocalProps) => {
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
        className={classes.searchWrapper}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Toolbar className={hiddenListCitySearch ? classes.centerLogo : null}>
          <Hidden smDown>
            <Logo />
            <div className={classes.grow} />
            <Button
              href="/host/room-list"
              className={classes.button}
              name="merchant-site"
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

            <Popper
              open={open}
              anchorEl={userRefButton.current}
              
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Paper className={classes.Popper}>
                  <MenuList>
                    <MenuItem
                      name="contact-phone1"
                      component="li"
                      onClick={() => Hotline("tel:0916374057")}
                    >
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      Hotline 1: 0916 374 057
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      name="contact-phone2"
                      onClick={() => Hotline("tel:0946746417")}
                    >
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      Hotline 2: 0946 746 417
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      name="contact-phone3"
                      onClick={() => Hotline("tel:0917041849")}
                    >
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      Dành cho Chủ nhà: 0917 041 849
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      name="contact-email"
                      onClick={() => Hotline("mailto:info@westay.org")}
                    >
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      Email: info@westay.org
                    </MenuItem>
                  </MenuList>
                </Paper>
              </ClickAwayListener>
            </Popper>

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
                            {/*<Divider />*/}
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

            
          </Hidden>
        </Toolbar>

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
    }
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCookies,
  withStyles(styles)
)(NavTopHomePage);
