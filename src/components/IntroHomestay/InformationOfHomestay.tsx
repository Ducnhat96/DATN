import React, {ComponentType, Fragment} from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import imgRoomDemo from '@/assets/room_demo.jpeg';
import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import imgRoomDemo3 from '@/assets/room_demo3.jpeg';
import imgNew from '@/assets/new5.png';
import imgHot from '@/assets/tinderHot.png';
import imgCoupon from '@/assets/coupon.png';
import certified from '@/assets/certified.png';
import StarRatings from 'react-star-ratings';
import Location from '@material-ui/icons/LocationOnOutlined';
import Flash from '@material-ui/icons/FlashOnRounded';
import MeetingRoom from '@material-ui/icons/MeetingRoomRounded';
import LocalHotel from '@material-ui/icons/LocalHotelRounded';
import Wifi from '@material-ui/icons/WifiRounded';
import Fastfood from '@material-ui/icons/FastfoodRounded';
import Flight from '@material-ui/icons/FlightRounded';
import Restaurant from '@material-ui/icons/RestaurantRounded';
import LocalFlorist from '@material-ui/icons/LocalFloristRounded';
import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/PageProfile/StylePageProfile.scss';
import FavoriteAnimation from '@/components/IntroHomestay/FavoriteAnimation';
import {ThemeCustom} from '@/components/Theme/Theme';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    padding: 16,
  },
  boxInfo: {
    margin: '10px auto',
  },

  txtAddress: {
    color: '#008489',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.57,
  },
  txtRoomName: {
    fontSize: 20,
    fontWeight: 500,
    paddingRight: 8,
  },
  iconLocation: {
    verticalAlign: 'text-top',
    fontSize: 20,
  },
  rowMargin: {
    margin: '4px 0',
  },
  imgPromotion: {
    width: 35,
    height: 35,
    padding: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 500,
  },
  perTime: {
    fontSize: 13,
  },
  oldPrice: {
    color: 'grey',
    position: 'relative',
    fontSize: 15,
    '&::before': {
      content: '" "',
      position: 'absolute',
      right: 0,
      top: '50%',
      width: '100%',
      borderTop: '1px solid grey',
      transform: 'rotate(10deg)',
      WebkitTransform: 'rotate(10deg)',
    },
  },
  saleOff: {
    backgroundColor: '#e53935',
    borderRadius: 5,
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 11,
    padding: '4px 8px',
  },
  sizeFlash: {
    fontSize: 18,
  },
  btFlash: {
    fontSize: 12,
    padding: 5,
    textTransform: 'none',
    backgroundColor: '#ffb74d',
    '&:hover': {
      backgroundColor: '#ff9800',
    },
  },
  boxBook: {
    borderLeft: '1px solid #E9EBEE',
    width: '100%',
    padding: 2,
  },
  benchmark: {
    backgroundColor: '#488BF8',
    padding: 8,
    fontSize: 25,
    borderRadius: 5,
    color: '#ffffff',
    textAlign: 'center',
    marginLeft: 8,
  },
  review: {
    backgroundColor: '#D1D7E2',
    padding: '2px 10px',
    fontSize: 10,
    borderRadius: '25px',
  },
  collectionConvenient: {
    margin: '10px 8px',
    textAlign: 'right',
  },
  spanConvenient: {
    position: 'relative',
    display: 'inline-block',
    width: 26,
    height: 26,
    marginRight: 3,
    borderRadius: '50%',
    border: '1px solid #484848',
    textAlign: 'center',
  },
  spanTotal: {
    color: '#5090F9',
    fontSize: 12,
    fontWeight: 500,
  },
  spanConvenientTotal: {
    position: 'relative',
    display: 'inline-block',
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: '1px solid #5090F9',
    textAlign: 'center',
  },
  roomAmenitiesTitle: {
    color: '#484848',
    display: 'inline-block',
    margin: '0 5px',
    fontSize: 11,
  },
  collectionAmenities: {
    paddingLeft: 5,
  },
  boxFavorite: {
    paddingTop: 16,
    textAlign: 'center',
  },
  iconConvenient: {
    verticalAlign: 'top',
    color: '#484848',
    fontSize: 19,
    margin: 0,
    padding: '3px 4px',
  },
  roomAmenitiesIcon: {
    verticalAlign: 'middle',
    color: '#484848',
  },
});

interface IInformationOfHomestay {
  classes?: any;
}

const InformationOfHomestay: ComponentType<IInformationOfHomestay> = (props: IInformationOfHomestay) => {
  const {classes}          = props;
  const settings: Settings = {
    speed: 100,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <Paper className = {classes.boxInfo}>
        <Grid container spacing = {8} direction = 'row' justify = 'center'>
          <Grid item sm = {4}>
            <Slider {...settings}>
              <img src = {imgRoomDemo} />
              <img src = {imgRoomDemo2} />
              <img src = {imgRoomDemo3} />
            </Slider>
          </Grid>
          <Grid item container spacing = {8} sm = {5}>
            <Grid item xs = {9} container direction = 'column' justify = 'space-around' alignItems = 'flex-start'>
              <Grid item className = {classes.rowMargin}>
                <span className = {classes.txtRoomName}>Room Name Demo</span>
                <StarRatings
                  rating = {3} //https://www.npmjs.com/package/react-star-ratings
                  numberOfStars = {3}
                  starDimension = '20px'
                  starSpacing = '1px'
                  starRatedColor = '#FFC412'
                />
              </Grid>
              <Grid item className = {classes.rowMargin}>
                    <span className = {classes.txtAddress}>
                      <Location className = {classes.iconLocation} />
                      Ngo 22, hem 4, 123 Vu Trong Phung, Ba Dinh, Ha Noi
                    </span>
              </Grid>
              <Grid item className = {classes.rowMargin}>
                <img alt = 'promotion' src = {imgNew} className = {classes.imgPromotion} />
                <img alt = 'promotion' src = {imgHot} className = {classes.imgPromotion} />
                <img alt = 'promotion' src = {imgCoupon} className = {classes.imgPromotion} />
              </Grid>
              <Grid item container spacing = {8} className = {classes.rowMargin}>
                <Grid item xs>
                  <div>
                    <span className = {classes.price}>1.700.000 <sup>&#8363;</sup></span>
                    <sub className = {classes.perTime}>/day</sub>
                  </div>
                  <div style = {{textAlign: 'right'}}>
                        <span className = {classes.oldPrice}>1.900.000 <sup>&#8363;</sup>
                        <sub>/day</sub></span>
                  </div>
                </Grid>
                <Grid item xs>
                  <div>
                    <span className = {classes.price}>1.200.000 <sup>&#8363;</sup></span>
                    <sub className = {classes.perTime}>/4 hours</sub>
                  </div>
                  <div style = {{textAlign: 'right'}}>
                        <span className = {classes.oldPrice}>1.300.000 <sup>&#8363;</sup>
                        <sub>/4h</sub></span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs = {3} direction = 'column' justify = 'flex-end' alignItems = 'flex-end'>
              <Grid item xs>
                <div style = {{textAlign: 'right'}}>
                  <img alt = 'certified' src = {certified} width = '50%' />
                </div>
              </Grid>
              <Grid item xs>
                <div className = {classes.saleOff}>25% off today</div>
              </Grid>
              <Grid item xs>
                <Button variant = 'contained' color = {'primary'} className = {classes.btFlash}>
                  <Flash className = {classes.sizeFlash} />
                  Instant Book
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container sm = {3} justify = 'space-between' alignItems = 'center'>
            <div className = {classes.boxBook}>
              <Grid item xs = {12} container direction = 'row'>
                <Grid item xs = {8}>
                  <div {...{align: 'right'} as any}>
                    <span className = {classes.review}>Excellent</span>
                  </div>
                  <div style = {{textAlign: 'right'}}>
                    <span className = {classes.review}>1.234 Reviews</span>
                  </div>
                </Grid>
                <Grid item xs = {4}>
                  <div className = {classes.benchmark}>
                    9.9
                  </div>
                </Grid>
              </Grid>
              <Grid item xs = {12}>
                <div className = {classes.collectionConvenient}>
                  <div className = {classes.spanConvenient}><Flight className = {classes.iconConvenient} /></div>
                  <div className = {classes.spanConvenient}>
                    <Restaurant className = {classes.iconConvenient} /></div>
                  <div className = {classes.spanConvenient}>
                    <LocalFlorist className = {classes.iconConvenient} /></div>
                  <div className = {classes.spanConvenientTotal}>
                    <span className = {classes.spanTotal}>+18</span></div>
                </div>
              </Grid>
              <Grid item container xs = {12} spacing = {8}>
                <Grid item xs = {6}>
                  <div className = {classes.collectionAmenities}>
                    <MeetingRoom className = {classes.roomAmenitiesIcon} />
                    <div className = {classes.roomAmenitiesTitle}><span>2 Bedroom(s)</span></div>
                  </div>
                </Grid>
                <Grid item xs = {6}>
                  <div className = {classes.collectionAmenities}>
                    <LocalHotel className = {classes.roomAmenitiesIcon} />
                    <div className = {classes.roomAmenitiesTitle}><span>2 beds</span></div>
                  </div>
                </Grid>
                <Grid item xs = {6}>
                  <div className = {classes.collectionAmenities}>
                    <Wifi className = {classes.roomAmenitiesIcon} />
                    <div className = {classes.roomAmenitiesTitle}><span>Free Wifi</span></div>
                  </div>
                </Grid>
                <Grid item xs = {6}>
                  <div className = {classes.collectionAmenities}>
                    <Fastfood className = {classes.roomAmenitiesIcon} />
                    <div className = {classes.roomAmenitiesTitle}><span>Free Breakfast</span></div>
                  </div>
                </Grid>
              </Grid>
              <Grid item container xs = {12}>
                <Grid item xs = {3}>
                  <FavoriteAnimation />
                </Grid>
                <Grid item xs = {9} className = {classes.boxFavorite}>
                  <Button variant = 'contained' fullWidth color = 'primary'>Book now</Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IInformationOfHomestay, any>(
  withStyles(styles),
)(InformationOfHomestay);
