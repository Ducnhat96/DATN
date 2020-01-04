import React, { Fragment, FunctionComponent, useState, useEffect } from "react";
import NavTopHomePage from "@/views/Homepage/NavTopHomePage";
import GridContainer from "@/layouts/Grid/Container";
import { compose } from "recompose";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import SearchHome from "@/layouts/Main/SearchHome";
import Grid from "@material-ui/core/Grid";
import useFocusTitle from "@/utils/focusState";
import "@/styles/date-picker.scss";
import "@/styles/Airbnb/date-picker-homepage.scss";
import Footer from "@/layouts/Main/Footer";
import ListRoom from "@/layouts/Main/ListRoom";
import Promotion from "@/layouts/Main/Promotion";
import "@/styles/Custom/maxWidthXl.scss";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import GridPromotion from "@/views/Promotions/GridPromotion";
import { AxiosError } from "axios";
import { axios } from "@/utils/axiosInstance";
import { PromotionRes } from "@/types/Requests/Promotion/PromotionResponse";
import { AxiosRes } from "@/types/Requests/ResponseTemplate";
import _ from "lodash";
import Hidden from "@material-ui/core/Hidden";
import BG from "@/assets/Bg_home.jpg";
import NavTop from "@/components/ToolBar/NavTop";

interface IProps {
  classes?: any;
}

const styles = (theme: Theme) =>
  createStyles({
    panel: {
      height: "100vh",
      backgroundImage: `url(${BG})`,
      backgroundRepeat: "no-repeat",
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundPositionY: "50%"
    },
    panelBlur: {
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        background: "rgba(47, 103, 177, 0.6)"
      }
    },
    panelBody: {
      paddingTop: "11%"
    }
  });

const Home: FunctionComponent<IProps | any> = props => {
  const { classes } = props;
  const [promotion, setPromotion] = useState<PromotionRes[] | null>(null);

  useEffect(() => {
    axios
      .get(`promotions?include=coupons&status=1`)
      .then((res: AxiosRes<PromotionRes[]>) => {
        setPromotion(res.data.data);
      })
      .catch((err: AxiosError) => {});
  }, []);

  useFocusTitle(
    typeof window !== "undefined" ? document.title : "",
    "Homestay cho mọi người - VNHOMESTAY "
  );

  return (
    <Fragment>
      <Hidden mdUp>
        <NavTop hiddenListCitySearch={true} />
      </Hidden>

      <div className={classes.panel}>
        <Hidden smDown>
          <NavTopHomePage hiddenListCitySearch={true} />
        </Hidden>

        <GridContainer xs={10}>
          <Grid container spacing={24} className={classes.panelBody}>
            <SearchHome />
            <Grid item lg={2} md={1} />
          </Grid>
        </GridContainer>
      </div>
      <ListRoom />
      <Footer />
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(Home);
