import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, { ComponentType, Fragment } from "react";
import { compose } from "recompose";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@material-ui/core/Grid";
import RoomCollection from "@/layouts/Main/RoomCollection";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    titleRoom: {
      color: "rgb(72, 72, 72)"
    },
    listRoomCollection: {
      marginTop: "42px",
      clear: "both",
      width: "100%",
      display: "block"
    }
  })
);

// @ts-ignore
const ListRoomCollection: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const settingRoomCollection: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          autoplay: false
        }
      },
      {
        breakpoint: 740,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          autoplay: false
        }
      }
    ]
  };

  return (
    <Fragment>
      <Grid container className={classes.listRoomCollection}>
        <h2 className={classes.titleRoom}>Bộ sưu tập phòng</h2>
        <Slider {...settingRoomCollection}>
          <RoomCollection />
          <RoomCollection />
          <RoomCollection />
        </Slider>
      </Grid>
    </Fragment>
  );
};

export default ListRoomCollection;
