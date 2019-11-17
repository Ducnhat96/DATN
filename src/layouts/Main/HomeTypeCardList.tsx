import React, { Fragment, ComponentType, useContext } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import CardDetail from "@/layouts/Main/CardDetail";
import { ThemeCustom } from "@/components/Theme/Theme";
import { createStyles, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import url1 from "@/assets/room_demo3.jpeg";
import url2 from "@/assets/room_demo2.jpeg";
import url3 from "@/assets/room_demo.jpeg";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import Slider, { Settings } from "react-slick";
import NextArrowSlider from "@/views/DetailsPage/NextArrowSlider";
import PrevArrowSlider from "@/views/DetailsPage/PrevArrowSlider";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    HomeTypeCardList: {
      marginTop: "42px"
    }
  })
);

interface IProps {
  classes?: any;
}

const data = [
  {
    url: url1,
    content: "Căn hộ dịch vụ",
    onClick: () => window.open(`/rooms?room_type=2`)
  },
  {
    url: url2,
    content: "Villa",
    onClick: () => window.open(`/rooms?room_type=3`)
  },
  {
    url: url3,
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
  // nextArrow: <NextArrowSlider />,
  // prevArrow: <PrevArrowSlider />,
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

const HomeTypeCardList: ComponentType<IProps> = props => {
  const classes = useStyles(props);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  return (
    <Fragment>
      <Grid className={classes.HomeTypeCardList} container spacing={1}>
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

export default HomeTypeCardList;
