import React, { ComponentType, memo } from "react";
import { Grid, createStyles } from "@material-ui/core/es";
import { formatMoney } from "@/utils/mixins";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { ThemeCustom } from "../Theme/Theme";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core";
import { Star } from "@material-ui/icons";

interface IProps {
  classes?: any;
  room: RoomIndexRes;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    review: {
      backgroundColor: "#D1D7E2",
      padding: "1px 10px",
      fontSize: 12,
      borderRadius: "25px"
    },
    benchmark: {
      //   backgroundColor: "#488BF8",
      //   padding: 6,
      //   fontSize: 25,
      //   borderRadius: 5,
      //   color: "#ffffff",
      //   textAlign: "center",
      //   marginLeft: 8
      color: " #999",
      fontWeight: 700,
      fontSize: "0.875rem"
    },
    collectionAmenities: {
      paddingLeft: 0,
      textAlign: "center",
      paddingInlineStart: "0px",
      display: "inline-flex",
      fontWeight: 300
    },
    roomAmenitiesIcon: {
      verticalAlign: "right",
      width: 20,
      height: 20,
      color: "rgb(255, 167, 38)"
    },
    roomAmenitiesTitle: {
      //   margin: "0 5px"
      //   fontSize: 13,
      //   [theme!.breakpoints!.down!("xs")]: {
      //     fontSize: 11
      //   }
    },
    rating: {
      color: "rgb(255, 167, 38)"
    }
  });

const RoomCardReviewMobile: ComponentType<IProps> = props => {
  const { classes, room } = props;

  return (
    <Grid container>
      <Grid item xs={12} container>
        <Grid style={{ display: "inline-flex" }} item xs={12}>
          <div className={classes.collectionAmenities}>
            <Star className={classes.roomAmenitiesIcon} />
            <div className={classes.roomAmenitiesTitle}>
              &nbsp;
              <span className={classes.rating}>{`${formatMoney(
                room.avg_rating,
                1
              )}`}</span>{" "}
              <span className={classes.benchmark}>{`${formatMoney(
                room.total_review
              )} Đánh giá`}</span>
            </div>
          </div>
        </Grid>

        {/* <Grid item>
          <div {...{ align: "right" } as any}>
            <span className={classes.review}>{room!.avg_rating_txt}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className={classes.review}>{`${formatMoney(
              room.total_review
            )} Đánh giá`}</span>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.benchmark}>
            {`${formatMoney(room.avg_rating, 1)}`}
          </div>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(RoomCardReviewMobile);
