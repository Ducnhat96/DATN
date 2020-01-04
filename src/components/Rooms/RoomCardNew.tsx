import { ThemeCustom } from "@/components/Theme/Theme";
import fakeIMG from "@/assets/room_demo.jpeg";
import align from "@/styles/Position/align.module.scss";
import mapMarker from "@/assets/SvgIcon/map-marker.svg";
import discount from "@/assets/SvgIcon/discount.svg";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useState,
  useContext,
  memo,
  useEffect
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
import "@/styles/CustomizeSlick.scss";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Button from "@material-ui/core/Button/Button";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { ThemeStyle } from "@material-ui/core/styles/createTypography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import LazyLoad from "react-lazyload";
import FavoriteAnimation from "@/components/IntroHomestay/FavoriteAnimation";

import { windowExist } from "@/index";

import StarIcon from "@material-ui/icons/StarRounded";
import QuickBookIcon from "@material-ui/icons/OfflineBoltRounded";
import Link from "@material-ui/core/Link";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    paper: {
      position: "relative",
      color: "#484848",
      height: 200,
      border: "1px solid #ebebeb",
      borderRadius: 4,
      "&:hover": {
        boxShadow: "rgba(0,0,0,0.12) 0px 0px 12px"
      },
      [theme!.breakpoints!.only!("xs")]: {
        height: "100%"
      }
    },
    boxImg: {
      position: "relative",
      height: "100%",
      padding: 4,
      [theme!.breakpoints!.only!("xs")]: {
        maxWidth: "calc(93vw - 4px)",
        height: "25vh"
      }
    },
    imgSize: {
      position: "relative",
      objectFit: "cover",
      height: "100%",
      verticalAlign: "middle",
      borderRadius: 4
    },
    wrapper: {
      height: "100%"
    },
    boxCard: {
      width: "100%",
      verticalAlign: "middle"
    },
    cardContainer: {
      height: "100%",
      padding: "12px 16px",
      boxSizing: "border-box"
    },
    cardWrapper: {
      position: "relative",
      height: "100%",
      width: "100%",
      display: "inline-block"
    },
    boxLink: {
      display: "block",
      color: "#484848",
      textDecoration: "none !important",
      cursor: "pointer",
      fontWeight: 600
    },
    boxTitle: {
      marginBottom: 4,
      paddingRight: "40px !important"
    },
    roomName: {
      overflow: "hidden",
      fontSize: 20,
      fontWeight: 700,
      // maxHeight: 44,
      overflowWrap: "break-word",
      textOverflow: "ellipsis",
      color: "#484848",
      lineHeight: "24px",
      display: "flex",
      [theme!.breakpoints!.only!("xs")]: {
        marginBottom: 10
      }
    },

    collectionAmenities: {
      overflowWrap: "break-word",
      fontSize: 14,

      color: "#484848"
    },

    dotAmenties: {
      display: "inline-block",
      verticalAlign: "super",
      margin: "0 3px"
    },
    roomType: {
      textTransform: "uppercase",
      fontSize: 12,
      fontWeight: 500,
      color: '#248489',
      fontFamily:
        "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
      display: "inline-block",
      marginRight: 3
    },
    address: {
      fontSize: 14,
      [theme!.breakpoints!.only!("xs")]: {
        display: "block"
      }
    },
    ul: {
      display: "flex",
      padding: 0,
      margin: "4px 0 0 0",
      listStyleType: "none"
    },
    list: {
      paddingRight: 4
    },
    tooltip: {
      fontSize: "0.8rem",
      maxWidth: 200,
      padding: 5,
      backgroundColor: "#248489"
    },
    borderBlue: {
      border: "1px solid #7676768a"
    },

    // Rating Box
    boxRating: {
      position: "absolute",
      bottom: "0px !important",
      left: "0px !important",
      right: "128px !important",
      display: "flex",
      fontSize: 13,
      alignItems: "flex-end"
    },
    starIcon: {
      width: 20,
      height: 20,
      color: "#FFC212"
    },
    totalReview: {
      color: "#767676",
      fontWeight: 300
    },
    totalReviewText: {
      marginLeft: 10,
      color: "#248489",
      fontWeight: 500
    },
    avgRating: {
      fontWeight: 700
    },

    // Price Box
    discountBox: {
      color: "#fff",
      backgroundColor: "#248489",
      padding: "4px 10px 4px 8px",
      fontSize: 14,
      fontWeight: 700,
      display: "inline-block",
      borderRadius: 2
    },
    discountPriceBadge: {
      borderRadius: 2,
      position: "relative",
      marginBottom: 9,
      textAlign: "right",
      width: "calc(100% + 22px)"
    },
    discountIcon: {
      width: "100%",
      height: "100%"
    },
    boxPrice: {
      right: 0,
      bottom: 0,
      textAlign: "right",
      [theme!.breakpoints!.only!("sm")]: {
        position: "absolute"
      },
      [theme!.breakpoints!.up!("md")]: {
        position: "absolute"
      }
    },
    priceContainer: {
      [theme!.breakpoints!.up!("md")]: {
        display: "flex"
      },

      [theme!.breakpoints!.only!("xs")]: { justifyContent: "flex-end" }
    },
    hourPrice: {
      [theme!.breakpoints!.up!(700)]: { display: "inline-block" }
    },
    dayPrice: {
      [theme!.breakpoints!.only!("sm")]: { display: "inline-block" }
    },
    priceText: {
      fontSize: 17,
      marginLeft: 20,
      color: "#248489",
      fontWeight: 700
    },
    discountPriceText: {
      fontSize: 13,
      color: "#7d7d7db3",
      textDecoration: "line-through",
      fontWeight: 700
    },

    // Save for later Box
    boxSave: {
      position: "absolute",
      top: -10,
      right: -12,
      width: 40,
      height: 40
    },
    tooltipRoomCard: {
      position: "relative",
      verticalAlign: "top",
      width: "100%",
      padding: 0,
      color: "white",
      textAlign: "center",
      textShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
      background: "#f39c12",
      border: 0,
      borderBottom: "2px solid #e8930c",
      cursor: "pointer",
      WebkitBoxShadow: "inset 0 -2px #e8930c",
      boxShadow: "inset 0 -2px #e8930c"
    }
  });

interface IProps {
  classes?: any;
  room: RoomIndexRes;
}

// @ts-ignore
const RoomCard: ComponentType<IProps> = (props: IProps) => {
  const { classes, room } = props;
  const { width, history } = useContext<IGlobalContext>(GlobalContext);
  const typoVariant: ThemeStyle =
    width === "sm" || width === "xs" ? "subtitle2" : "h6";
  const totalComfort = room.comforts.data.length - 4;

  const settings: Settings = {
    speed: 300,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand"
  };

  return (
    <Fragment>
      <Paper elevation={0} className={classes.paper}>
        <Grid container className={classes.wrapper} spacing={0}>
          <Grid item xs={12} sm={4} md={4} lg={4} className={classes.boxImg}>
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

          <Grid item xs={12} sm={8} md={8} lg={8} className={classes.boxCard}>
            <div className={classes.cardContainer}>
              <Grid container className={classes.cardWrapper} spacing={0}>
                <Link
                  href={`/room/${room.id}`}
                  target="_blank"
                  className={classes.boxLink}
                >
                  <Grid className={classes.boxTitle}>
                    <Grid>
                      <Typography
                        variant="subtitle2"
                        className={classes.roomName}
                      >
                        {room.instant_book === 1 && (
                          <Tooltip
                            classes={{ tooltip: classes.tooltip }}
                            title={"Đặt phòng nhanh"}
                            placement="top"
                          >
                            <QuickBookIcon
                              color="primary"
                              style={{ marginRight: 5 }}
                            />
                          </Tooltip>
                        )}
                        {room.details.data[0].name}
                      </Typography>
                    </Grid>
                    <Grid className={classes.roomSubtitle}>
                      <span className={classes.roomType}>
                        {room.room_type_txt}
                      </span>
                      <Hidden xsDown>
                        <span className={classes.dotAmenties}>.</span>
                      </Hidden>

                      <span className={classes.address}>
                        {room.district.data.name}, {room.city.data.name}
                      </span>
                    </Grid>
                    <Grid className={classes.collectionAmenities}>
                      {room!.max_guest} khách
                      <span className={classes.dotAmenties}>.</span>
                      {room!.number_room} phòng
                      <span className={classes.dotAmenties}>.</span>
                      {room!.number_bed} giường
                      {room!.bathroom > 0 ? (
                        <Fragment>
                          <span className={classes.dotAmenties}>.</span>
                          {room!.bathroom} phòng tắm
                        </Fragment>
                      ) : (
                          ""
                        )}
                    </Grid>
                    <Grid>
                      <ul className={classes.ul}>
                        {_.filter(room.comforts.data, (o, idx) => {
                          return (
                            o.id === 20 || // air conditioner
                            o.id === 9 || //wifi
                            o.id === 27 || //swimming
                            o.id === 10 //television
                          );
                        })
                          .sort((a, b) => a.id - b.id)
                          .map((o, i) => (
                            <Tooltip
                              key={i}
                              title={o.details.data[0] ? o.details.data[0].name : ''}
                              placement="bottom"
                              classes={{
                                tooltip: classes.tooltip
                              }}
                            >
                              <li key={o.id} className={classes.list}>
                                <SvgCustom icon={o.icon} />
                              </li>
                            </Tooltip>
                          ))}
                        {totalComfort > 0 ? (
                          <Tooltip
                            enterTouchDelay={300}
                            classes={{
                              tooltip: classes.tooltip
                            }}
                            title={`${totalComfort} tiện nghi phòng khác`}
                            placement="bottom"
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
                  </Grid>
                  {room!.total_review > 3 ? (
                    <Grid className={classes.boxRating}>
                      <Tooltip
                        classes={{ tooltip: classes.tooltip }}
                        title={room.avg_rating_txt}
                        placement="top"
                      >
                        <StarIcon className={classes.starIcon} />
                      </Tooltip>
                      <Tooltip
                        classes={{ tooltip: classes.tooltip }}
                        title={room.avg_rating_txt}
                        placement="top"
                      >
                        <span className={classes.avgRating}>
                          {`${formatMoney(room.avg_rating, 1)}`}
                        </span>
                      </Tooltip>
                      <span className={classes.totalReview}>{`(${formatMoney(
                        room.total_review
                      )})`}</span>
                      {/* <span className={classes.totalReviewText}>{`${
                          room.avg_rating_txt
                          }`}</span> */}
                    </Grid>
                  ) : (
                      ""
                    )}

                  <Grid className={classes.boxPrice}>
                    {room.is_discount === 1 ? (
                      <Grid className={classes.discountPriceBadge}>
                        <Grid className={classes.discountBox}>Giảm giá</Grid>
                      </Grid>
                    ) : (
                        ""
                      )}
                    <Grid className={classes.priceContainer}>
                      {room.price_day > 0 ? (
                        <Grid className={classes.dayPrice}>
                          {room.is_discount === 1 ? (
                            <span className={classes.discountPriceText}>
                              {`${formatMoney(room.price_day, 0)}`}
                              ₫/ngày
                            </span>
                          ) : (
                              ""
                            )}
                          <Typography
                            className={classes.priceText}
                            variant={typoVariant}
                          >
                            {`${formatMoney(room.is_discount === 1 ? room.price_day_discount : room.price_day, 0)}`}
                            ₫/ngày
                          </Typography>
                        </Grid>
                      ) : (
                          ""
                        )}

                      {(room.is_discount === 0 && room.price_hour > 0) || (room.is_discount === 1 && room.price_hour_discount > 0) ? (
                        <Grid className={classes.hourPrice}>
                          {room.is_discount === 1 ? (
                            <span className={classes.discountPriceText}>
                              {`${formatMoney(room.price_hour, 0)}`}
                              ₫/4 giờ
                            </span>
                          ) : (
                              ""
                            )}
                          <Typography
                            className={classes.priceText}
                            variant={typoVariant}
                          >
                            {`${formatMoney(room.is_discount === 1 ? room.price_hour_discount : room.price_hour, 0)}`}
                            ₫/4 giờ
                          </Typography>
                        </Grid>
                      ) : (
                          ""
                        )}
                    </Grid>
                  </Grid>
                </Link>
                {/* <Grid className={classes.boxSave}>  DID NOT HAVE THAT FEATURE YET
                  <FavoriteAnimation />                 TODO: Do the save
                </Grid> */}
              </Grid>
            </div>
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
