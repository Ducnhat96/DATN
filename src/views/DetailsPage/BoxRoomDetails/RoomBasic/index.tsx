import {
  faBath,
  faBed,
  faDoorOpen,
  faHeart,
  faRulerCombined,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/styles";
import React, { ComponentType } from "react";
import { compose } from "recompose";
import { ThemeCustom } from "@/components/Theme/Theme";

interface IProps {
  classes?: any;
  name: string;
  id: number;
  max_guest: number;
  max_additional_guest: number;
  number_bed?: number;
  number_room: number;
  bathroom: number;
  totalComforts: number;
  avg_rating: number;
  total_area?: number;
  avg_rating_txt: string;
  showBed?: boolean;
  isPreviewPage?: boolean;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    roomName: {
      fontWeight: 700
    },
    roomId: {
      marginTop: "-10px",
      fontSize: "0.80rem"
    },
    iconHeartBlue: {
      color: "#08C299",
      marginRight: 3
    },
    iconHeartWhite: {
      color: "#ddd",
      marginRight: 3
    }
  });

const RoomBasic: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const {
    name,
    id,
    max_guest,
    max_additional_guest,
    number_bed,
    number_room,
    bathroom,
    totalComforts,
    avg_rating,
    avg_rating_txt,
    showBed,
    total_area,
    isPreviewPage
  } = props;

  const arrMenuItem = (x: number): any[] => {
    let i = 1;
    let arr = [];
    let z = Math.round(x);
    while (i <= 5) {
      if (i <= z) {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartBlue}
            icon={faHeart}
          />
        );
      } else {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartWhite}
            icon={faHeart}
          />
        );
      }
      i++;
    }
    return arr;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.roomName}>
              {isPreviewPage && !name ? "Chưa có tên căn hộ" : name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.roomId}>
              Room No. {id}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div>
              <span>{arrMenuItem(avg_rating)}</span>
              <span>
                {avg_rating} &#8208; {avg_rating_txt}
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={6} sm={6} md={3} lg xl={3}>
            <Grid container alignItems="center">
              <Grid item xs={2} sm={2}>
                <FontAwesomeIcon icon={faUserFriends} />
              </Grid>
              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                <Typography variant={"body2"}>
                  {max_guest + max_additional_guest} khách
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {showBed ? (
            <Grid item xs={6} sm={6} md={3} lg xl={3}>
              <Grid container alignItems="center">
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faBed} />
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={"body2"}>{number_bed} giường</Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={6} sm={6} md={3} lg xl={3}>
              <Grid container alignItems="center">
                <Grid item xs={2} sm={2}>
                  <FontAwesomeIcon icon={faRulerCombined} />
                </Grid>
                <Grid className={classes.nameIcon} item xs={10} sm={10}>
                  <Typography variant={"body2"}>
                    {total_area} m<sup>2</sup>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <Grid container alignItems="center">
              <Grid item xs={2} sm={2}>
                <FontAwesomeIcon icon={faBath} />
              </Grid>
              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                <Typography variant={"body2"}>
                  {bathroom > 0
                    ? `${bathroom} phòng tắm`
                    : `${totalComforts} tiện ích`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <Grid container alignItems="center">
              <Grid item xs={2} sm={2}>
                <FontAwesomeIcon icon={faDoorOpen} />
              </Grid>
              <Grid className={classes.nameIcon} item xs={10} sm={10}>
                <Typography variant={"body2"}>
                  {number_room} phòng ngủ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

RoomBasic.defaultProps = {
  showBed: true,
  number_bed: 0
};
export default compose<IProps, any>(withStyles(styles))(RoomBasic);
