import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense
} from 'react';
import { compose } from 'recompose';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Grid from '@material-ui/core/Grid';
import NextArrowSlider from '@/views/DetailsPage/NextArrowSlider';
import PrevArrowSlider from '@/views/DetailsPage/PrevArrowSlider';
import RoomHot from '@/layouts/Main/RoomHot';

import _ from 'lodash';
import {
  RoomHomepageContext,
  IRoomHomepageContext,
  getRoomHot
} from '@/store/context/Room/RoomHomepageContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';

import LazyLoad from 'react-lazyload';
import { windowExist } from '@/index';
interface IProps {
  classes?: any;
}
// const RoomHot = lazy(() => import('@/layouts/Main/RoomHot'));

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    listRoomHot: {
      width: '100%',
      display: 'block',
      marginTop: '42px'
    },
    titleRoom: {
      color: 'rgb(72, 72, 72)'
    }
  });

// @ts-ignore
const ListRoomHot: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const { state, dispatch } = useContext<IRoomHomepageContext>(
    RoomHomepageContext
  );

  const { roomsHot } = state;

  const settingRoomHot: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
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
          dots: true,
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
          dots: true,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          touchThreshold: 100,
          arrows: false
        }
      }
    ]
  };

  useEffect(() => {
    getRoomHot()
      .then(data => {
        const roomData = data.data;
        dispatch({
          type: 'setRoomHot',
          rooms: roomData
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      <Grid container className={classes.listRoomHot}>
        <h2 className={classes.titleRoom}>Phòng nổi bật</h2>
        {roomsHot ? (
          <Slider {...settingRoomHot}>
            {_.map(roomsHot, (room, index) => (
              <div key={index}>
                {/* <LazyLoad height={200} offset={windowExist ? window.innerHeight : 0}> */}
                {/* <Suspense fallback={<SimpleLoader />}> */}
                <RoomHot room={room} />
                {/* </Suspense> */}
                {/* </LazyLoad> */}
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

export default compose<IProps, any>(withStyles(styles))(ListRoomHot);
