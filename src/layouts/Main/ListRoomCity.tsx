import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
} from "react";
import { compose } from "recompose";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/chongchaycuaSON.scss";
import Grid from "@material-ui/core/Grid";
import RoomCity from "@/layouts/Main/RoomCity";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";

import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import _ from "lodash";
import {
  RoomHomepageContext,
  IRoomHomepageContext,
  getRoomCity
} from "@/store/context/Room/RoomHomepageContext";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    listRoomCity: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        display: "block"
      }
    },
    titleRoom: {
      color: "rgb(72, 72, 72)"
    }
  })
);

// @ts-ignore
const ListRoomCity: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const { state, dispatch } = useContext<IRoomHomepageContext>(
    RoomHomepageContext
  );
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const { roomsCity } = state;

  const settingRoomCity: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    lazyLoad: "ondemand",
    // nextArrow: <NextArrowSlider />,
    // prevArrow: <PrevArrowSlider />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 5000
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 3,
          autoplay: true,
          arrows: false,
          autoplaySpeed: 5000
        }
      },
      {
        breakpoint: 425,
        settings: {
          dots: true,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
          centerMode: true,
          centerPadding: "25px"
        }
      }
    ]
  };

  useEffect(() => {
    getRoomCity()
      .then(data => {
        const roomData = data.data;
        dispatch({
          type: "setRoomCity",
          rooms: roomData
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      <h2 className={classes.titleRoom}>Điểm đến nổi bật</h2>
      <Grid container className={classes.listRoomCity} spacing={1}>
        {width === "lg" ? (
          roomsCity.map((room, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={room.city_id}>
                <RoomCity room={room} />
              </Grid>
            );
          })
        ) : (
            <Slider {...settingRoomCity}>
              {roomsCity.map((room, index) => (
                <Fragment key={room.city_id}>
                  <RoomCity room={room} />
                </Fragment>
              ))}
            </Slider>
          )}
      </Grid>
    </Fragment>
  );
};

export default ListRoomCity;
