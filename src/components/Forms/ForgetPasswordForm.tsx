import createStyles from "@material-ui/core/styles/createStyles";
import React, {
  ComponentType,
  Fragment,
  useMemo,
  useState,
  FunctionComponent,
  useContext,
} from "react";
import { compose } from "recompose";
import { Formik, FormikActions } from "formik";
import * as Yup from "yup";
import { FormikProps } from "@/types/Interface/Formik";
import { Dispatch } from "redux";
import {
  AnimationAction,
  AnimationState
} from "@/store/reducers/Visual/global-animation";
import * as animation from "@/store/actions/animationTypes";
import { ReducersList } from "@/store/reducers";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {
  EmailInputAdornment,
} from "@/components/Forms/LoginForm";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import UserIcon from "@material-ui/icons/Person";
import { ForgetPasswordReq } from "@/types/Requests/Account/AccountRequests";
import { axios } from "@/utils/axiosInstance";
import {
  ErrorValidate,
  AxiosErrorCustom
} from "@/types/Requests/ResponseTemplate";
import { ForgetPasswordRes } from "@/types/Requests/Account/AccountResponses";
import { AxiosResponse } from "axios";
import Blue from "@material-ui/core/colors/blue";
import AlignS from "@/styles/Position/align.module.scss";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Green from "@material-ui/core/colors/green";
import { Modal, Divider, Theme } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";
import BG from "@/assets/loginform.jpeg";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

interface IProps {
  classes?: any;
}

interface ForgetPasswordLocalProps extends IProps {
  handleForgetPassword(status: boolean): void;
  handleLoginButton(status: boolean): void;
  animation: AnimationState;
}

interface FormikForgetPassword {
  email: string;

}

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ")
});

export const PhoneInputAdornment: FunctionComponent<{}> = props => {
  return (
    <InputAdornment position="end">
      <IconButton disabled>
        <PhoneIcon />
      </IconButton>
    </InputAdornment>
  );
};

export const UserInputAdornment: FunctionComponent<{}> = props => {
  return (
    <InputAdornment position="end">
      <IconButton disabled>
        <UserIcon />
      </IconButton>
    </InputAdornment>
  );
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: 16
    },
    spaceTop: {
      marginTop: 10
    },
    spinner: {
      width: "25px !important",
      height: "25px !important"
    },
    errorBag: {
      padding: 10,
      marginTop: 12,
      marginBottom: 12
    },
    color: {
      color: Blue[600],
      cursor: "pointer"
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    successSnack: {
      backgroundColor: Green[600]
    },
    modal: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20vh",
      width: "50%",
      overflow: "hidden",
      borderRadius: 16,
      "&:focus": {
        outline: "none"
      },
      [theme.breakpoints.only("xs")]: {
        width: "90%",
        marginTop: "10vh"
      },
      [theme.breakpoints.only("sm")]: {
        width: "80%",
        marginTop: "15vh"
      },
      [theme.breakpoints.only("md")]: {
        width: "70%",
        marginTop: "20vh"
      }
    },
    backgroundLogin: {
      backgroundImage: `url(${BG})`,
      width: "100%",
      height: "auto",
      minHeight: "100%",
      backgroundSize: "cover",
      position: "relative"
    },
    title: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "65%",
      textAlign: "center",
      color: "#fff"
    },
    description: {
      fontSize: '16px',
      fontWeight: 300
    },
    contentRight: {
      padding: 16
    }
  })
);

// @ts-ignore
const ForgetPasswordForm: ComponentType<IProps> = (props: ForgetPasswordLocalProps) => {
  const classes = useStyles(props);
  const {
    animation,
    handleForgetPassword,
    handleLoginButton
  } = props;


  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [message, setMessage] = useState<any>('');

  const { width } = useContext<IGlobalContext>(GlobalContext);

  const formikInit: FormikForgetPassword = useMemo(() => {
    return {
      email: "",
    };
  }, []);

  const handleModalClose = () => {
    handleForgetPassword(false);
  };


  return (
    <Fragment>
      <Modal
        open={animation.isForgetPasswordFormOpen}
        onClose={handleModalClose}
        disableAutoFocus
      >
        <Zoom in={animation.isForgetPasswordFormOpen}>
          <Paper className={classes.modal} elevation={10}>
            <Grid container>
              <Grid item xs={4} className={classes.backgroundLogin}>
                <Typography variant="h5" className={classes.title}>
                  Khôi phục lại mật khẩu
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.contentRight}>
                <Typography variant="h5" className={classes.description}>
                  Nhập địa chỉ email đã đăng ký của bạn để nhận hướng dẫn đặt lại mật khẩu
                </Typography>
                <Formik
                  initialValues={formikInit}
                  validationSchema={FormValidationSchema}
                  validateOnChange={false}
                  onSubmit={(
                    values: FormikForgetPassword,
                    action: FormikActions<FormikForgetPassword>
                  ) => {
                    const request: ForgetPasswordReq = {
                      email: values.email
                    };

                    axios
                      .post("forget-password", request)
                      .then((res: AxiosResponse<ForgetPasswordRes>) => {
                        const data = res.data.data.message;
                        setMessage(data);
                        setOpenSnack(true);

                        location.reload();

                        action.setSubmitting(false);
                      })
                      .catch((err: AxiosErrorCustom<ErrorValidate>) => {
                        const error = err.response!.data.data.error;

                        setMessage(error);

                        if (error)
                          action.setFieldError("email", error);
                        action.setSubmitting(false);
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
                    isSubmitting
                  }: FormikProps<FormikForgetPassword>) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        {/*<FormControl fullWidth className = {classes.spaceTop}*/}
                        {/*error = {!!(errors.name && touched.name)}>*/}
                        {/*<InputLabel htmlFor = 'name'>Tên</InputLabel>*/}
                        {/*<Input*/}
                        {/*id = 'name'*/}
                        {/*name = 'name'*/}
                        {/*value = {values.name}*/}
                        {/*onChange = {handleChange}*/}
                        {/*onBlur = {handleBlur}*/}
                        {/*endAdornment = {<UserInputAdornment />}*/}
                        {/*/>*/}
                        {/*<FormHelperText>{touched.name ? errors.name : ''}</FormHelperText>*/}
                        {/*</FormControl>*/}
                        {/*<FormControl fullWidth className = {classes.spaceTop}*/}
                        {/*error = {!!(errors.phone && touched.phone)}>*/}
                        {/*<InputLabel htmlFor = 'phone'>Số điện thoại</InputLabel>*/}
                        {/*<Input*/}
                        {/*id = 'phone'*/}
                        {/*name = 'phone'*/}
                        {/*value = {values.phone}*/}
                        {/*onChange = {handleChange}*/}
                        {/*onBlur = {handleBlur}*/}
                        {/*endAdornment = {<PhoneInputAdornment />}*/}
                        {/*/>*/}
                        {/*<FormHelperText>{touched.phone ? errors.phone : ''}</FormHelperText>*/}
                        {/*</FormControl>*/}
                        <FormControl
                          fullWidth
                          className={classes.spaceTop}
                          error={!!(errors.email && touched.email)}
                        >
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={<EmailInputAdornment />}
                          />
                          <FormHelperText>
                            {touched.email ? errors.email : ""}
                          </FormHelperText>
                        </FormControl>

                        <Button
                          className={classes.spaceTop}
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ color: "#fff" }}
                          disabled={isSubmitting}
                          fullWidth
                        >
                          {isSubmitting ? (
                            <CircularProgress className={classes.spinner} />
                          ) : (
                              "Gửi"
                            )}
                        </Button>
                      </form>
                    );
                  }}
                </Formik>
                {/*<h5 className = {borderC['text-line-center']}>đăng nhập với</h5>*/}
                <Divider style={{ margin: "16px 0" }} />
                <Typography className={AlignS.textCenter}>
                  <b
                    className={classes.color}
                    onClick={() => handleLoginButton(true)}
                  >
                    {" "}
                    Quay lại Đăng Nhập
                  </b>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={6000}
        ContentProps={{
          "aria-describedby": "message-register"
        }}
      >
        <SnackbarContent
          className={classes.successSnack}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon />
              &nbsp; {message}
            </span>
          }
        />
      </Snackbar>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnimationAction>) => {
  return {
    handleForgetPassword: (status: boolean) =>
      dispatch({
        type: animation.FORGET_PASSWORD_BUTTON_CLICK,
        status: status
      }),
    handleLoginButton: (status: boolean) =>
      dispatch({
        type: animation.LOGIN_BUTTON_CLICK,
        status: status
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(ForgetPasswordForm);
