import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, memo, useContext, Fragment} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import NextArrowSlider from '@/views/DetailsPage/NextArrowSlider';
import PrevArrowSlider from '@/views/DetailsPage/PrevArrowSlider';
import _ from 'lodash';
import RoomHot from '@/layouts/Main/RoomHot';

interface IProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  nextArrow: {},
});

const SliderSuggest: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const {width}   = useContext<IGlobalContext>(GlobalContext);
  const {state}   = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {roomRecommend} = state;

  const settings: Settings = {
    speed: 500,
    swipeToSlide: true,
    dots: width === 'xs' || width === 'sm',
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: width === 'md' || width === 'lg',
    nextArrow: <NextArrowSlider />,
    prevArrow: <PrevArrowSlider />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
    ]
  };

  return (
    <div className = {classes.root}>
      <Slider {...settings}>
        {roomRecommend !== null ? _.map(roomRecommend, (room) => (
          <Fragment key = {room.id}>
            <RoomHot room = {room} />
          </Fragment>
        )) : ''}
      </Slider>
    </div>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(SliderSuggest);
