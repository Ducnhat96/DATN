import React, { Fragment, ComponentType, useContext } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import CardDetail from "@/layouts/Main/CardDetail";
import { ThemeCustom } from "@/components/Theme/Theme";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import Slider, { Settings } from "react-slick";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    villaHomestay: {
      marginTop: "42px"
    }
  });

interface IProps {
  classes?: any;
}

const data = [
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/room.jpg',
    content: "Căn hộ dịch vụ",
    onClick: () => window.open(`/rooms?room_type=2`)
  },
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/villa.jpg',
    content: "Villa",
    onClick: () => window.open(`/rooms?room_type=3`)
  },
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/house.jpg',
    content: "Nhà riêng",
    onClick: () => window.open(`/rooms?room_type=1`)
  }
];

const setting: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  swipeToSlide: true,
  lazyLoad: "ondemand",
  nextArrow: <NextArrowSlider />,
  prevArrow: <PrevArrowSlider />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000
      }
    },
    {
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 1,
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

const VillaHomestay: ComponentType<IProps> = props => {
  const { classes } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  return (
    <Fragment>
      <Grid className={classes.villaHomestay} container spacing={8}>
        {width === "xs" || width === "sm" ? (
          <Slider {...setting}>
            {data.map((item, index) => (
              <Grid key={index}>
                <CardDetail {...item} />
              </Grid>
            ))}
          </Slider>
        ) : (
            data.map((item, index) => (
              <Grid key={index} item xs={12} md={3}>
                <CardDetail {...item} />
              </Grid>
            ))
          )}
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(VillaHomestay);
