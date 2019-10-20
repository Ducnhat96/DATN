import { ThemeCustom } from '@/components/Theme/Theme';
import { FormikProps } from '@/types/Interface/Formik';
import { BookingCreateReq } from '@/types/Requests/Booking/BookingRequests';
import * as act from '@/store/actions/actionTypes';
import { axios } from '@/utils/axiosInstance';
import { scrollDefault } from '@/utils/elementInteraction';
import {
  AVAILABLE,
  DEFAULT_DATE_TIME_FORMAT,
  INTERNET_BANKING,
  PENDING,
  WEBSITE_SRC,
  ONLINE,
} from '@/utils/store/global';
import { withStyles, createStyles, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Gray from '@material-ui/core/colors/grey';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classNames from 'classnames';
import { withFormik, FormikBag } from 'formik';
import moment from 'moment';
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  ComponentType,
  useContext,
} from 'react';
import Loadable from 'react-loadable';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { StringSchema } from 'yup';
import {
  BookingFormState,
} from '@/store/context/Booking/BookingFormContext';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { withRouter, RouteComponentProps } from 'react-router';
import Orange from '@material-ui/core/colors/orange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircle from '@material-ui/icons/CheckCircleOutline';
import Whatshot from '@material-ui/icons/Whatshot';
import 'moment/locale/vi';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { TransitionCustom } from '@/views/Rooms/BottomNav';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import CheckSuccess from '@/components/Loading/CheckSuccess';
import { SearchFilterAction } from '@/store/reducers/searchFilter';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReducersType, ReducersList } from '@/store/reducers';
import { BookingAction, BookingState } from '@/store/reducers/booking';

interface IFormikValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: number;
  guestName: string;
  isSomeOneElse: boolean;
  additionalNote: string;
  additionalServices: Array<number>;
  isWork: boolean
}

interface IProps {
  classes?: any;
  state: BookingFormState;
  statusBooking: BookingState;
}

interface DispatchLocal {
  handleDialog(status: boolean): any
}

interface ILocalProps extends IProps, FormikProps<IFormikValues>, DispatchLocal, RouteComponentProps {
}

const FormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Vui lòng điền tên')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(50, 'Tối đa 50 ký tự'),
  lastName: Yup.string()
    .required('Vui lòng điền họ')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(50, 'Tối đa 50 ký tự'),
  email: Yup.string()
    .required('Vui lòng điền địa chỉ email')
    .email('Email không hợp lệ'),
  phone: Yup.string()
    .required('Vui lòng điền số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 11 số')
    .max(11, 'Số điện thoại phải từ 10 đến 11 số')
    .test('checkNaN', 'Không được nhập chữ và các kí hiệu đặc biệt', value => !isNaN(value))
  ,
  country: Yup.number()
    .required('Vui lòng chọn thành phố')
    .min(1, 'Vui lòng chọn thành phố'),
  isSomeOneElse: Yup.boolean(),
  guestName: Yup.string().when('isSomeOneElse', (status: boolean, schema: StringSchema) => {
    return status
      ? schema.required('Vui lòng điền tên')
        .min(2, 'Phải có ít nhất 2 ký tự')
        .max(50, 'Tối đa 50 ký tự')
      : schema;
  }),
});

const styles: any = (theme: ThemeCustom) => createStyles({
  paperCustom: {
    padding: 25,
    boxShadow: 'none !important',
  },
  paperCustomOuter: {
    padding: 15,
    marginBottom: '1rem',
    background: '#f2fbf7',
    boxShadow: 'none !important',
  },
  paperCustomSetting: {
    padding: 0,
    marginBottom: '1rem',
    background: '#f2fbf7',
    boxShadow: 'none !important',
  },
  paperCustomHot: {
    padding: 0,
    marginBottom: '1rem',
    background: '#fff9f4',
    boxShadow: 'none !important',
  },
  grayPaper: {
    backgroundColor: Gray[100],
  },
  margin24: {
    marginTop: 24,
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonBookingInfo: {
    color: '#FFFFFF',
    '&:hover': {
      background: Orange[700],
    },
  },
  root: {
    padding: 0,
  },
  dialogTitle: {
    textAlign: 'right',
    padding: 0,
  },
  dialogContent: {
    padding: '0 16px 16px ',
  },
});

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});


// @ts-ignore
const BookingForm: ComponentType<IProps> = (props: ILocalProps) => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValidating,
    setValues,
    state,
  } = props;

  const { room, price, profile, success } = state;
  const [isRequest, toggleRequest] = useState<boolean>(false);
  const guestNameRef = useRef<any>(null);
  const { width, history } = useContext<IGlobalContext>(GlobalContext);

  useEffect(() => {
    if (values.isSomeOneElse) {
      scrollDefault('guest-name');
      guestNameRef.current.focus();
    }

  }, [values.isSomeOneElse]);

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      errors.firstName ? scrollDefault('firstName') : (
        errors.lastName ? scrollDefault('lastName') : (
          errors.email ? scrollDefault('email-lists') : (
            errors.phone ? scrollDefault('phone-number') : (
              errors.country ? scrollDefault('country') : (
                errors.guestName && scrollDefault('guest-name')
              )
            )
          )
        )
      );
    }
  }, [isSubmitting && isValidating]);

  const setAdditionalServices = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let value: number = parseInt(e.target.value);
    let status: boolean = e.target.checked;
    let services: number[] = values.additionalServices;

    // If checkbox ticked then pushed a value to services
    if (status) {
      services.push(value);
    }

    // Filter the services list
    let filtered: number[] = services.filter((val) => {
      return (value !== val && status);
    });

    setValues({
      ...values,
      additionalServices: filtered,
    });
  };

  return (
    <Fragment>
      {(room && room!.settings !== null) ? (room!.settings.no_booking_cancel == 0 ?
        (<Paper square className={classes.paperCustomSetting}>
          <List className={classes.root}>
            {
              (moment.unix(price!.checkin).subtract(room!.settings.days, 'day').diff(moment.now(), 'days') > room!.settings.days) ?
                (<ListItem>
                  <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
                  <ListItemText
                    primary={
                      <Typography variant='h6'
                        style={{ color: '#00C855' }}>{room!.settings.booking_cancel_text}</Typography>
                    }
                    secondary={
                      <Typography variant='body1'
                        style={{ color: '#999' }}>{`${room!.settings.booking_cancel_text} trước ${moment.unix(price!.checkin).subtract(room!.settings.days, 'day').locale('vi').format('HH:mm Do MMMM YYYY')}`}</Typography>
                    } />
                </ListItem>)
                : (<ListItem>
                  <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
                  <ListItemText
                    primary={
                      <Typography variant='h6' style={{ color: '#00C855' }}>Chỉ mất 2 phút để đặt phòng</Typography>
                    }
                  />
                </ListItem>)
            }
          </List>
        </Paper>) : (
          <Paper square className={classes.paperCustomSetting}>
            <List className={classes.root}>
              <ListItem>
                <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
                <ListItemText
                  primary={
                    <Typography variant='h6' style={{ color: '#00C855' }}>Chỉ mất 2 phút để đặt phòng</Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>)) : ''}

      {(room && room!.hot == 1) ?
        (<Paper square className={classes.paperCustomHot}>
          <List className={classes.root}>
            <ListItem>
              <Whatshot style={{ fontSize: '36px', color: Orange[600] }} />

              <ListItemText
                primary={
                  <Typography variant='h6' style={{ color: Orange[600] }}>{room!.hot_txt} Hãy hoàn thành đặt chỗ
                                                                                            sớm</Typography>
                } />
            </ListItem>
          </List>
        </Paper>) : ''}

      <Paper square className={classes.paperCustomOuter}>
        <Paper square className={classes.paperCustom}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Thông tin đặt phòng
                </Typography>
                <Typography variant='body2' style={{ color: '#b9b8b8' }}>
                  Tên của khách phải khớp với tên ghi trên giấy tờ tuỳ thân dùng để nhận phòng.
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl error={!!(touched!.firstName && errors.firstName)} fullWidth>
                  <TextField variant='outlined'
                    id='firstName'
                    name='firstName'
                    label='Tên'
                    placeholder='Ví dụ: Văn A'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <FormHelperText>{touched.firstName ? errors.firstName : ''}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl error={!!(touched!.lastName && errors.lastName)} fullWidth>
                  <TextField variant='outlined'
                    id='lastName'
                    name='lastName'
                    label='Họ'
                    placeholder='Ví dụ: Nguyễn'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <FormHelperText>{touched.lastName ? errors.lastName : ''}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={!!(errors.email && touched.email)} fullWidth>
                  <TextField variant='outlined'
                    id='email-booking'
                    name='email'
                    label='Email'
                    placeholder='Chúng tôi sẽ gửi thư xác nhận yêu cầu đặt phòng qua địa chỉ email này.'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormHelperText>{touched.email ? errors.email : ''}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl error={!!(errors.phone && touched!.phone)} fullWidth>
                  <TextField variant='outlined'
                    id='phone-number'
                    name='phone'
                    label='Số điện thoại'
                    placeholder='Ví dụ: 09xxxxxxxx'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <FormHelperText>{touched.phone ? errors.phone : ''}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='on-work'
                        name='isWork'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.isWork}
                        value='1'
                        color='primary'
                      />
                    }
                    label='Tôi đi công tác' />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='booking-for-someone'
                        name='isSomeOneElse'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.isSomeOneElse}
                        value='1'
                        color='primary'
                      />
                    }
                    label='Tôi đặt phòng cho người khác' />
                </FormControl>
              </Grid>
              {/*Booking for another one section*/}
              <Grid item xs={12}>
                <Collapse in={values.isSomeOneElse}>
                  <Paper className={
                    classNames(classes.paperCustom, classes.grayPaper)
                  }
                    elevation={0} square>
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <Typography variant='h6'>
                          Thông tin người nhận
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl error={!!(errors.guestName && touched.guestName)} fullWidth>
                          <TextField variant='outlined'
                            id='guest-name'
                            name='guestName'
                            inputRef={guestNameRef}
                            onChange={handleChange}
                            label='Họ và tên'
                            placeholder='Ví dụ: Nguyễn Văn A'
                            onBlur={handleBlur}
                            value={values.guestName}
                          />
                          <FormHelperText>{touched.guestName ? errors.guestName : ''}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Collapse>
              </Grid>

              <Grid item xs={12}>
                <Button name='addition-services' color='primary' style={{ paddingLeft: 0 }}
                  onClick={() => toggleRequest(!isRequest)}>
                  {isRequest ? <RemoveIcon /> : <AddIcon />}
                  Yêu cầu đặc biệt
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={isRequest}>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField variant='outlined'
                          id='additional-note'
                          name='additionalNote'
                          multiline
                          rows={5}
                          label='Yêu cầu khác'
                          placeholder='Ví dụ: Tôi có thể tới sớm hơn được không?'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.additionalNote}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Button variant='contained'
                      name='confirm-information'
                      size='large'
                      color='primary'
                      disabled={!room || isSubmitting}
                      type='submit'
                      className={classes.buttonBookingInfo}
                    // onClick = {() => ConfirmBooking(true)}
                    >
                      {(room && !isSubmitting) ? 'Xác nhận thông tin' : <SimpleLoading />}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Typography variant='subtitle2' style={{ color: '#b3b3b3' }}>
                      Bạn vẫn chưa phải thanh toán ở bước này
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Grid item xs={12}>
          <Grid container justify='flex-start'>
            <Grid item>
              <Typography variant='body2' style={{ padding: '15px' }}>
                Khi gửi yêu cầu đặt chỗ này, quý khách xác nhận rằng quý khách đã đọc và đồng ý với các
                <Link to='/terms-and-conditions'> Điều khoản và điều kiện </Link>
                và Chính sách quyền riêng tư của Westay.vn.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Fragment>
          {room ? (
            <Dialog
              TransitionComponent={TransitionCustom}
              keepMounted
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
              scroll='body'
              fullScreen={width === 'xs'}
              maxWidth='sm'
              open={props.statusBooking.stateOfBooking}
            // onClose = {() => props.handleDialog(false)}
            >
              <DialogContent classes={{ root: classes.dialogContent }}>
                <div style={{ textAlign: 'center' }}>
                  <CheckSuccess width={250} height={250}
                    message={room!.instant_book === 0 ?
                      'Đơn đặt phòng của bạn đã được gửi đến chủ nhà để chờ xác nhận.Nếu phòng còn trống, chúng tôi sẽ gửi thông tin thanh toán tới email của bạn' :
                      'Xin chờ trong giây lát, chúng tôi sẽ chuyển hướng đến trang thanh toán'}
                  />
                  {room!.instant_book === 0 ? (
                    <Button variant='contained'
                      name='confirm_information'
                      color='primary'
                      disabled={!room || isSubmitting}
                      type='submit'
                      className={classes.buttonBookingInfo}
                      onClick={() => history.push(`/`)}
                    >
                      {(room && !isSubmitting) ? 'Xác nhận' : <SimpleLoading />}
                    </Button>
                  ) : ''}
                </div>
              </DialogContent>
            </Dialog>
          ) : ''}
        </Fragment>
      </Paper>
    </Fragment>
  );
};

const FormMilk = withFormik({

  mapPropsToValues: (props): IFormikValues => {
    const { profile } = props.state;
    let fullName = profile ? profile.name : '';
    let fName = fullName.split(' ').slice(1).join(' ');
    let lName = fullName.split(' ').slice(0, 1).join(' ');

    return {
      firstName: fName,
      lastName: lName,
      email: profile ? profile.email : '',
      phone: profile ? profile.phone : '',
      country: 1,
      guestName: '',
      isSomeOneElse: false,
      additionalNote: '',
      additionalServices: [],
      isWork: false,
    };
  },

  enableReinitialize: true,

  handleSubmit: (values: IFormikValues, bags: FormikBag<ILocalProps, IFormikValues>) => {
    const { state, history } = bags.props;

    const { room, price, success } = state;

    const data: BookingCreateReq = {
      name: `${values.lastName} ${values.firstName}`,
      email: values.email,
      name_received: values.guestName,
      room_id: price!.room_id,
      coupon: state.coupon,
      checkin: moment.unix(price!.checkin).format(DEFAULT_DATE_TIME_FORMAT),
      checkout: moment.unix(price!.checkout).format(DEFAULT_DATE_TIME_FORMAT),
      booking_type: price!.booking_type,
      phone: values.phone.replace(/\s/g, ''),
      number_of_guests: price!.number_of_guests,
      note: values.additionalNote,
      payment_method: INTERNET_BANKING,
      payment_status: PENDING,
      source: WEBSITE_SRC,
      status: AVAILABLE,
      type: ONLINE,
      booking_purpose: values.isWork ? 1 : 0,
    };

    axios.post('bookings', data).then((res: AxiosRes<BookingIndexRes>) => {
      const data = res.data.data;
      let url = `/payment/invoice/${data.uuid}`;

      if (room!.instant_book === 0) {
        bags.props.handleDialog(true);
      } else {
        bags.props.handleDialog(true);
        history.push(url);
      }
      bags.setSubmitting(false);
    }).catch(e => {
      history.push(`/room/${data.room_id}`);
      // alert('catch');
      bags.setSubmitting(false);
    });
  },

  validationSchema: () => FormValidationSchema,
  validateOnChange: false,
});

const mapStateToProps = (state: ReducersList) => {
  return {
    statusBooking: state.booking,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<BookingAction>) => {
  return {
    handleDialog: (status: boolean) =>
      dispatch({
        type: act.STATUS_OF_BOOKING,
        statusBooking: status,
      }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  FormMilk,
  withStyles(styles),
)(BookingForm);
