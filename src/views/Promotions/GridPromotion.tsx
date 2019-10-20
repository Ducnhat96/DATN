import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, MouseEvent, useContext, useEffect, useRef, useState} from 'react';
import {compose} from 'recompose';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Input from "@material-ui/core/Input";
import {PromotionRes} from "@/types/Requests/Promotion/PromotionResponse";
import CardActions from '@material-ui/core/CardActions';
import moment from 'moment';
import 'moment/locale/vi'
import '@/styles/GridPromotion/FlipCard.scss'
import Hidden from '@material-ui/core/Hidden/Hidden';
import {formatMoney} from '@/utils/mixins';
import _ from 'lodash'

interface IPromotions {
  classes?: any
  promotion: PromotionRes
}

const styles: any = (theme: ThemeCustom) => createStyles({
  card: {
    // maxWidth: 400,
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  media: {
    width: '100%',
    height: '13em',
    borderRadius: '0.2em !important',
  },


  t: {
    position: 'absolute',
    width: 'inherit',
    willChange: 'transform, opacity',
    cursor: 'pointer',
  },
  frame: {
    width: '100%',
    position: 'relative',
    height:350,
    // fontFamily: "Roboto",
  },

  ribbonPosition: {
    position: 'absolute',
    top: 12,
    zIndex: 1,
    left: -10,
    minWidth: 120,
    maxWidth: '50%',

  },
  ribbon: {
    backgroundColor: '#f5a623',
    width: '100%',
    padding: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    position: 'relative',
    '&:before': {
      borderStyle: 'solid',
      borderWidth: '10px 0px 0px 10px',
      borderColor: '#f07c00 transparent transparent transparent',
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -10,
    }
  },

  button: {
    // backgroundColor: '#07c',
    color: '#fff',
  },

  grid: {
    paddingBottom: 20,

  },
  input: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 2,
    width: '98%',
    height: 38,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 2,
    fontWeight: 700,
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#f57070',
    color: '#f57070',
    marginBottom: 15,
    '&:before': {
      borderBottom: 'none',
      left: -34,
      position: 'relative',
    },
    '&:after': {
      borderBottom: 'none',
      left: -34,
      position: 'relative',
    }
  },
  promoCopy: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 4,
    width: '98%',
    height: 38,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#488bf8',
    color: '#488bf8',
    fontSize: 14,
    fontWeight: 700,
    // lineHeight: 2.5,
    marginBottom: 14,
    cursor: 'Pointer'
  },

  expireMessage: {
    height: 18,
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1.8,
    color: '#f57070',
  },

  message: {
    margin: '25px 0 14px',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.27,
    color: 'rgba(0,0,0,.6)',

  },
  line: {
    border: '1px solid #ddd',
  },
  title: {
    marginBottom: 5
  },
  inputCode: {
    textAlign: 'center'
  },
  boxButton : {
    paddingTop: 6,
  },
  cardContent : {
    height:34
  },
  cardContentHidden : {
    height:241,
  },
  invalidCoupon: {
    backgroundColor: '#909090',
    width: '100%',
    padding: 10,
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    position: 'relative',
    '&:before': {
      borderStyle: 'solid',
      borderWidth: '10px 0px 0px 10px',
      borderColor: '#f07c00 transparent transparent transparent',
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -10,
    }
  }
});
const GridPromotion: ComponentType<IPromotions> = (props: IPromotions) => {
  const {classes,promotion} = props;
  // console.log(promotion.coupons);
  const [isCardFlip, setIsCardFlip]   = useState(false);
  const [copySuccess, setCopySuccess] = useState('Sao chép');
  const textInput                     = useRef<any>(null);
  const clickInput                    = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const clickCopy = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    textInput.current.select();
    // console.log(textInput.current.select());
    document.execCommand('copy');
    setCopySuccess('Đã sao chép');
  };

  const handleClick = (e: any) => {
    setIsCardFlip(!isCardFlip)
  };

  const search= (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    window.location.replace('/rooms');
  };


  return (
    <Fragment>
      <div className={'flip-card flip-card-vertical'}>
        {/* onClick={handleClick} */}
        <div className={'front-card'}>
          <div className={classes.ribbonPosition}>
            {promotion.status == 1 ?
              (<Typography component='p' className={classes.ribbon}>
                  GIẢM GIÁ {promotion.coupons.data[0].discount}%
              </Typography>)
              : (<Typography component='p' className={classes.invalidCoupon}>
                {promotion.status_txt}
              </Typography>)
            }
          </div>
          <Card className={classes.card} elevation={4} raised={false} style={{ backgroundImage: `url(${`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${promotion.image}`})`}}>
            <div className = {classes.media}>

            </div>
            {/* <CardMedia
              className={classes.media}
              image = {`https://s3-ap-southeast-1.amazonaws.com/westay-img/sm/${promotion.image}`}
              title = 'Thông tin khuyến mãi'
            /> */}
            <CardContent className={classes.cardContent}>
              {/* <Typography variant='h6' className={classes.title} align='left'>
                {promotion.name}
              </Typography> */}
              {/* <div className={classes.line}>
              </div> */}
            </CardContent>
            {/* <Hidden smUp>
              <CardActions>
                <Button className = {classes.button} variant="contained" fullWidth color="primary">
                  Nhận mã giảm giá
                </Button>
              </CardActions>
            </Hidden> */}
          </Card>
        </div>
        <div className={'back-card'}>
          <Card elevation={4} raised={false}>
            <CardContent className={classes.cardContentHidden}>
              <div>
                <Input onClick={clickInput}
                      fullWidth
                      value={promotion.coupons.data[0].code}
                      className={classes.input}
                      inputRef={textInput}
                      inputProps={{
                        'aria-label': 'Description',
                        className: classes.inputCode
                      }}
                      readOnly
                      autoFocus={false}
                />
              </div>
              {/* <div className={classes.promoCopy} onClick={clickCopy}>
                <span> {copySuccess}</span>
              </div> */}
              <Button variant="outlined" color="primary" className={classes.promoCopy} onClick={clickCopy}>
                <span>{copySuccess}</span>
              </Button>
              <Typography component='p' className={classes.expireMessage}>
                Hết hạn trong {promotion.coupons.data[0].day_finish} ngày nữa
              </Typography>
              <Typography component='p' className={classes.message}>
                Mã giảm giá được áp dụng từ ngày {moment(promotion.date_start).format('LL')} đến ngày {moment(promotion.date_end).format('LL')}
              </Typography>
              <div className={classes.line}>

              </div>
              {promotion.coupons.data[0].settings.bind.length == 0 ? (
                <Typography component='p' className={classes.message}>
                  Mã giảm giá giảm tối đa {formatMoney(promotion.coupons.data[0].max_discount)} cho đặt phòng tối thiểu từ {formatMoney(promotion.coupons.data[0].settings.min_price)} đồng. Chi tiết liên hệ : 0946 746 417
                </Typography>
              ) : 
                (_.map(promotion.coupons.data[0].settings.bind, (criteria) => (
                  <ul>
                    {criteria === 'rooms' ?<li>Mã giảm giá chỉ áp dụng cho một số phòng nhất định</li> : ''}
                    {criteria === 'cities' ?<li>Mã giảm giá chỉ áp dụng cho đặt phòng tại một số tỉnh, thành phố</li> : ''}
                    {criteria === 'districts' ?<li>Mã giảm giá chỉ áp dụng cho một số quận, huyện</li> : ''}
                    {criteria === 'days' ?<li>Mã giảm giá chỉ áp dụng cho một số ngày nhất định</li> : ''}
                    {criteria === 'booking_type' && promotion.coupons.data[0].settings.booking_type !== 3 ? <li>Mã giảm giá chỉ áp dụng cho loại đặt phòng theo {promotion.coupons.data[0].settings.booking_type == 1 ? 'Giờ' : 'Ngày'}</li> : ''}
                    {criteria === 'booking_create' ? <li>Mã giảm giá chỉ áp dụng cho đặt phòng được tạo trong khoảng ngày từ {moment(promotion.coupons.data[0].settings.booking_create[0]).format('LL')} tới {moment(promotion.coupons.data[0].settings.booking_create[1]).format('LL')} </li> : ''}
                    {criteria === 'booking_create' ? <li>Mã giảm giá chỉ áp dụng cho đặt phòng có thời gian checkin - checkout từ {moment(promotion.coupons.data[0].settings.booking_stay[0]).format('LL')} tới {moment(promotion.coupons.data[0].settings.booking_stay[1]).format('LL')} </li> : ''}
                    {/* {criteria === 'days_of_week' ?<li>Mã giảm giá chỉ áp dụng cho các ngày thứ </li> : ''} */}
                    {/* {criteria === 'room_type' ?<li>Mã giảm giá chỉ áp dụng cho loại phòng</li> : ''} */}
                  </ul>
                )))
              }
              
              {/* <div className={classes.line}>

              </div> */}
            </CardContent>
            {/* <CardActions>
              <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={search}>
                Tìm nơi ở
              </Button>
            </CardActions> */}
          </Card>
        </div>
      </div>
    </Fragment>
  );

};

export default compose<IPromotions, any>(
  withStyles(styles),
)(GridPromotion);


