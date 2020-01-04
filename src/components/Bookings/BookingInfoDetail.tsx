import CouponForm from '@/components/Bookings/BookingCouponForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { ThemeCustom } from '@/components/Theme/Theme';
import { formatMoney } from '@/utils/mixins';
import { withStyles, createStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper/Popper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { Fragment, useRef, useState, ComponentType, MouseEvent, useContext } from 'react';
import Loadable from 'react-loadable';
import { compose } from 'recompose';
import { BookingFormContext, IBookingFormContext } from '@/store/context/Booking/BookingFormContext';
import InfoHeader from '@/components/Bookings/InfoHeader';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';

export interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  paperCustom: {
    padding: '1rem',
    boxShadow: 'none !important'
  },
  card: {
    display: 'flex',
    borderRadius: '2px',
  },
  cover: {
    [theme.breakpoints!.down!('sm')]: {
      width: 180,
    },
    [theme.breakpoints!.up!('md')]: {
      width: 130,
    },
    [theme.breakpoints!.up!('lg')]: {
      width: 100,
    },
    height: 80,
    objectFit: 'cover',
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  gridInfo: {
    position: 'sticky',
    top: 0,
  },
  flexCenter: {
    display: 'flex',
  },
  fontLow: {
    fontSize: '0.9rem',
  },
  fontLowTitle: {
    fontSize: '0.9rem',
    color: '#999'
  },
  spaceTop: {
    marginTop: 8,
  },
  paperCustomOuter: {
    padding: 15,
    marginBottom: '1rem',
    background: '#f2fbf7',
    boxShadow: 'none !important'

  },
});

const BookingInfoDetail: ComponentType<IProps> = props => {
  const {
    classes,
  } = props;

  const { state, dispatch } = useContext<IBookingFormContext>(BookingFormContext);

  const { room, price, discount, coupon } = state;

  const [isCouponPanelOpen, setCouponPanelStatus] = useState<boolean>(false);
  const couponRef = useRef(null);

  const couponHandle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCouponPanelStatus(!isCouponPanelOpen);
  };

  const removeCoupon = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'removeCoupon',
    });
  };
  return (
    <Fragment>
      <Grid container spacing={24} className={classes.gridInfo}>
        <Grid item xs={12}>
          <Paper className={classes.paperCustomOuter}>

            <Paper className={classes.paperCustom} square>
              <Grid container spacing={16}>
                {room ? (
                  <InfoHeader room={room} />
                ) : ''}
              </Grid>
              <Divider className={classes.dividerMargin} />
              {!!price ? (
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Grid container spacing={16}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>Ngày nhận phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          moment.unix(price!.checkin).format(DEFAULT_DATE_TIME_FORMAT)
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>Ngày trả phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          moment.unix(price!.checkout).format(DEFAULT_DATE_TIME_FORMAT)
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>Số khách</Grid>
                        <Grid container item xs={6} className={classes.fontLow}
                          justify='flex-end'>{price!.number_of_guests} người</Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.spaceTop} />
                    <Grid container spacing={16} className={classes.spaceTop}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>Giá</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                          {`${formatMoney(price!.price_original)}đ`}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>Phí dịch vụ</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                          {`${formatMoney(price!.additional_fee)}đ`}
                        </Grid>
                      </Grid>
                      {price!.price_discount > 0 ? (
                        <Grid container item xs={12}>
                          <Grid item xs={6} className={classes.fontLowTitle}>Giảm giá</Grid>
                          <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                            {`${formatMoney(price!.price_discount)}đ`}
                          </Grid>
                        </Grid>
                      ) : ''}
                      {!!coupon && discount != 0 ? (
                        <Grid container item xs={12}>
                          <Grid item xs={6} className={classes.fontLowTitle}>Mã giảm giá ({coupon})</Grid>
                          <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                            {`${formatMoney(discount)}đ`}
                          </Grid>
                        </Grid>
                      ) : (!!coupon ? <Grid container item xs={12}>
                        <Grid item xs={12} className={classes.fontLowTitle}>Mã giảm giá (<b>{coupon}</b>) không hợp lệ</Grid>

                      </Grid> : '')}
                    </Grid>
                    <Divider className={classes.spaceTop} />
                    <Grid container spacing={16} className={classes.spaceTop}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLowTitle}>
                          <Typography variant='h6'>Tổng cộng:</Typography>
                        </Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                          <Typography variant='h6'>{`${formatMoney(price!.total_fee - discount)}đ`}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : ''}
              <Divider className={classes.dividerMargin} />
              <Grid container spacing={16}>
                <Grid container item xs={12} alignContent='center' alignItems='center'>
                  <Grid container item xs={12} justify='flex-end'>
                    {price
                      ? (!state.coupon
                        ? <a href={'javascript:void'} onClick={couponHandle} ref={couponRef}>Bạn có mã giảm giá ?</a>
                        : <a href={'javascript:void'} onClick={removeCoupon}>Gỡ mã giảm giá</a>
                      )
                      : <SimpleLoader />
                    }
                    <Popper
                      open={isCouponPanelOpen}
                      anchorEl={couponRef.current}
                      placement='bottom-end'
                      transition>
                      {({ TransitionProps, placement }) => (
                        <ClickAwayListener onClickAway={() => setCouponPanelStatus(false)}>
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                          >
                            {price ? <CouponForm {...props} openHandle={setCouponPanelStatus} /> : ''}
                          </Grow>
                        </ClickAwayListener>
                      )}
                    </Popper>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {(room && room!.settings) ? ((room!.settings.no_booking_cancel == 1 || room!.settings.no_booking_cancel == 2) ?
              <Grid item xs={12}>
                <Grid container justify='flex-start'>
                  <Grid item>
                    {/* <InfoIcon style = {{color: '#ddd', fontSize: 20, marginTop: 15}}/>  */}
                    <Typography variant='subtitle2' style={{ padding: '10px' }}>
                      {`${room!.settings.booking_cancel_text}`}
                    </Typography>
                    <Typography variant='caption' style={{ padding: '0px 10px' }}>
                      {`Khi đặt chỗ của quý khách đã được xác nhận, Quý khách sẽ phải trả 50% số tiền đặt phòng ${formatMoney((price!.total_fee - discount) / 2)} nếu quý khách hủy đặt phòng trước ngày ${moment.unix(price!.checkin).subtract(room!.settings.days, 'day').locale('vi').format('HH:mm Do MMMM YYYY')}. Sau thời gian đó, toàn bộ số tiền đặt phòng sẽ không được hoàn lại nếu quý khách hủy hoặc vắng mặt`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              : '') :
              (<Grid item xs={12}>
                <Grid container justify='flex-start'>
                  {
                    (price && moment.unix(price!.checkin).subtract(room!.settings.days, 'day').diff(moment.now(), 'days') <= room!.settings.days) ?
                      (<Grid item>
                        <Typography variant='subtitle2' style={{ padding: '10px' }}>
                          {`${room!.settings.booking_cancel_text}`}
                        </Typography>
                        <Typography variant='caption' style={{ padding: '0px 10px' }}>
                          {`Khi đặt chỗ của quý khách đã được xác nhận, quý khách không thể hủy hoặc thay đổi đặt chỗ đó.Quý khách sẽ phải trả toàn bộ số tiền đặt phòng ${formatMoney(price!.total_fee - discount)} nếu quý khách vắng mặt.`}
                        </Typography>
                      </Grid>)
                      : ''
                  }
                </Grid>
              </Grid>)
            }

          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BookingInfoDetail);
