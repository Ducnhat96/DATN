import { ThemeCustom } from "@/components/Theme/Theme";
import fakeIMG from "@/assets/room_demo.jpeg";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { ComponentType, Fragment, useContext, useMemo } from "react";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid/Grid";
import Slider, { Settings } from "react-slick";
import Typography from "@material-ui/core/Typography/Typography";
import StarRatings from "react-star-ratings";
import classNames from "classnames";
import _ from "lodash";
import SvgCustom from "@/components/Custom/SvgCustom";
import Paper from "@material-ui/core/Paper/Paper";
import { formatMoney } from "@/utils/mixins";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/PageProfile/StylePageProfile.scss";
import Blue from "@material-ui/core/colors/blue";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { ThemeStyle } from "@material-ui/core/styles/createTypography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import Button from "@material-ui/core/Button/Button";
import mapMarker from "@/assets/SvgIcon/map-marker.svg";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    imgSize: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      objectFit: "cover",
      maxWidth: 300,
      minWidth: 50,
      verticalAlign: "middle",
      [theme.breakpoints.down("lg")]: {
        height: 180,
        maxWidth: 300
      },
      [theme.breakpoints.only("sm")]: {
        height: 220
      },
      [theme.breakpoints.only("xs")]: {
        maxWidth: "100%",
        height: "111px",
        objectFit: "cover"
      }
    },
    bodyContainer: {
      padding: "0px 10px"
    },
    verticalMid: {
      verticalAlign: "middle"
    },
    mapMarker: {
      width: "0.8rem",
      marginLeft: 3
    },
    address: {
      fontSize: "0.8rem",
      fontWeight: 500
    },
    borderBlue: {
      border: "1px rgb(27,160,226) solid"
    },
    borderSection: {
      borderLeft: "1px rgba(0,0,0,0.1) solid",
      padding: 10
    },
    marginSvg: {
      marginLeft: 5
    },
    ul: {
      display: "flex",
      paddingInlineStart: "0px",
      marginBlockStart: "2px",
      listStyleType: "none",
      marginBlockEnd: "0px"
    },
    list: {
      paddingRight: 4
    },
    reviewScore: {
      padding: 5,
      color: "#fff",
      backgroundColor: Blue[600],
      [theme.breakpoints.between("sm", "md")]: {
        padding: 7
      }
    },
    reviewCount: {
      textAlign: "right"
    },
    reviewSizeSM: {
      [theme.breakpoints.down("md")]: {
        fontSize: "0.6rem"
      }
    },
    maxHeight: {
      height: "100%"
    },
    textCenter: {
      textAlign: "center"
    },
    subEl: {
      fontSize: "0.7rem"
    },
    striker: {
      color: "grey",
      position: "relative",
      "&::before": {
        content: '" "',
        position: "absolute",
        right: 0,
        top: "50%",
        width: "100%",
        borderTop: "1px solid grey",
        transform: "rotate(10deg)",
        WebkitTransform: "rotate(10deg)"
      }
    },
    pR: {
      paddingRight: 10
    },
    tooltip: {
      fontSize: "0.75rem",
      maxWidth: 200,
      padding: 20,
      opacity: 1
    },
    chip: {
      height: 24
    },
    contentHeight: {
      height: "max-content"
    },
    paper: {
      transition: theme.transitions.create(["box-shadow"], {
        duration: 100,
        easing: "ease-in-out"
      })
    },
    price: {
      [theme.breakpoints.only("xs")]: {
        marginTop: "2vh",
        fontSize: 13
      }
    },
    priceTag: {
      [theme.breakpoints.only("xs")]: {
        fontSize: 13,
        padding: "0px 8px"
      },
      fontSize: "1rem"
    },
    buttonTrans: {
      transition: theme.transitions.create(["all"], {
        duration: 400,
        easing: "ease-in-out"
      }),
      transform: "translate(35%)",
      [theme.breakpoints.only("sm")]: {
        transform: "translate(3vw)"
      },
      [theme.breakpoints.only("md")]: {
        transform: "translate(4vw)"
      }
    },
    border: {
      backgroundColor: "#eceff1",
      "&:hover": {
        backgroundColor: "#eceff1"
      }
    }
  })
);

interface IProps {
  classes?: any;
  showRoom: RoomIndexRes;
  isHover: boolean;
  focus(room: RoomIndexRes): void;
}

// @ts-ignore
const RoomCardMap: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const { showRoom, isHover, focus } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const xsMode = width === "xs";

  const typoVariant: ThemeStyle =
    width === "sm" || width === "xs" ? "subtitle2" : "h6";
  const totalComfort =
    showRoom.comforts.data.length < 25 ? showRoom.comforts.data.length : 20;

  const settings: Settings = {
    accessibility: !xsMode,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    draggable: !xsMode,
    // autoplay: xsMode,
    autoplaySpeed: 5000,
    pauseOnFocus: xsMode,
    focusOnSelect: xsMode,
    arrows: !xsMode,
    pauseOnHover: xsMode,
    touchMove: !xsMode,
    swipeToSlide: !xsMode,
    swipe: !xsMode
  };

  const cardEvent = () => {
    let win = window.open(`/room/${showRoom.id}`, "_blank");
    win!.focus();
  };

  const roomMemo = useMemo(() => showRoom, []);

  return (
    <Fragment>
      <Paper
        elevation={isHover ? 10 : 3}
        className={classNames(classes.paper, isHover ? classes.border : "")}
        onClick={cardEvent}
      >
        <Grid container spacing={0}>
          <Grid item lg={4} sm={4} xs={4} className={classes.imgSize}>
            <Slider {...settings}>
              {roomMemo.media.data.length > 0 ? (
                _.map(roomMemo.media.data, o => (
                  <img
                    key={o.image}
                    src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${o.image}`}
                    className={classes.imgSize}
                  />
                ))
              ) : (
                <img src={fakeIMG} className={classes.imgSize} />
              )}
            </Slider>
          </Grid>
          <Grid item lg={8} sm={8} xs={8} onClick={() => focus(roomMemo)}>
            <Grid container className={classes.maxHeight}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  className={classNames(
                    classes.bodyContainer,
                    classes.maxHeight
                  )}
                >
                  <Grid item xs={12}>
                    <Grid
                      container
                      className={classNames(classes.maxHeight, classes.pR)}
                    >
                      <Grid item lg={12} sm={12}>
                        <Grid container>
                          <Grid item lg={12} sm={12} xs={12}>
                            <Typography variant="subtitle2">
                              {roomMemo.details.data[0].name}
                            </Typography>
                          </Grid>
                          <Grid item lg={12} sm={12} xs={12}>
                            {showRoom ? (
                              <span className={classes.verticalMid}>
                                <StarRatings
                                  numberOfStars={roomMemo.standard_point}
                                  starDimension={`15px`}
                                  starSpacing={`1px`}
                                  starEmptyColor={"#ffb40b"}
                                />
                              </span>
                            ) : (
                              ""
                            )}

                            {/*Address*/}
                            <span className={classes.verticalMid}>
                              <img
                                src={mapMarker}
                                className={classNames(
                                  classes.mapMarker,
                                  classes.verticalMid
                                )}
                              />
                              &nbsp;
                              <a
                                className={classes.address}
                              >{`${roomMemo.district.data.name}, ${roomMemo.city.data.name}`}</a>
                            </span>
                          </Grid>
                          <Hidden xsUp>
                            <Grid item lg={12} sm={12} style={{ marginTop: 6 }}>
                              <ul className={classes.ul}>
                                {_.map([1, 2, 3], val => (
                                  <li key={val} className={classes.list}>
                                    <SvgCustom />
                                  </li>
                                ))}
                                {totalComfort > 0 ? (
                                  <Tooltip
                                    enterTouchDelay={300}
                                    classes={{
                                      tooltip: classes.tooltip
                                    }}
                                    title={`${totalComfort} additional room amenities and facilities available`}
                                    placement="top"
                                  >
                                    <li>
                                      <SvgCustom
                                        borderClass={classes.borderBlue}
                                        text={`+${totalComfort}`}
                                      />
                                    </li>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}
                              </ul>
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                      {/*Price section*/}
                      <Grid
                        container
                        item
                        lg={12}
                        sm={12}
                        alignItems="flex-end"
                      >
                        <Grid container className={classes.price} spacing={0}>
                          <Grid container item xs={xsMode ? 12 : 9}>
                            <Grid item>
                              <Typography
                                variant={typoVariant}
                                className={classes.priceTag}
                              >
                                {roomMemo.price_day > 0 ? (
                                  <Fragment>
                                    {`${formatMoney(roomMemo.price_day, 0)}`}
                                    <sub className={classes.subEl}>đ/đêm</sub>
                                  </Fragment>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant={typoVariant}
                                className={classes.priceTag}
                              >
                                {roomMemo.price_hour > 0 ? (
                                  <Fragment>
                                    {`${formatMoney(roomMemo.price_hour, 0)}`}
                                    <sub className={classes.subEl}>/4 giờ</sub>
                                  </Fragment>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                          {!xsMode ? (
                            <Grid container item xs={3} justify="flex-end">
                              <Button
                                onClick={cardEvent}
                                className={classes.buttonTrans}
                                variant={isHover ? "contained" : "outlined"}
                                color="primary"
                                size="small"
                              >
                                Chi tiết
                              </Button>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

const memoCheck = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.isHover === nextProps.isHover;
};

export default compose<IProps, any>()(
  React.memo(RoomCardMap, memoCheck)
);
