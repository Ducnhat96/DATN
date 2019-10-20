import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, MouseEvent, useEffect, useState} from 'react';
import {compose} from 'recompose';
import NavTop from '@/components/ToolBar/NavTop';
import NavSearch from '@/components/ToolBar/NavSearch';
import Footer from '@/layouts/Main/Footer';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import GridPromotion from '@/views/Promotions/GridPromotion';
import {PromotionRes} from '@/types/Requests/Promotion/PromotionResponse';
import {axios} from '@/utils/axiosInstance';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {AxiosError} from 'axios';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import _ from 'lodash'
import {Hidden} from '@material-ui/core';
import promotionBaner from '@/assets/promotion-83.png';
import Typography from '@material-ui/core/Typography';


interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  card: {
    maxWidth: 400,
  },
  boxBody: {
    padding: '20px 0px',
  },
  media: {
    width: '100%',
    height: '15em',
    borderRadius: '0.2em !important',
  },
  button: {
    backgroundColor: '#07c',
    color: '#fff',
  },

  grid: {
    paddingBottom: 25,

  },
  boxTitle : {
    padding: '10px 20px 20px 20px',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '0px 25px',
    },
  },
  titlePromotion : {
    backgroundColor:'#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 34,
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 20,
    },
  },
  image : {
    height: 24,
  },

  boxPadding: {
    padding: '1px 16px',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '10px 25px',
    },
  },
  westay : {
    [theme!.breakpoints!.down!('xs')]: {
      paddingLeft: 39,
    },

  },
  banner: {
    width: '100%',
    height: 350,
    objectFit: 'cover',
  }

});
const Promotion: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [promotion, setPromotion] = useState<PromotionRes[] | null>(null);

  useEffect(() => {
    axios.get(`promotions?include=coupons&status=1`).then((res: AxiosRes<PromotionRes[]>) => {
      setPromotion(res.data.data);


    }).catch((err: AxiosError) => {
    });

  }, []);

  if (promotion == null) {
    return <SimpleLoader/>;
  }

  return (
    <Fragment>
      <NavTop/>
      <Hidden xsDown>
        <NavSearch/>
      </Hidden>
      <div>
        <img src={promotionBaner} alt="" className={classes.banner}/>
      </div>
      <div className={classes.boxBody}>
        <GridContainer xs={12} sm={12} md={10} lg={10}>
        <div className={classes.boxTitle}>
          <Typography component='h3' className={classes.titlePromotion}>
            Ưu đãi mới nhất
          </Typography>
          <Hidden xsDown>
            <Typography component='p'>
              Cập nhật những ưu đãi mới nhất từ Westay.vn và đặt phòng với giá cực rẻ
            </Typography>
          </Hidden>
        </div>
      </GridContainer>
        <GridContainer xs={12} sm={12} md={10} lg={10}>
          <Grid container  alignContent='center' className={classes.grid}>
            {promotion !== null ? _.map(promotion, (promo) => (
              <Grid item xs={12} sm={6} md={6} lg ={4} key={promo.id}  className = {classes.boxPadding}>
                <GridPromotion promotion={promo}/>
              </Grid>
            )) : <SimpleLoader height = {200} width = {300} />}
          </Grid>
        </GridContainer>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Promotion);


