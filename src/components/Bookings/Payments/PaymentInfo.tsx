import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext, useState } from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import { IPaymentContext, PaymentContext } from '@/store/context/Payment/PaymentContext';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import moment from 'moment';
import { formatMoney } from '@/utils/mixins';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import Blue from '@material-ui/core/colors/blue';
import InfoHeader from '@/components/Bookings/InfoHeader';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  root: {
    padding: '1rem',
  },
  spaceTop: {
    marginTop: 8,
  },
  fontLow: {
    fontSize: '0.9rem',
  },
  expandText: {
    color: Blue[500],
    float: 'right',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
})
);

// @ts-ignore
const PaymentInfo: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const { state } = useContext<IPaymentContext>(PaymentContext);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const xsMode = width === 'xs';
  const [infoStatus, setInfoStatus] = useState<boolean>(!xsMode);

  const { room, lists } = state;

  let checkInDate = lists ? moment(lists!.checkin) : moment();
  let checkOutDate = lists ? moment(lists!.checkout) : moment();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Grid container spacing={2}>
              {room ? (
                <Fragment>
                  <InfoHeader room={room} />
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Ngày nhận phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          checkInDate.format('Y/MM/DD')
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Ngày trả phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          checkOutDate.format('Y/MM/DD')
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Số khách</Grid>
                        <Grid container item xs={6} className={classes.fontLow}
                          justify='flex-end'>{lists!.number_of_guests} người</Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.spaceTop} />
                    <Grid container spacing={2} className={classes.spaceTop}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Giá</Grid>
                        <Grid container item xs={6} className={classes.fontLow}
                          justify='flex-end'>{`${formatMoney(lists!.price_original)}đ`}</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Phí dịch vụ</Grid>
                        <Grid container item xs={6} className={classes.fontLow}
                          justify='flex-end'>{`${formatMoney(lists!.additional_fee)}đ`}</Grid>
                      </Grid>
                      {lists!.coupon ? (
                        <Grid container item xs={12}>
                          <Grid item xs={6} className={classes.fontLow}>Mã khuyến mãi ({lists!.coupon})</Grid>
                          <Grid container item xs={6} className={classes.fontLow}
                            justify='flex-end'>{`${formatMoney(lists!.coupon_discount)}đ`}</Grid>
                        </Grid>
                      ) : ''}
                      {lists!.price_discount > 0 ? (
                        <Grid container item xs={12}>
                          <Grid item xs={6} className={classes.fontLow}>Giảm giá</Grid>
                          <Grid container item xs={6} className={classes.fontLow}
                            justify='flex-end'>{`${formatMoney(lists!.price_discount)}đ`}</Grid>
                        </Grid>
                      ) : ''}
                    </Grid>
                    <Divider className={classes.spaceTop} />
                    <Grid container spacing={2} className={classes.spaceTop}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>
                          <Typography variant='h6'>Tổng cộng:</Typography>
                        </Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>
                          <Typography variant='h6'>{`${formatMoney(lists!.total_fee)}đ`}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Fragment>
              ) : <SimpleLoader />}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} onClick={() => setInfoStatus(!infoStatus)}>
                <Typography variant='subtitle2'>
                  THÔNG TIN KHÁCH HÀNG
                  <span className={classes.expandText}>{infoStatus ? 'Thu gọn' : 'Xem thêm'}</span>
                </Typography>
                <Divider />
              </Grid>
              {room && lists ? (
                <Grid item container spacing={2}>
                  {infoStatus ? (
                    <Fragment>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Người đặt phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          lists!.name
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Số điện thoại</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          lists!.phone
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Email</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          lists!.email
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Người nhận phòng</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          lists!.name_received ? lists!.name_received : lists!.name
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={classes.fontLow}>Số điện thoại người nhận</Grid>
                        <Grid container item xs={6} className={classes.fontLow} justify='flex-end'>{
                          lists!.phone_received ? lists!.phone_received : lists!.phone
                        }</Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4} className={classes.fontLow}>Email</Grid>
                        <Grid container item xs={8} className={classes.fontLow} justify='flex-end'>{
                          lists!.email_received ? lists!.email_received : lists!.email
                        }</Grid>
                      </Grid>
                    </Fragment>
                  ) : ''}
                </Grid>
              ) : <SimpleLoader />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentInfo;
