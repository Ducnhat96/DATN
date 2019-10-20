import { IProps as BookingInfoProps } from '@/components/Bookings/BookingInfoDetail';
import { FormikProps } from '@/types/Interface/Formik';
import { OK } from '@/types/Requests/Code';
import { CouponDiscountCalculateReq } from '@/types/Requests/Coupons/CouponRequests';
import { CouponDiscountCalculateRes } from '@/types/Requests/Coupons/CouponResponses';
import { AxiosValidateError, AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import OutlineInput from '@material-ui/core/OutlinedInput/OutlinedInput';
import Paper from '@material-ui/core/Paper/Paper';
import { AxiosError } from 'axios';
import { Formik, FormikActions } from 'formik';
import moment from 'moment';
import React, { ComponentType, useContext } from 'react';
import Loadable from 'react-loadable';
import * as Yup from 'yup';
import { IBookingFormContext, BookingFormContext } from '@/store/context/Booking/BookingFormContext';
import Orange from '@material-ui/core/colors/orange';

interface IProps extends BookingInfoProps {
  openHandle(status: false): void;
}

interface IFormikValues {
  coupon: string;
}

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});

const FormValidationSchema = Yup.object().shape({
  coupon: Yup.string()
    .required('Vui lòng nhập mã giảm giá'),
});

const formikInit: IFormikValues = {
  coupon: '',
};

const BookingCouponForm: ComponentType<IProps> = props => {
  const {
    classes,
  } = props;

  const { state, dispatch } = useContext<IBookingFormContext>(BookingFormContext);

  const { room, price } = state;

  return (
    <Formik
      initialValues={formikInit}
      validationSchema={() => FormValidationSchema}
      validateOnChange={false}
      onSubmit={(values: IFormikValues, actions: FormikActions<IFormikValues>) => {
        const data: CouponDiscountCalculateReq = {
          coupon: values.coupon,
          price_original: price!.price_original,
          room_id: room!.id,
          checkin: moment.unix(price!.checkin).format(DEFAULT_DATE_TIME_FORMAT),
          checkout: moment.unix(price!.checkout).format(DEFAULT_DATE_TIME_FORMAT),
          booking_type: price!.booking_type,
          merchant_id: room!.merchant_id,
          room_type: room!.rent_type,
          number_of_guest: price!.number_of_guests,
          city_id: room!.city_id,
          district_id: room!.district_id,
          day: moment().format('Y-M-D'),
        };

        axios.post('coupons/calculate-discount', data)
          .then((res: AxiosRes<CouponDiscountCalculateRes>) => {
            const body = res.data.data;
            const code = body.code;
            if (code === OK) {
              props.openHandle(false);
              dispatch({
                type: 'setCoupon',
                coupon: values.coupon,
                discount: body.price_discount,
              });
            } else {
              actions.setFieldError('coupon', body.message);
            }
            actions.setSubmitting(false);
          })
          .catch((e: AxiosError) => {
            const response: AxiosValidateError<CouponDiscountCalculateReq> = e.response!;

            const errors = response.data.data.errors;
            const error = response.data.data.error;

            if (errors && errors.coupon) {
              actions.setFieldError('coupon', errors.coupon[0]);
            } else if (error) {
              actions.setFieldError('coupon', error);
            }
            actions.setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }: FormikProps<IFormikValues>) => {
        return (
          <form onSubmit={handleSubmit}>
            <Paper className={classes.paperCustom} square elevation={1}>
              <Grid container spacing={8}>
                <Grid item xs={7}>
                  <FormControl variant='outlined' error={!!(errors.coupon && touched.coupon)} fullWidth>
                    <InputLabel
                      htmlFor='coupon'
                    >Mã giảm giá</InputLabel>
                    <OutlineInput id='coupon'
                      name='coupon'
                      value={values.coupon.toUpperCase()}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelWidth={100}
                    />
                    {(touched.coupon && errors.coupon) ? <FormHelperText>{errors.coupon}</FormHelperText> : ''}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    name='apply-coupon'
                    type='submit'
                    color='primary'
                    disabled={isSubmitting}
                    size='large'
                    style={{
                      height: '100%',
                      width: '100%',
                      color: '#FFFFFF',
                      '&:hover': {
                        background: Orange[700]
                      }
                    }}
                    variant='contained'
                  >{isSubmitting ? <SimpleLoading /> : 'Sử dụng'}</Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
};

export default BookingCouponForm;
