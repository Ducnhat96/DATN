import React, { ComponentType, Dispatch, Fragment, SetStateAction, useContext } from 'react';
import { compose } from 'recompose';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Location from '@material-ui/icons/LocationOnOutlined';
import StarRatings from 'react-star-ratings';
import { ThemeCustom } from '@/components/Theme/Theme';
import { formatMoney } from "@/utils/mixins";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import { TransitionCustom } from "@/views/Rooms/BottomNav";
import moment from 'moment';
import Hidden from "@material-ui/core/Hidden";


const styles: any = (theme: ThemeCustom) => createStyles({
  txtAddress: {
    color: '#008489',
    fontSize: 14,
  },
  iconLocation: {
    verticalAlign: 'bottom',
    fontSize: 20,
  },
  spanViews: {
    fontSize: 10,
    color: 'grey',
    paddingLeft: 5,
  },
  dialogTitle: {
    textAlign: 'right',
    padding: 0,
  },
  dialogContent: {
    padding: '0 16px 16px ',
  },
  titleMargin: {
    marginBottom: 16,
  },
  titleDetails: {
    textTransform: 'uppercase',
    borderBottom: '3px solid #F3A537',
    padding: '5px 0px',
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 10,
  },
  imageRoom: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
  },
  btStatus: {
    margin: '8px 8px 8px 0',
  },
  contentDetails: {
    fontWeight: 500,
    fontSize: 15,
  },
  rowMargin: {
    marginBottom: 4,
  },
});

interface IDialogBookingDetails {
  classes?: any;
  stateOpen: number;
  setStateOpen: Dispatch<SetStateAction<number>>;
  dataBooking: any;
}


const DialogBookingDetails: ComponentType<IDialogBookingDetails> = (props: IDialogBookingDetails) => {
  const { classes } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const handleClick = (id: number) => {
    props.setStateOpen(id);
  };

  const room = props.dataBooking.room.data;
  return (
    <Fragment>
      <Dialog
        key={props.dataBooking.id}
        TransitionComponent={TransitionCustom}
        keepMounted
        scroll='body'
        fullScreen={width === 'xs' || width === 'sm'}
        maxWidth='md'
        open={props.stateOpen === props.dataBooking.id}
        onClose={() => handleClick(0)}
      >
        <DialogTitle classes={{ root: classes.dialogTitle }}>
          <IconButton aria-label='Close' onClick={() => handleClick(0)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <Grid container spacing={16} direction='row'>
            <Grid item xs={12}>
              <Typography className={classes.titleMargin}>
                <span className={classes.titleDetails}>Thông tin Phòng</span>
              </Typography>
              <Grid container spacing={16}>
                <Grid item xs={12} sm={5} md={4} lg={4}>
                  <img alt='image room' src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${room.media.data[0].image}`}
                    className={classes.imageRoom} />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={6} container direction='column' justify='space-between'
                  alignItems='flex-start'>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography variant='h6'>{room.details.data[0].name}</Typography>
                    </Grid>
                    <Grid item className={classes.rowMargin}>
                      <StarRatings
                        rating={room!.avg_rating}//index rating
                        starDimension='20px'
                        starSpacing='1px'
                        starRatedColor='#FFC412'
                      />
                      <span className={classes.spanViews}>{room!.total_review} views</span>
                    </Grid>
                    <Grid item className={classes.rowMargin}>
                      <span className={classes.txtAddress}>
                        <Location className={classes.iconLocation} />
                        {room.details.data[0].address}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container direction='row'>
                    <Grid item className={classes.rowMargin}>
                      {props.dataBooking.status_txt === '' ? '' : (
                        <Button variant='outlined' size='small'
                          className={classes.btStatus}>{props.dataBooking.status_txt}</Button>
                      )}
                      {props.dataBooking.coupon_txt === '' ? '' : (
                        <Button variant='outlined' size='small'
                          className={classes.btStatus}>{props.dataBooking.coupon_txt}</Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.titleMargin}>
                <span className={classes.titleDetails}>Thông tin khách hàng</span>
              </Typography>
              <Grid container>
                <Grid item xs={12} sm>
                  <Typography className={classes.rowMargin}>
                    <span className={classes.contentDetails}>Khách đặt: </span><span>{props.dataBooking.name}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>SĐT khách đặt: </span><span>{props.dataBooking.phone}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Email khách đặt: </span><span>{props.dataBooking.email}</span>
                  </Typography>
                  <Hidden smUp>
                    <Divider />
                  </Hidden>
                </Grid>
                <Grid item xs={12} sm>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Khách nhận: </span><span>{props.dataBooking.name_received}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>SĐT Khách nhận: </span><span>{props.dataBooking.phone_received}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Email khách nhận: </span><span>{props.dataBooking.email_received}</span>
                  </Typography>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography className={classes.rowMargin}>
                    <span className={classes.contentDetails}>Ghi chú: </span><span>{props.dataBooking.note}</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.titleMargin}>
                <span className={classes.titleDetails}>Thông tin thanh toán</span>
              </Typography>
              <Grid container>
                <Grid item xs={12} sm>
                  <Typography className={classes.rowMargin}>
                    <span className={classes.contentDetails}>Ngày nhận phòng: </span>
                    <span>{moment(props.dataBooking.checkin).format('DD-MM-YYYY, HH:mm A')}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span className={classes.contentDetails}>Ngày trả phòng: </span>
                    <span>{moment(props.dataBooking.checkout).format('DD-MM-YYYY, HH:mm A')}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Phương thức thanh toán: </span><span>{props.dataBooking.payment_method_txt}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Trạng thái thanh toán: </span><span>{props.dataBooking.payment_status_txt}</span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Số khách : </span><span>{props.dataBooking.number_of_guests}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Giá gốc: </span><span>{formatMoney(props.dataBooking.price_original)} </span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Tiền dịch vụ: </span><span>{formatMoney(props.dataBooking.service_fee)} </span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Giá giảm : </span><span>{formatMoney(props.dataBooking.price_discount)} </span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Phụ phí : </span><span>{formatMoney(props.dataBooking.additional_fee)} </span>
                  </Typography>
                  <Typography className={classes.rowMargin}>
                    <span
                      className={classes.contentDetails}>Mã giảm giá : </span>
                    <span>{formatMoney(props.dataBooking.coupon_discount)} </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.rowMargin}>
                    <span className={classes.contentDetails}>Trạng thái đơn đặt phòng : </span>
                    <span style={{ fontWeight: 700 }}>{props.dataBooking.total_txt}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider className={classes.rowMargin} />
                  <Typography variant='h5' align='right'>
                    Tổng tiền: {formatMoney(props.dataBooking.total_fee)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default compose<IDialogBookingDetails, any>(
  withStyles(styles)
)(DialogBookingDetails);
