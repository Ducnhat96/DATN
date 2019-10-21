import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useMemo,
  useState,
  FunctionComponent,
  useContext
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
import borderC from "@/styles/Styling/border.module.scss";
import {
  EmailInputAdornment,
  PasswordInputAdornment
} from "@/components/Forms/LoginForm";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { TransitionZoom } from "@/views/Rooms/BottomNav";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import UserIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { RegisterReq } from "@/types/Requests/Account/AccountRequests";
import { axios } from "@/utils/axiosInstance";
import {
  ErrorValidate,
  AxiosErrorCustom
} from "@/types/Requests/ResponseTemplate";
import { LoginRes } from "@/types/Requests/Account/AccountResponses";
import { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import Blue from "@material-ui/core/colors/blue";
import AlignS from "@/styles/Position/align.module.scss";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Green from "@material-ui/core/colors/green";
import { Link } from "react-router-dom";
import { Modal, Divider } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";
import BG from "@/assets/loginform.jpeg";
import Grid from "@material-ui/core/Grid";

interface IProps {
  classes?: any;
}

interface RegisterLocalProps extends IProps {
  handleSignUpAnimation(status: boolean): void;
  handleLoginButton(status: boolean): void;
  animation: AnimationState;
}

interface FormikRegisterValues {
  name: string;
  phone: string;
  birthday: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agreeTerms: boolean;
}

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(30, "Mật khẩu không được quá 30 ký tự"),
  passwordConfirm: Yup.string()
    .required("Vui lòng xác nhận lại mật khẩu")
    .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp"),
  agreeTerms: Yup.boolean().test(
    "term-agree",
    "Vui lòng xác nhận điều khoản",
    value => value === true
  )
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

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    paper: {
      width: theme!.spacing!.unit! * 50,
      backgroundColor: theme!.palette!.background!.paper,
      boxShadow: theme!.shadows![5],
      padding: theme!.spacing!.unit! * 2
    },
    spaceTop: {
      marginTop: 10
    },
    colorBtn: {
      marginTop: 10,
      backgroundColor: "#248489",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#248489",
        color: "#ffffff",
      },
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
      [theme!.breakpoints!.only!("xs")]: {
        width: "90%",
        marginTop: "10vh"
      },
      [theme!.breakpoints!.only!("sm")]: {
        width: "80%",
        marginTop: "15vh"
      },
      [theme!.breakpoints!.only!("md")]: {
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
    contentRight: {
      padding: 16
    }
  });

// @ts-ignore
const RegisterForm: ComponentType<IProps> = (props: RegisterLocalProps) => {
  const {
    classes,
    animation,
    handleSignUpAnimation,
    handleLoginButton
  } = props;

  const [showPassWord, setShowPassWord] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);

  const { width } = useContext<IGlobalContext>(GlobalContext);

  const formikInit: FormikRegisterValues = useMemo(() => {
    return {
      name: "",
      phone: "",
      birthday: "",
      email: "",
      password: "",
      passwordConfirm: "",
      agreeTerms: false
    };
  }, []);

  const handleModalClose = () => {
    handleSignUpAnimation(false);
  };

  return (
    <Fragment>
      <Modal
        open={animation.isSignUpFormOpen}
        onClose={handleModalClose}
        disableAutoFocus
      >
        <Zoom in={animation.isSignUpFormOpen}>
          <Paper className={classes.modal} elevation={10}>
            <Grid container>
              <Grid item xs={4} className={classes.backgroundLogin}>
                <Typography variant="h5" className={classes.title}>
                  Đăng ký tài khoản
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.contentRight}>
                <Formik
                  initialValues={formikInit}
                  validationSchema={FormValidationSchema}
                  validateOnChange={false}
                  onSubmit={(
                    values: FormikRegisterValues,
                    action: FormikActions<FormikRegisterValues>
                  ) => {
                    const request: RegisterReq = {
                      email: values.email,
                      name: values.name,
                      phone: values.phone,
                      password: values.password,
                      password_confirmation: values.passwordConfirm,
                      type: 0
                    };

                    axios
                      .post("register", request)
                      .then((res: AxiosResponse<LoginRes>) => {
                        const data = res.data;
                        const cookies = new Cookies();

                        setOpenSnack(true);
                        cookies.set("_token", data.access_token, {
                          path: "/",
                          maxAge: data.expires_in
                        });
                        location.reload();

                        action.setSubmitting(false);
                      })
                      .catch((err: AxiosErrorCustom<ErrorValidate>) => {
                        const errors = err.response!.data.data.errors;

                        if (errors.email)
                          action.setFieldError("email", errors.email[0]);
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
                  }: FormikProps<FormikRegisterValues>) => {
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
                        <FormControl
                          fullWidth
                          className={classes.spaceTop}
                          error={!!(errors.password && touched.password)}
                        >
                          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                          <Input
                            type={showPassWord ? "text" : "password"}
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                              <PasswordInputAdornment
                                isShown={showPassWord}
                                handle={setShowPassWord}
                              />
                            }
                          />
                          <FormHelperText>
                            {touched.password ? errors.password : ""}
                          </FormHelperText>
                        </FormControl>
                        <FormControl
                          fullWidth
                          className={classes.spaceTop}
                          error={
                            !!(
                              errors.passwordConfirm && touched.passwordConfirm
                            )
                          }
                        >
                          <InputLabel htmlFor="passwordConfirm">
                            Xác nhận mật khẩu
                          </InputLabel>
                          <Input
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            value={values.passwordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormHelperText>
                            {touched.passwordConfirm
                              ? errors.passwordConfirm
                              : ""}
                          </FormHelperText>
                        </FormControl>
                        <FormControl
                          className={classes.spaceTop}
                          error={!!(errors.agreeTerms && touched.agreeTerms)}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                id="agree-term"
                                name="agreeTerms"
                                color="primary"
                                checked={values.agreeTerms}
                                onChange={handleChange}
                              />
                            }
                            label={
                              <div>
                                <span>Tôi đồng ý với &nbsp;</span>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#1e88e5"
                                  }}
                                  to="/"
                                >
                                  điều khoản sử dụng
                                </Link>
                                <span>&nbsp; của chúng tôi</span>
                              </div>
                            }
                          />
                          <FormHelperText>
                            {touched.agreeTerms ? errors.agreeTerms : ""}
                          </FormHelperText>
                        </FormControl>
                        <Button
                          className={classes.colorBtn}
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                          fullWidth
                        >
                          {isSubmitting ? (
                            <CircularProgress className={classes.spinner} />
                          ) : (
                            "Đăng ký"
                          )}
                        </Button>
                      </form>
                    );
                  }}
                </Formik>
                {/*<h5 className = {borderC['text-line-center']}>đăng nhập với</h5>*/}
                <Divider style={{ margin: "16px 0" }} />
                <Typography className={AlignS.textCenter}>
                  Đã có tài khoản?
                  <b
                    className={classes.color}
                    onClick={() => handleLoginButton(true)}
                  >
                    {" "}
                    Đăng nhập
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
              &nbsp; Đăng ký thành công
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
    handleSignUpAnimation: (status: boolean) =>
      dispatch({
        type: animation.SIGN_UP_BUTTON_CLICK,
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
  withStyles(styles)
)(RegisterForm);
