import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import fakeIMG from "@/assets/room_demo.jpeg";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, { ComponentType, Fragment } from "react";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import StarRatings from "react-star-ratings";
import { formatMoney } from "@/utils/mixins";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { IMAGE_STORAGE_XS } from "@/utils/store/global";
import { windowExist } from "@/index";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    image: {
      maxWidth: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      objectFit: "cover",
      minHeight: 100
    },
    root: {
      cursor: "pointer",
      boxShadow: "-11px 6px 7px -11px #777",
      WebkitBoxShadow: "-11px 6px 7px -11px #777",
      MozBoxShadow: "-11px 6px 7px -11px #777"
    },
    wordWrapTitle: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      fontWeight: 700
    }
  })
);

interface IRoomRecentlyProps {
  room: RoomIndexRes;
}

// @ts-ignore
const RoomRecently: ComponentType<IRoomRecentlyProps> = props => {
  const classes = useStyles(props);
  const { room } = props;

  const cardEvent = () => {
    if (windowExist) {
      let win = window.open(`/room/${room.id}`, "_blank");
      win!.focus();
    }
  };

  return (
    <Fragment>
      <Grid container onClick={cardEvent} className={classes.root}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={5}>
            <img
              src={`${IMAGE_STORAGE_XS}${room.media.data[0].image}`}
              alt=""
              className={classes.image}
            />
          </Grid>
          <Grid container item xs={7}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.wordWrapTitle}>
                {room.details.data[0].name}
              </Typography>
              <StarRatings
                numberOfStars={room.standard_point}
                starDimension={`15px`}
                starSpacing={`1px`}
                starEmptyColor={"#ff9800"}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              alignItems="flex-end"
              justify="flex-end"
            >
              {room.price_day ? (
                <Grid container item xs={12} justify="flex-end">
                  <Typography variant="subtitle2">
                    {`${formatMoney(room.price_day, 0)}/ngày`}
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
              {room.price_hour ? (
                <Grid container item xs={12} justify="flex-end">
                  <Typography variant="subtitle2">
                    {`${formatMoney(room.price_hour, 0)}/4 giờ`}
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RoomRecently;
