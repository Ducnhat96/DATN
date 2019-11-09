import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, { ComponentType, Fragment, useContext } from "react";
import { compose } from "recompose";

import Card from "@material-ui/core/Card";
// // import CardActionArea from '@material-ui/core/CardActionArea';
// // import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarRatings from "react-star-ratings";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { formatMoney } from "@/utils/mixins";
import LazyLoad from "react-lazyload";
import { windowExist } from "@/index";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import { newRoomLocation } from "@/store/context/Room/RoomIndexContext";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

interface IProps {
  classes?: any;
  room: RoomIndexRes;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    card: {
      padding: "0 5px",
      backgroundColor: "transparent"
    },
    media: {
      height: "12em",
      width: "100%",
      borderRadius: "5px",
      objectFit: "cover",
      cursor: "pointer"
    },
    cardContent: {
      padding: 0,
      paddingTop: "1em"
    },
    nameCity: {
      fontWeight: 500,
      fontSize: "0.7em !important",
      lineHeight: "16px !important",
      letterSpacing: "normal !important",
      textTransform: "uppercase",
      color: "rgb(118, 118, 118) !important",
      textOverflow: "ellipsis !important",
      whiteSpace: "nowrap",
      marginBottom: "2px !important",
      overflow: "hidden !important"
    },
    nameRoom: {
      fontWeight: 700,
      fontSize: "0.875em !important",
      lineHeight: "21px !important",
      maxHeight: "42px !important",
      textOverflow: "ellipsis !important",
      display: "-webkit-box !important",
      marginTop: "7px !important",
      marginBottom: "4px !important",
      overflow: "hidden !important",
      color: "rgb(72, 72, 72) !important",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      textTransform: "uppercase",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    priceRoom: {
      fontWeight: 600,
      fontSize: "0.85em !important",
      lineHeight: "18px !important",
      letterSpacing: "normal !important",
      display: "inline-block",
      marginBottom: "4px !important"
    },
    totalReview: {
      overflowWrap: "break-word",
      fontSize: "12px !important",
      fontWeight: 600,
      lineHeight: "1.33333em !important",
      color: "rgb(72, 72, 72) !important",
      margin: "0px !important",
      float: "left",
      paddingLeft: "4px"
    },
    starRatings: {
      float: "left"
    },
    verticalMid: {
      verticalAlign: "middle",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    address: {
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: "#909090"
    }
  });

// @ts-ignore
const RoomHot: ComponentType<IProps> = (props: IProps) => {
  const { classes, room } = props;
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const cardEvent = () => {
    let win = window.open(`/room/${room.id}`, "_blank");
    win!.focus();
  };

  const citySearch = (values: RoomIndexRes) => {
    const pushQuery: RoomUrlParams = {
      city_id: values.city_id,
      district_id: values.district_id
    };

    const location = newRoomLocation(pushQuery);
    history.push(location);
  };

  return (
    <Fragment>
      <Card className={classes.card} elevation={0}>
        {/* <CardActionArea> */}
        <LazyLoad height={200} offset={windowExist ? window.innerHeight : 0}>
          <img
            onClick={cardEvent}
            src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${room.media.data[0] ? room.media.data[0].image : ''}`}
            className={classes.media}
            alt={`VN-Homestay - Homestay cho người việt`}
          />
        </LazyLoad>
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.nameCity}>
            {room.room_type_txt}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            className={classes.nameRoom}
            onClick={cardEvent}
          >
            {room.details.data[0].name}
          </Typography>

          <div style={{ display: "inline-block", width: "100%" }}>
            <span className={classes.starRatings}>
              <StarRatings
                numberOfStars={room.standard_point}
                starDimension={"14px"}
                starSpacing={"1px"}
                starEmptyColor={"#F5A623"}
              />
            </span>
          </div>
          {room.rent_type != 1 ? (
            room.price_day > 100000 ? (
              <Typography
                component="p"
                className={classes.priceRoom}
                color="primary"
              >
                {`${formatMoney(room.price_day, 0)}`}đ/ngày
              </Typography>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {room.rent_type != 2 ? (
            room.price_hour > 100000 ? (
              <Typography
                component="p"
                className={classes.priceRoom}
                color="primary"
              >
                &ensp;&ensp;&ensp;{`${formatMoney(room.price_hour, 0)}`}đ/4 giờ
              </Typography>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div style={{ display: "inline-block", width: "100%" }}>
            <span
              className={classes.verticalMid}
              onClick={() => citySearch(room)}
            >
              <a className={classes.address}>{`
                ${room.district.data.name},
                  ${room.city.data.name}
                `}</a>
            </span>
          </div>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(RoomHot);
