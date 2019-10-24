import { ThemeCustom } from "@/components/Theme/Theme";
import fakeIMG from "@/assets/room_demo.jpeg";
import align from "@/styles/Position/align.module.scss";
import mapMarker from "@/assets/SvgIcon/map-marker.svg";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useState,
  useContext,
  memo
} from "react";
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
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Button from "@material-ui/core/Button/Button";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { ThemeStyle } from "@material-ui/core/styles/createTypography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import LazyLoad from "react-lazyload";
import Chip from "@material-ui/core/Chip/Chip";
import Green from "@material-ui/core/colors/green";
import Flash from "@material-ui/icons/FlashOnRounded";
import { windowExist } from "@/index";
import LocalHotel from "@material-ui/icons/LocalHotelRounded";
import People from "@material-ui/icons/PeopleRounded";
import MeetingRoom from "@material-ui/icons/MeetingRoomRounded";
import Orange from "@material-ui/core/colors/orange";
import RoomCardReviewMobile from "./RoomCardReviewMobile";
import { FlashOn } from "@material-ui/icons";

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    imgSize: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      objectFit: "cover",
      maxWidth: 300,
      minWidth: 50,
      verticalAlign: "middle",
      [theme!.breakpoints!.down!("lg")]: {
        height: 225
      },
      [theme!.breakpoints!.only!("xl")]: {
        height: 260
      },
      [theme!.breakpoints!.only!("sm")]: {
        height: 240
      },
      [theme!.breakpoints!.only!("xs")]: {
        maxWidth: "calc(93vw - 4px)",
        height: "25vh"
      }
    },
    bodyContainer: {
      padding: 10
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
      fontWeight: 300
    },
    borderBlue: {
      border: "1px rgb(27,160,226) solid"
    },
    borderSection: {
      borderLeft: "1px rgba(0,0,0,0.1) solid",
      padding: "0 8px 10px 10px"
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
    dropShadow: {
      filter: "drop-shadow(2px 3px 2px rgba(0,0,0,0.3))"
    },
    reviewScore: {
      padding: 10,
      color: "#fff",
      backgroundColor: "#039be5",
      WebkitClipPath:
        "polygon(50% 0%, 100% 0, 100% 100%, 51% 69%, 0 100%, 0 0)",
      clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 50% 70%, 0 100%, 0 0)",
      height: 50,
      transform: "translateY(-2px)",
      borderRadius: "7px 2px 4px 4px",
      [theme!.breakpoints!.between!("sm", "md")]: {
        padding: 7
      },
      [theme!.breakpoints!.down!("sm")]: {
        height: 35
      }
    },
    reviewCount: {
      textAlign: "right"
    },
    reviewSizeSM: {
      fontWeight: 500,
      [theme!.breakpoints!.down!("md")]: {
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
      fontSize: "0.8rem",
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
      height: 24,
      borderRadius: 4,
      backgroundColor: Green[600],
      color: "white",
      marginTop: 8,
      padding: 7
    },
    chipSpan: {
      paddingLeft: 4,
      paddingRight: 4
    },
    chipInstantBook: {
      padding: "4px 16px 4px 8px",
      borderRight: "none",
      marginTop: 8,
      [theme!.breakpoints!.only!("xs")]: {
        marginTop: 0,
        fontSize: "0.73rem"
      },
      backgroundColor: Green[100],
      color: Green[800],
      border: "1px dashed",
      height: "auto",
      borderRadius: 2,
      position: "relative",
      display: "inline-block",
      lineHeight: 1,
      "&:after,&:before": {
        display: "inline-block",
        content: '" "',
        height: 11,
        width: 11,
        position: "absolute",
        top: 4,
        border: "1px dashed",
        WebkitTransform: "rotate(45deg) skew(15deg,15deg)",
        transform: "rotate(45deg) skew(15deg,15deg)",
        right: -4,
        borderRight: "none",
        borderTop: "none",
        backgroundColor: "#fff"
      },
      "&:before": {
        left: -6,
        WebkitTransform: "rotate(225deg) skew(15deg,15deg)",
        transform: "rotate(225deg) skew(15deg,15deg)"
      }
    },
    btFlash: {
      fontSize: 14,
      padding: 5,
      paddingLeft: 0,
      textTransform: "none",
      [theme!.breakpoints!.only!("md")]: {
        fontSize: 12,
        padding: 4,
        paddingLeft: 0
      }
    },
    sizeFlash: {
      fontSize: 18
    },
    contentHeight: {
      height: "max-content"
    },
    paper: {
      borderRadius: 4,
      WebkitBoxShadow: "0 10px 6px -11px #777",
      MozBoxShadow: "0 10px 6px -11px #777",
      boxShadow: "0 10px 6px -11px #777",
      cursor: "pointer",
      transition: theme!.transitions!.create!(["box-shadow"], {
        duration: 400,
        easing: "ease-in-out"
      }),
      "&:hover": {
        WebkitBoxShadow: "3px 13px 10px -11px #777",
        MozBoxShadow: "3px 13px 10px -11px #777",
        boxShadow: "3px 13px 10px -11px #777"
      }
    },
    price: {
      [theme!.breakpoints!.only!("xs")]: {
        marginTop: "2vh"
      }
    },
    btBook: {
      [theme!.breakpoints!.only!("md")]: {
        fontSize: 12,
        padding: 5,
        width: "100%"
      },
      color: "#FFFFFF",
      "&:hover": {
        background: Orange[700]
      }
    },
    btInstantBook: {
      [theme!.breakpoints!.only!("md")]: {
        fontSize: 12,
        padding: 5,
        width: "100%"
      },
      color: "#FFFFFF",
      "&:hover": {
        background: Orange[700]
      }
    },
    typoPadding: {
      paddingTop: 20
    },
    roomAmenitiesIcon: {
      verticalAlign: "right",
      width: 20,
      height: 20
    },
    roomAmenitiesTitle: {
      margin: "0 5px",
      fontSize: 13,
      [theme!.breakpoints!.down!("xs")]: {
        fontSize: "0.800rem"
        // fontWeight: 700

        // color: #999;
        // fontsi: 0.875rem;
        // font-weight: 700;
      }
    },
    collectionAmenities: {
      paddingLeft: 0,
      textAlign: "center",
      paddingInlineStart: "0px",
      display: "inline-flex",
      marginTop: 5,
      marginBottom: 5,
      fontWeight: 300
    },
    benchmark: {
      backgroundColor: "#488BF8",
      padding: 6,
      fontSize: 25,
      borderRadius: 5,
      color: "#ffffff",
      textAlign: "center",
      marginLeft: 8
    },
    review: {
      backgroundColor: "#D1D7E2",
      padding: "1px 10px",
      fontSize: 12,
      borderRadius: "25px"
    },
    roomName: {
      fontSize: "1.1rem",
      fontWeight: 700,
      color: "#393939f2",
      [theme!.breakpoints!.only!("xs")]: {
        fontWeight: "bold",
        fontSize: "1rem"
      }
    },
    saleOff: {
      backgroundColor: "#e53935",
      borderRadius: 5,
      color: "#ffffff",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: 11,
      padding: "4px 8px",
      maxHeight: "28px",
      fontWeight: "bold",
      minWidth: "110px"
    },
    roomType: {
      color: "rgb(118, 118, 118)",
      overflow: "hidden",
      fontSize: "0.75em",
      fontWeight: "bold",
      lineHeight: "16px",
      whiteSpace: "normal",
      textOverflow: "ellipsis",
      letterSpacing: "normal",
      textTransform: "uppercase"
    },
    textPrice: {
      fontWeight: 600,
      color: Orange[400],
      fontSize: "1.4rem",
      [theme!.breakpoints!.only!("xs")]: {
        fontSize: "1.2rem"
      }
    }
  });

interface IProps {
  classes?: any;
  room: RoomIndexRes;
}

// @ts-ignore
const RoomCard: ComponentType<IProps> = (props: IProps) => {
  const { classes, room } = props;
  const [paperHover, setPaperHover] = useState<boolean>(false);
  const { width, history } = useContext<IGlobalContext>(GlobalContext);
  const typoVariant: ThemeStyle =
    width === "sm" || width === "xs" ? "subtitle2" : "h6";
  const totalComfort = room.comforts.data.length - 3;

  const settings: Settings = {
    speed: 300,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand"
  };

  const cardEvent = () => {
    if (windowExist) {
      let win = window.open(`/room/${room.id}`, "_blank");
      win!.focus();
    }
  };

  return (
    <Fragment>
      <Paper
        onMouseEnter={() => setPaperHover(true)}
        onMouseLeave={() => setPaperHover(false)}
        className={classes.paper}
      >
        <Grid container spacing={0}>
          <Grid item lg={4} sm={4} xs={12} className={classes.imgSize}>
            <LazyLoad offset={windowExist ? window.innerHeight : 0}>
              <Slider {...settings}>
                {room.media.data.length > 0 ? (
                  _.map(room.media.data, o => (
                    <img
                      key={o.image}
                      src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${
                        o.image
                        }`}
                      className={classes.imgSize}
                      alt={`VN-Homestay - Homestay cho người việt`}
                    />
                  ))
                ) : (
                    <img src={fakeIMG} className={classes.imgSize} />
                  )}
              </Slider>
            </LazyLoad>
          </Grid>
          <Grid item lg={8} sm={8} xs={12} onClick={cardEvent}>
            <Grid container className={classes.maxHeight}>
              <Grid item lg={12} sm={12}>
                <Grid
                  container
                  spacing={0}
                  className={classNames(
                    classes.bodyContainer,
                    classes.maxHeight
                  )}
                >
                  <Grid item lg={8} sm={8}>
                    <Grid
                      container
                      className={classNames(classes.maxHeight, classes.pR)}
                    >
                      <Grid item lg={12} sm={12}>
                        <Grid container>
                          <Hidden smUp>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <Grid item>
                                <span className={classes.roomType}>
                                  {room!.room_type_txt}
                                </span>
                              </Grid>

                              {room.instant_book === 1 && (
                                <Chip
                                  label="Đặt phòng nhanh"
                                  className={classes.chipInstantBook}
                                  classes={{
                                    label: classes.chipSpanInstantBook
                                  }}
                                />
                              )}
                            </div>
                          </Hidden>

                          {/* <Tooltip title={`Đặt phòng nhanh`} placement="top">
                              <FlashOn />
                            </Tooltip> */}

                          <Grid item lg={12} sm={12} xs={12}>
                            <Typography
                              variant="subtitle2"
                              className={classes.roomName}
                            >
                              {room.details.data[0].name}
                            </Typography>
                          </Grid>
                          <Grid item lg={12} sm={12} xs={12}>
                            {room.total_review > 0 && (
                              <Hidden smUp>
                                <RoomCardReviewMobile room={room} />
                              </Hidden>
                            )}

                            <Hidden xsDown>
                              <span className={classes.verticalMid}>
                                <StarRatings
                                  numberOfStars={room.standard_point}
                                  starDimension={`15px`}
                                  starSpacing={`1px`}
                                  starEmptyColor={"#ff9800"}
                                />
                              </span>
                            </Hidden>

                            <span className={classes.verticalMid}>
                              <img
                                src={mapMarker}
                                className={classNames(
                                  classes.mapMarker,
                                  classes.verticalMid
                                )}
                              />
                              &nbsp;
                              <a className={classes.address}>{`
                              ${room.district.data.name},
                              ${room.city.data.name}
                              `}</a>
                            </span>
                          </Grid>
                          <Grid item lg={12} sm={12} xs={12}>
                            <Grid
                              style={{ display: "inline-flex" }}
                              item
                              lg={4}
                              sm={4}
                              xs={4}
                            >
                              <div className={classes.collectionAmenities}>
                                <People className={classes.roomAmenitiesIcon} />
                                <div className={classes.roomAmenitiesTitle}>
                                  <span>{room!.max_guest} khách</span>
                                </div>
                              </div>
                            </Grid>
                            <Grid
                              style={{ display: "inline-flex" }}
                              item
                              lg={4}
                              sm={4}
                              xs={4}
                            >
                              <div className={classes.collectionAmenities}>
                                <LocalHotel
                                  className={classes.roomAmenitiesIcon}
                                />
                                <div className={classes.roomAmenitiesTitle}>
                                  <span>{room!.number_bed} giường</span>
                                </div>
                              </div>
                            </Grid>
                            <Grid
                              style={{ display: "inline-flex" }}
                              item
                              lg={4}
                              sm={4}
                              xs={4}
                            >
                              <div className={classes.collectionAmenities}>
                                <MeetingRoom
                                  className={classes.roomAmenitiesIcon}
                                />
                                <div className={classes.roomAmenitiesTitle}>
                                  <span>{room!.number_room} phòng</span>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          <Hidden xsDown initialWidth="xs">
                            <Grid item lg={8} sm={12}>
                              <ul className={classes.ul}>
                                {_.map(room.comforts.data, (o, i) => {
                                  return i < 3 ? (
                                    <li key={o.id} className={classes.list}>
                                      <SvgCustom icon={o.icon} />
                                    </li>
                                  ) : (
                                      ""
                                    );
                                })}
                                {totalComfort > 0 ? (
                                  <Tooltip
                                    enterTouchDelay={300}
                                    classes={{
                                      tooltip: classes.tooltip
                                    }}
                                    title={`${totalComfort} tiện nghi phòng khác`}
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
                            {room.is_discount == 1 ? (
                              <Grid item lg={4} sm={12}>
                                {/* <div className={classes.saleOff}>25% off today</div> */}
                                <Chip
                                  label={"Giảm giá"}
                                  className={classes.saleOff}
                                  classes={{
                                    label: classes.chipSpan
                                  }}
                                />
                              </Grid>
                            ) : (
                                ""
                              )}
                          </Hidden>

                          <Hidden xsDown>
                            <Grid item lg={12} sm={12}>
                              <Chip
                                label={room.room_type_txt}
                                className={classes.chip}
                                classes={{
                                  label: classes.chipSpan
                                }}
                              />
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={4} sm={4} className={classes.contentHeight}>
                    {room.total_review > 3 ? (
                      <Grid
                        container
                        spacing={8}
                        alignItems="center"
                        justify="center"
                        direction="column"
                      >
                        <Fragment>
                          <Hidden xsDown>
                            <Grid
                              style={{ marginRight: "10px" }}
                              item
                              xs={12}
                              container
                              direction="row"
                            >
                              <Grid item xs={7}>
                                <div {...{ align: "right" } as any}>
                                  <span className={classes.review}>
                                    {room!.avg_rating_txt}
                                  </span>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <span
                                    className={classes.review}
                                  >{`${formatMoney(
                                    room.total_review
                                  )} Đánh giá`}</span>
                                </div>
                              </Grid>
                              <Grid item xs={5}>
                                <div className={classes.benchmark}>
                                  {`${formatMoney(room.avg_rating, 1)}`}
                                </div>
                              </Grid>
                            </Grid>
                          </Hidden>
                        </Fragment>
                      </Grid>
                    ) : (
                        ""
                      )}
                    <Grid
                      container
                      spacing={8}
                      alignItems="flex-end"
                      justify="center"
                      direction="column"
                    >
                      <Hidden xsDown>
                        {room.instant_book === 1 ? (
                          <Chip
                            label="Đặt phòng nhanh"
                            className={classes.chipInstantBook}
                            classes={{
                              label: classes.chipSpanInstantBook
                            }}
                          />
                        ) : (
                            ""
                          )}
                      </Hidden>
                    </Grid>
                  </Grid>
                  {/*Price section*/}
                  <Grid container item lg={12} sm={12} alignContent="flex-end">
                    <Grid
                      container
                      item
                      spacing={24}
                      className={classes.price}
                      justify="flex-end"
                    >
                      <Grid item>
                        {room.is_discount === 1 ? (
                          <Fragment>
                            <span
                              className={classNames({
                                [classes.striker]: true
                              })}
                            >
                              {`${formatMoney(room.price_day, 0)}`}
                              <sub className={classes.subEl}>đ/ngày</sub>
                            </span>
                            <Typography
                              className={classes.textPrice}
                              variant={typoVariant}
                            >
                              {`${formatMoney(room.price_day_discount, 0)}`}
                              <sub className={classes.subEl}>đ/ngày</sub>
                            </Typography>
                          </Fragment>
                        ) : (
                            <Fragment>
                              <Typography
                                className={classes.textPrice}
                                variant={typoVariant}
                              >
                                {room.price_day > 0 ? (
                                  <Fragment>
                                    {`${formatMoney(room.price_day, 0)}`}
                                    <sub className={classes.subEl}>đ/ngày</sub>
                                  </Fragment>
                                ) : (
                                    ""
                                  )}
                              </Typography>
                            </Fragment>
                          )}
                      </Grid>
                      {room.rent_type !== 2 ? (
                        <Grid item>
                          {room.is_discount === 1 ? (
                            <Fragment>
                              <span
                                className={classNames({
                                  [classes.striker]: true
                                })}
                              >
                                {`${formatMoney(room.price_hour, 0)}`}
                                <sub className={classes.subEl}>đ/4 giờ</sub>
                              </span>
                              <Typography
                                className={classes.textPrice}
                                variant={typoVariant}
                              >
                                {`${formatMoney(room.price_hour_discount, 0)}`}
                                <sub className={classes.subEl}>đ/4 giờ</sub>
                              </Typography>
                            </Fragment>
                          ) : (
                              <Fragment>
                                <Typography
                                  className={classes.textPrice}
                                  variant={typoVariant}
                                >
                                  {room.price_hour > 0 ? (
                                    <Fragment>
                                      {`${formatMoney(room.price_hour, 0)}`}
                                      <sub className={classes.subEl}>đ/4 giờ</sub>
                                    </Fragment>
                                  ) : (
                                      ""
                                    )}
                                </Typography>
                              </Fragment>
                            )}
                        </Grid>
                      ) : (
                          <Grid item xs>
                            {/* <Typography variant = {typoVariant}> */}
                            {room.is_discount === 1 ? (
                              <Fragment>
                                <span className={classNames({
                                  [classes.striker]: true,
                                })}>
                                  {`${formatMoney(room.price_hour, 0)}`}
                                  <sub className={classes.subEl}>đ/4 giờ</sub>
                                </span>
                                <Typography variant={typoVariant}>
                                  {`${formatMoney(room.price_hour_discount, 0)}`}
                                  <sub className={classes.subEl}>đ/4 giờ</sub>
                                </Typography>
                              </Fragment>
                            ) : (
                                <Fragment>
                                  <Typography variant={typoVariant}>
                                    {(room.price_hour > 0) ? (
                                      <Fragment>
                                        {`${formatMoney(room.price_hour, 0)}`}
                                        <sub className={classes.subEl}>đ/4 giờ</sub>
                                      </Fragment>
                                    ) : ''}
                                  </Typography>
                                </Fragment>
                              )}
                            {/* </Typography> */}
                          </Grid>
                        )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item container className={classes.maxHeight}>

                </Grid> */}
              </Grid>
              <Grid item lg={12} sm={12}>
                <Grid container className={classes.maxHeight}>
                  <Grid item lg={12} sm={12} className={classes.contentHeight}>
                    <Grid container spacing={8} alignItems='center' justify='center' direction='column'>
                      {room.total_review > 0 ? (
                        <Fragment>
                          <Hidden xsDown>
                            <Grid style={{ marginTop: '10px', marginRight: '10px' }} item xs={12} container direction='row'>
                              <Grid item xs={7}>
                                <div {...{ align: 'right' } as any}>
                                  <span className={classes.review}>{`${formatMoney(room.avg_rating_txt)}`}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <span className={classes.review}>{`${formatMoney(room.total_review)} Đánh giá`}</span>
                                </div>
                              </Grid>
                              <Grid item xs={5}>
                                <div className={classes.benchmark}>
                                  {`${formatMoney(room.avg_rating, 1)}`}
                                </div>
                              </Grid>
                            </Grid>
                          </Hidden>
                        </Fragment>
                      ) : (
                          <Typography
                            variant='subtitle2'
                            className={classes.typoPadding}
                          />
                        )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden xsDown initialWidth='xs'>
                <Grid item lg={4} sm={4} className={classes.borderSection}>
                  <Grid container className={classes.maxHeight}>
                    <Grid item lg={12} sm={12} className={classes.contentHeight}>
                      <Grid container spacing={8} alignItems='center' justify='center' direction='column'>
                        {room.total_review > 3 ? (
                          <Fragment>
                            <Hidden xsDown>
                              <Grid style={{ marginTop: '10px', marginRight: '10px' }} item xs={12} container direction='row'>
                                <Grid item xs={7}>
                                  <div {...{ align: 'right' } as any}>
                                    <span className={classes.review}>{`${formatMoney(room.avg_rating_txt)}`}</span>
                                  </div>
                                  <div style={{ textAlign: 'right' }}>
                                    <span className={classes.review}>{`${formatMoney(room.total_review)} Đánh giá`}</span>
                                  </div>
                                </Grid>
                                <Grid item xs={5}>
                                  <div className={classes.benchmark}>
                                    {`${formatMoney(room.avg_rating, 1)}`}
                                  </div>
                                </Grid>
                              </Grid>
                            </Hidden>
                          </Fragment>
                        ) : (
                            <Typography
                              variant='subtitle2'
                              className={classes.typoPadding}
                            />
                          )}
                      </Grid>
                    </Grid>
                    <Grid container item lg={12} sm={12} justify='center' alignItems='flex-end'>
                      <Grid item lg={12} sm={12} className={align.textCenter}>
                        {room.manager == 1 ?
                          <Button
                            name='booking-button'
                            variant='contained' color='primary'
                            style={{ width: '100%' }}
                            size={(width === ('sm' || 'xs')) ? 'small' : 'medium'}
                            className={classes.btInstantBook}
                          >
                            Đặt ngay
                          </Button>
                          : <Button
                            name='booking-button'
                            color='primary'
                            variant='contained'
                            style={{ width: '100%' }}
                            size={(width === ('sm' || 'xs')) ? 'small' : 'medium'}
                            className={classes.btBook}
                          >
                            Đặt ngay
                          </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(RoomCard);
