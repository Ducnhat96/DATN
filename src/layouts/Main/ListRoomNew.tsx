import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense
} from "react";
import { compose } from "recompose";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@material-ui/core/Grid";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";
import RoomHot from "@/layouts/Main/RoomHot";

import _ from "lodash";
import {
  RoomHomepageContext,
  IRoomHomepageContext,
  getRoomNew
} from "@/store/context/Room/RoomHomepageContext";
import SimpleLoader from "@/components/Loading/SimpleLoader";

import LazyLoad from "react-lazyload";
import { windowExist } from "@/index";
interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    listRoomNew: {
      width: "100%",
      display: "block"
    },
    titleRoom: {
      color: "rgb(72, 72, 72)"
    }
  });
// const RoomHot = lazy(() => import('@/layouts/Main/RoomHot'));

// @ts-ignore
const ListRoomNew: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;

  const { state, dispatch } = useContext<IRoomHomepageContext>(
    RoomHomepageContext
  );

  const { roomsNew } = state;

  const settingRoomHot: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    lazyLoad: "ondemand",
    swipeToSlide: true,
    nextArrow: <NextArrowSlider />,
    touchThreshold: 100,
    prevArrow: <PrevArrowSlider />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 5000,
          touchThreshold: 100
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          autoplay: true,
          arrows: false,
          autoplaySpeed: 5000,
          touchThreshold: 100
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          touchThreshold: 100,
          arrows: false,
          centerMode: true,
          centerPadding: "25px"
        }
      }
    ]
  };

  useEffect(() => {
    getRoomNew()
      .then(data => {
        const roomData = data.data;
        dispatch({
          type: "setRoomNew",
          rooms: roomData
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      <h2 className={classes.titleRoom}>Phòng mới</h2>
      <Grid container className={classes.listRoomNew}>
        {roomsNew ? (
          <Slider {...settingRoomHot}>
            {_.map(roomsNew, (room, index) => (
              <div key={index}>
                <RoomHot room={room} />
              </div>
            ))}
          </Slider>
        ) : (
            <SimpleLoader />
          )}
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(ListRoomNew);
