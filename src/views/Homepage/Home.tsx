import React, { Fragment, FunctionComponent, useState, useEffect } from "react";
import NavTopHomePage from "@/views/Homepage/NavTopHomePage";
import GridContainer from "@/layouts/Grid/Container";
import { compose } from "recompose";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import SearchHomeNew from "@/layouts/Main/SearchHomeNew";
import Grid from "@material-ui/core/Grid";
import useFocusTitle from "@/utils/focusState";
// import BG from '@/assets/bg_1.jpg';
import "@/styles/date-picker.scss";
import "@/styles/Airbnb/date-picker-homepage.scss";
import Footer from "@/layouts/Main/Footer";
import ListRoom from "@/layouts/Main/ListRoom";
import Promotion from "@/layouts/Main/Promotion";
// import Paper from '@material-ui/core/Paper';
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
      // backgroundImage: `url(${BG})`,
      // backgroundImage: `url(https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/bg_1.jpg)`,
      // backgroundImage: `url(https://images.unsplash.com/photo-1480365443306-930b898cb434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=40)`,
      backgroundImage: `url(${BG})`,
      backgroundRepeat: "no-repeat",
      // backgroundSize: 'cover',
      // backgroundPosition: 'top',
      // backgroundAttachment: 'fixed',
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
      // marginTop: '70px',
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
    "VN-Homestay - Homestay cho người Việt"
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
            {/* <Paper elevation={4} className={classes.paperCustom} square> */}
            <SearchHomeNew />
            {/* </Paper> */}
            {/* <Promotion /> */}
            <Grid item lg={2} md={1} />
            {/* {promotion !== null ? _.map(promotion, (promo) => (
              <Hidden smDown key={promo.date_start}>
                <Grid item md={5} lg ={5} key={promo.id}>
                  <GridPromotion promotion={promo}/>
                </Grid>
              </Hidden>
            )) : <SimpleLoader height = {200} width = {300} />} */}
          </Grid>
        </GridContainer>
      </div>
      <ListRoom />
      <Footer />
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(Home);
