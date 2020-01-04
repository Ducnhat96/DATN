import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  Dispatch,
  memo,
  useContext,
} from "react";
import { compose } from "recompose";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";
import { ReducersList } from "@/store/reducers";
import { AnimationAction } from "@/store/reducers/Visual/global-animation";
import * as animation from "@/store/actions/animationTypes";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Cookies from "universal-cookie";
import to from "@/components/Utils/to";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

export interface ISideDrawerProps {
  classes?: any;
  setOpen(value: boolean): void;
}

interface ILocalProps extends ISideDrawerProps {
  cookies: Cookies;

  handleLoginButton(status: boolean): void;
  handleRegisterButton(status: boolean): void;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    list: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%"
    },
    img: {
      width: "100%",
      backgroundPosition: "center",
      maxHeight: 200,
      backgroundSize: "cover",
      objectFit: "cover",
      backgroundRepeat: "no-repeat"
    },
    signOut: {
      color: "#FFA712",
      fontSize: 16,
      lineHeight: "22px",
      letterSpacing: "normal",
      fontWeight: 600,
      display: "block",
      position: "relative",
      textDecoration: "none"
    },
    listItem: {
      padding: 0
    },
    listItemGutters: {
      paddingLeft: 24,
      paddingRight: 24
    },
    text: {
      fontSize: 16,
      lineHeight: "22px",
      letterSpacing: "normal",
      fontWeight: 600,
      display: "block",
      position: "relative",
      textDecoration: "none"
    },
    hotline: {
      fontWeight: 800
    },
    becomeHost: {
      textAlign: "center",
      padding: "12px 20px",
      color: " #FFFFFF",
      background: "linear-gradient(to right, #FFC54D, #FFA712)",
      boxShadow: "none",
      fontWeight: 800,
      borderRadius: "100px !important"
    },
  });

// @ts-ignore
const SideDrawer: ComponentType<ISideDrawerProps> = (props: ILocalProps) => {
  const { classes, handleLoginButton, setOpen, cookies, handleRegisterButton } = props;

  const isLogin = !!cookies.get("_token");
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const logoutTrigger = () => {
    cookies.remove("_token", {
      path: "/"
    });
    setOpen(false);
    history.push("/");
  };

  return (
    <Fragment>
      <List className={classes.list}>
        <div className="top">
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            component="a"
            href="https://merchant.westay.vn"
            button
            onClick={() => setOpen(false)}
          >
            <ListItemText
              primary="Trở thành chủ nhà"
              classes={{
                primary: classes.becomeHost,
                root: classes.listItem
              }}
            />
          </ListItem>
          {isLogin ? (
            <Fragment>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                component="a"
                href="/"
                button
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary="Trang chủ"
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => setOpen(false)}
                {...to("/profile")}
              >
                <ListItemText
                  primary="Thông tin cá nhân"
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
            </Fragment>
          ) : (
              <Fragment>
                <ListItem
                  classes={{
                    gutters: classes.listItemGutters
                  }}
                  button
                  onClick={() => {
                    setOpen(false);
                    handleLoginButton(true);
                  }}
                >
                  <ListItemText
                    primary="Đăng nhập"
                    classes={{
                      primary: classes.text
                    }}
                  />
                </ListItem>
                <ListItem
                  classes={{
                    gutters: classes.listItemGutters
                  }}
                  button
                  onClick={() => {
                    setOpen(false);
                    handleRegisterButton(true);
                  }}
                >
                  <ListItemText
                    primary="Đăng ký"
                    classes={{
                      primary: classes.text
                    }}
                  />
                </ListItem>
              </Fragment>
            )}
        </div>

        <div className="bottom">
          <ListItem
            button
            onClick={() => setOpen(false)}
            component="a"
            href="https://blog.westay.vn/"
            classes={{
              gutters: classes.listItemGutters
            }}
          >
            <ListItemText
              primary="Cẩm nang du lịch"
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => setOpen(false)}
            {...to("/terms-and-conditions")}
            classes={{
              gutters: classes.listItemGutters
            }}
          >
            <ListItemText
              primary="Chính sách & Điều khoản"
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
          <Divider />

          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
          >
            <ListItemText
              primary={
                <span>
                  Hotline <br />
                  <span className={classes.hotline}>
                    0916 374 057 - 0946 746 417
                  </span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
          >
            <ListItemText
              primary={
                <span>
                  Dành cho chủ nhà <br />
                  <span className={classes.hotline}>0917 041 849</span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>

          {isLogin ? (
            <ListItem
              classes={{
                gutters: classes.listItemGutters
              }}
            >
              <ListItemText
                primary="Đăng xuất"
                onClick={logoutTrigger}
                classes={{
                  primary: classes.signOut
                }}
              />
            </ListItem>
          ) : (
              ""
            )}
        </div>
      </List>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnimationAction>) => {
  return {
    /**
     * Toggle Login Form
     * @param {boolean} status
     * @returns {{type: string; status: boolean}}
     */
    handleLoginButton: (status: boolean) =>
      dispatch({
        type: animation.LOGIN_BUTTON_CLICK,
        status: status
      }),
    handleRegisterButton: (status: boolean) =>
      dispatch({
        type: animation.SIGN_UP_BUTTON_CLICK,
        status: status
      })
  };
};

export default compose<ISideDrawerProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCookies,
  withStyles(styles),
  memo
)(SideDrawer);
