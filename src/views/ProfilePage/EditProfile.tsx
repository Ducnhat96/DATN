import VN_vi from "@/assets/vietnam84.png";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/LockOutlined";
import React, {
  ComponentType,
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";
import { compose } from "recompose";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { ThemeCustom } from "@/components/Theme/Theme";
import {
  ProfileContext,
  IProfileContext
} from "@/store/context/Profile/ProfileContext";
import { Formik, FormikActions } from "formik";
import { FormikProps } from "@/types/Interface/Formik";
import * as Yup from "yup";
import moment from "moment";
import { ProfileInfoReq } from "@/types/Requests/Profile/ProfileReq";
import { axios } from "@/utils/axiosInstance";
import GridContainer from "@/layouts/Grid/Container";
import {
  Snackbar,
  SnackbarContent,
  Grow,
  Divider,
  OutlinedInput,
  Theme
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PhotoCamera from "@material-ui/icons/PhotoCameraOutlined";
import BG from "@/assets/avatar_demo.jpg";
import verifiedMail from "@/assets/verified.png";
import iconEdit from "@/assets/pencil-edit-button.svg";
import Autosuggest from "react-autosuggest";
import { deburr } from "lodash";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
// import CitiesMenu from "./CitiesMenu";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxEditProfile: {
      position: "relative",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: 50
      }
    },
    formControl: {
      minWidth: 120,

      textAlign: "center"
    },
    editRequired: {
      margin: "0 auto"
    },
    rowInputs: {
      margin: "5px 0 5px",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    title: {
      display: "flex",
      justifyContent: "flex-end"
    },
    typoTitle: {
      paddingTop: 10,
      textTransform: "inherit",
      fontSize: 16,
      paddingRight: 5,
      color: "#484848",
      [theme.breakpoints.down("xs")]: {
        fontSize: 14
      }
    },
    typoTitleOptional: {
      paddingTop: 20
    },
    typoBigTitle: {
      padding: "12px 0",
      color: "#484848",
      [theme.breakpoints.down("sm")]: {
        padding: 2
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 20
      }
    },
    rowButton: {
      padding: "40px 0",
      textAlign: "right"
    },
    avatarNational: {
      width: 20,
      height: 20,
      verticalAlign: "sub"
    },
    lightTooltip: {
      background: theme.palette.common.white,
      color: theme.palette.text!.primary,
      boxShadow: theme.shadows[1],
      fontSize: 11
    },
    boxPadding: {
      padding: "30px 50px",
      [theme.breakpoints.down("md")]: {
        padding: 8
      }
    },
    lockIcon: {
      padding: "25px 0 0 10px",
      [theme.breakpoints.down("md")]: {
        padding: "25px 0 0 0"
      }
    },
    snackContent: {
      backgroundColor: "#43A047"
    },
    iconSnackContent: {
      opacity: 0.9,
      marginRight: 8,
      fontSize: 20
    },
    message: {
      display: "flex",
      alignItems: "center"
    },

    box_avatar: {
      display: "flex",
      alignItems: "center",
      marginBottom: 50
    },
    avatar: {
      position: "relative",
      width: 150,
      height: 150,
      display: "inline-block"
    },
    imgAvatar: {
      width: "150px",
      height: "150px",
      [theme.breakpoints.down("xs")]: {
        width: "125px",
        height: "125px"
      },
      objectFit: "cover",
      borderRadius: "50%"
    },
    uploadAvatar: {
      "&:hover": {
        cursor: "pointer"
      },
      borderRadius: "50%",
      position: "absolute",
      bottom: 15,
      right: 2,
      background: "linear-gradient(to right, #FFC54D, #FFA712)",
      color: "white",
      padding: 6
    },
    verifiedMail: {
      width: 17,
      height: 17,
      display: "inline-block",
      paddingLeft: 10,
      overflow: "unset",
      position: "absolute",
      fontSize: 0
    },
    imgIconEdit: {
      "&:hover": {
        cursor: "pointer"
      },
      width: 17,
      height: 17,
      verticalAlign: "sub"
    },
    inline: {
      verticalAlign: "top",
      marginRight: 10,
      display: "inline-block"
    },
    typeaheadMenu: {
      position: "static"
    },
    root: {
      height: 250,
      flexGrow: 1
    },
    container: {
      position: "relative"
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 1,
      //marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    suggestion: {
      display: "block"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    },
    outlineInput: {
      padding: "12px 16px"
    },
    helperText: {
      fontSize: 14
    },
    userTitle: {
      marginLeft: 20
    },
    formCountryCode: {
      minWidth: "fit-content",

      [theme.breakpoints.up("md")]: {
        width: "100%"
      }
    },
    containerCountryCode: {
      padding: 8
    },
    boxCountryCode: {
      marginRight: 10
    }
  })
);

interface FormikProfileValues {
  gender: number;
  phone: string;
  countryCode: string;
  name: string;
  email: string;
  day: string | null;
  month: string | null;
  year: string | null;
  address: string | null;
  description: string | null;
  job: string | null;
  emergency_contact: string | null;
  avatar_url: string | undefined;
  city_id?: number | null;
  district_id?: number | null;
}

interface IEditProfile {
  classes?: any;
}

const EditProfile: ComponentType<IEditProfile> = (props: IEditProfile) => {
  const classes = useStyles(props);
  const { state, dispatch } = useContext<IProfileContext>(ProfileContext);
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const { profile } = state;
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<any>("");  
  const [suggestions, setSuggestions] = useState<any>([]);
  const [districtsList, setDistrictsList] = useState<any>([]);
  // const [selectedCity, setSelectedCity] = useState<any>(null);
  const [city, setCity] = useState<any>(null);

  const [district, setDistrict] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setCity(profile!.city.data);
      setDistrict(profile!.district.data);
      setValue(profile!.city.data.name);
      getDistrictsByCity(profile!.city_id);
    }
  }, [profile]);

  let birthday: any = null;
  if (profile == null) {
    birthday = "";
  } else {
    birthday = profile!.birthday;
  }

  const arrMenuItem = (x: number, y: number) => {
    let i = x;
    let arr = [];
    while (i <= y) {
      if (i < 10) {
        arr.push(<option key={i} value={`0${i}`}>{`0${i}`}</option>);
      } else {
        arr.push(<option key={i} value={`${i}`}>{`${i}`}</option>);
      }
      i++;
    }
    return arr;
  };

  const onChange = (e: any, { newValue }: { newValue: any }) => {
    setValue(newValue);
  };

  const renderSuggestion = (suggestion: any, { query, isHighlighted }: any) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted}>
        <div>
          {parts.map((part: { text: React.ReactNode; highlight: any }) => (
            <span>{part.text}</span>
          ))}
        </div>
      </MenuItem>
    );
  };

  const getSuggestionValue = (suggestion: any) => {
    getDistrictsByCity(suggestion.id);
    setCity(suggestion);
    setValue(suggestion.name);
    return suggestion.name;
  };

  const getDistrictsByCity = (id: any) => {
    axios.get(`districts?city_id=${id}`).then(res => {
      setDistrictsList(res.data.data);
    });
  };

  const getSuggestions = (value: any) => {
    setIsLoading(true);
    axios
      .get("cities")
      .then(res => {
        let suggestionss = res.data.data;
        const inputValue = deburr(value.trim()).toLowerCase();

        const inputLength = inputValue.length;

        setSuggestions(
          inputLength === 0
            ? []
            : suggestionss.filter((suggestion: any) =>
                suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
              )
        );
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSuggestionsFetchRequested = ({ value }: { value: any }) => {
    getSuggestions(value);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderInputComponent = (inputProps: any) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        variant="outlined"
        fullWidth
        classes={{ marginDense: classes.marginDense }}
        inputProps={{
          className: classes.outlineInput
        }}
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    );
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  const formikInit = useMemo<FormikProfileValues>(() => {
    return {
      name: profile ? profile!.name : "",
      gender: profile ? profile!.gender : 0,
      phone: profile ? profile!.phone : "",
      countryCode: "+84",
      email: profile ? profile!.email : "",
      day: moment(birthday).format("DD"),
      month: moment(birthday).format("MM"),
      year: moment(birthday).format("YYYY"),
      address: profile ? profile!.address : "",
      description: profile ? profile!.description : "",
      job: profile ? profile!.job : "",
      emergency_contact: profile ? profile.emergency_contact : "",
      avatar_url: profile ? profile.avatar_url : "",
      city_id: profile ? profile.city_id : null,
      district_id: profile ? profile.district_id : null
    };
  }, [profile]);

  const validationForm = Yup.object().shape({
    // Validate form field
    name: Yup.string()
      .required("Họ và Tên là bắt buộc")
      .min(2, "Tên phải có ít nhất 2 kí tự")
      .max(50, "Tên không quá 50 kí tự"),
    email: Yup.string()
      .required("Email là bắt buộc")
      .email("Vui lòng nhập đúng định dạng email"),
    phone: Yup.string()
      .required("Số điện thoại là bắt buộc")
      .test(
        "checkNaN",
        "Không được nhập chữ và các kí hiệu đặc biệt",
        value => !isNaN(value)
      )
      .min(10, "SĐT phải có ít nhất 10 số")
      .max(11, "SĐT không vượt quá 11 số")
  });

  return (
    <div className={classes.boxEditProfile}>
      <Formik
        initialValues={formikInit}
        validationSchema={() => validationForm}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={(
          values: FormikProfileValues,
          actions: FormikActions<FormikProfileValues>
        ) => {
          let day = values.day ? values.day : "";
          let month = values.month ? values.month : "";
          let year = values.year ? values.year : "";

          const data: ProfileInfoReq = {
            name: values.name,
            email: values.email,
            gender: values.gender,
            birthday: moment(`${year}` + `${month}` + `${day}`).format(
              "YYYY-MM-DD"
            ),
            address: values.address,
            phone: values.phone,
            description: values.description,
            job: values.job,
            emergency_contact: values.emergency_contact,
            // city_id: city.id,
            // district_id: values.district_id
          };

          axios
            .put("profile", data)
            .then(res => {
              actions.setSubmitting(false);
              setOpenSnack(!openSnack);
            })
            .catch(error => {
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
          handleReset
        }: FormikProps<FormikProfileValues>) => {
          return (
            <form onSubmit={handleSubmit}>
              <Paper elevation={0} className={classes.boxPadding}>
                <GridContainer
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.editRequired}
                >
                  <div className={classes.box_avatar}>
                    <div
                      className={classes.avatar}
                      onMouseEnter={() => setShow(!show)}
                      onMouseLeave={() => setShow(false)}
                    >
                      <img
                        alt="Avatar"
                        src={
                          BG
                          // values.avatar_url == undefined
                          //   ? BG
                          //   : values.avatar_url
                        }
                        className={classes.imgAvatar}
                      />
                    </div>
                    <div className={classes.userTitle}>
                      <Typography variant="h6" color="inherit">
                        {profile ? profile!.name : ""}
                      </Typography>
                      <Typography
                        style={{ color: "#686868" }}
                        variant="body2"
                        color="inherit"
                      >
                        {profile ? profile!.email : ""}
                        <img
                          alt="Avatar"
                          src={verifiedMail}
                          className={classes.verifiedMail}
                        />
                      </Typography>
                    </div>
                  </div>

                  {/* Đề Nghị Part */}

                  <Typography variant="h5" className={classes.typoBigTitle}>
                    Đề nghị
                  </Typography>
                  <Divider />

                  {/* Tên */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Tên{" "}
                      </Typography>
                    </Grid>

                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={classes.formControl}
                        fullWidth
                        required
                        error={!!errors.name}
                      >
                        {/* <InputLabel htmlFor="name">Họ và tên</InputLabel> */}
                        <TextField
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Tên của bạn"
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Giới tính */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Giới tính{" "}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        {/* <InputLabel htmlFor="Gender">Giới tính</InputLabel> */}
                        <Select
                          native
                          value={values.gender}
                          onChange={handleChange}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          input={
                            <OutlinedInput
                              name="gender"
                              labelWidth={0}
                              id="outlined-gender-native-simple"
                            />
                          }
                        >
                          <option value={0}>Khác</option>
                          <option value={1}>Nam</option>
                          <option value={2}>Nữ</option>
                        </Select>
                      </FormControl>
                      <FormHelperText id="gender-helper-text">
                        Chúng tôi sẽ không chia sẻ thông tin này của bạn cho bất
                        kì ai.
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  {/* Số điện thoại */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                      className={classes.title}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Số điện thoại
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid
                      container
                      xs={8}
                      sm={9}
                      md={8}
                      lg={8}
                      className={classes.containerCountryCode}
                    >
                      {/* <Grid
                        item
                        xs={12}
                        sm={2}
                        md={2}
                        lg={2}
                        className={classes.boxCountryCode}
                      >
                        <FormControl
                          required
                          className={classNames(
                            classes.formControl,
                            classes.formCountryCode
                          )}
                        >
                          <Select
                            native
                            name="countryCode"
                            value={values.countryCode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{
                              name: "countryCode",
                              id: "country-Code",
                              className: classes.outlineInput
                            }}
                            input={
                              <OutlinedInput
                                name="countryCode"
                                labelWidth={0}
                                id="outlined-countryCode-native-simple"
                              />
                            }
                          >
                            <option value={"+84"}>+84</option>
                            <option value={"+888"}>+888</option>
                            <option value={"+52"}>+52</option>
                            <option value={"+1"}>+1</option>
                          </Select>
                        </FormControl>
                      </Grid> */}
                      {/* <Grid item xs={12} sm={7} md={8} lg={8}> */}
                        <FormControl
                          className={classes.formControl}
                          aria-describedby="phone-helper-text"
                          fullWidth
                          required
                          error={!!errors.phone}
                        >
                          <TextField
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{
                              className: classes.outlineInput
                            }}
                            variant="outlined"
                          />
                          {!!errors.phone ? (
                            touched.phone && (
                              <FormHelperText>{errors.phone}</FormHelperText>
                            )
                          ) : (
                            <FormHelperText id="phone-helper-text">
                              SĐT để liên lạc giữa chủ nhà và khách, yêu cầu đặt
                              phòng, gửi nhắc nhở, và các thông báo khác
                            </FormHelperText>
                          )}
                        </FormControl>
                      {/* </Grid> */}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Email
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={classes.formControl}
                        aria-describedby="email-helper-text"
                        fullWidth
                        required
                        error={!!errors.email}
                      >
                        <TextField
                          disabled
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          variant="outlined"
                        />

                        {!!errors.email ? (
                          touched.email && (
                            <FormHelperText
                              classes={{ root: classes.helperText }}
                            >
                              {errors.email}
                            </FormHelperText>
                          )
                        ) : (
                          <FormHelperText
                            classes={{ root: classes.helperText }}
                            id="email-helper-text"
                          >
                            Email này là cố định với mỗi người dùng. Chúng tôi
                            sẽ không chia sẻ địa chỉ email của bạn cho bất kì
                            ai.
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Ngày sinh
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <Grid item className={classes.inline}>
                        <Select
                          native
                          value={values.day ? values.day : "01"}
                          className={classes.formControl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          input={
                            <OutlinedInput
                              name="day"
                              labelWidth={0}
                              id="outlined-day-native-simple"
                            />
                          }
                        >
                          {arrMenuItem(1, 31)}
                        </Select>

                        {/* </TextField> */}
                      </Grid>
                      <Grid item className={classes.inline}>
                        <Select
                          native
                          value={values.month ? values.month : "01"}
                          className={classes.formControl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          input={
                            <OutlinedInput
                              name="month"
                              labelWidth={0}
                              id="outlined-month-native-simple"
                            />
                          }
                        >
                          {arrMenuItem(1, 12)}
                        </Select>

                        {/* </TextField> */}
                      </Grid>
                      <Grid item className={classes.inline}>
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="space-between"
                        >
                          <Grid item>
                            <Select
                              native
                              value={values.year ? values.year : "01"}
                              className={classes.formControl}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              inputProps={{
                                className: classes.outlineInput
                              }}
                              input={
                                <OutlinedInput
                                  name="year"
                                  labelWidth={0}
                                  id="outlined-year-native-simple"
                                />
                              }
                            >
                              {arrMenuItem(
                                1900,
                                parseInt(moment().format("YYYY"))
                              )}
                            </Select>
                          </Grid>
                        </Grid>
                      </Grid>

                      <FormHelperText
                        classes={{ root: classes.helperText }}
                        id="birthday-helper-text"
                      >
                        Chúng tôi sẽ không chia sẻ thông tin này cho bất kì ai.
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  {/* Địa chỉ */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Địa chỉ{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={classes.formControl}
                        aria-describedby="address-helper-text"
                        fullWidth
                      >
                        <TextField
                          name="address"
                          placeholder="Quận/ huyện, Thành phố"
                          value={values.address ? values.address : ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/* <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid item xs={4} sm={3} md={4} lg={3} />
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <Grid item className={classes.inline}>
                        <Autosuggest
                          {...autosuggestProps}
                          inputProps={{
                            classes,
                            id: "cities-autosuggest-simple",
                            placeholder: "Chọn thành phố",
                            value: value? ,
                            onChange
                          }}
                          theme={{
                            container: classes.container,
                            suggestionsContainerOpen:
                              classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion
                          }}
                          renderSuggestionsContainer={options => (
                            <Paper {...options.containerProps} square>
                              {options.children}
                            </Paper>
                          )}
                        />
                      </Grid>
                      <Grid item className={classes.inline}>
                        <FormControl className={classes.formControl}>
                          <Select
                            native
                            value={values.district_id!}
                            name="district_id"
                            className={classes.formControl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Chọn Quận Huyện"
                            inputProps={{
                              className: classes.outlineInput
                            }}
                            input={
                              <OutlinedInput
                                name="district"
                                labelWidth={0}
                                id="outlined-district-native-simple"
                              />
                            }
                          >
                            {districtsList
                              ? districtsList.map(
                                  (district: any, index: number) => (
                                    <option key={index} value={district.id}>
                                      {district.name}
                                    </option>
                                  )
                                )
                              : null}
                          </Select>
                        </FormControl>
                      </Grid>
                      <FormHelperText
                        classes={{ root: classes.helperText }}
                        id="address-helper-text"
                      >
                        Chọn địa chỉ cụ thể, thành phố, Quận/Huyện của bạn
                      </FormHelperText>
                    </Grid>
                  </Grid> */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Mô tả{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <TextField
                        id="desYourSelf"
                        placeholder="Giúp mọi người hiểu thêm về bạn"
                        fullWidth
                        multiline
                        // InputProps={{
                        //   root: classes.outlineInput
                        // }}
                        // classes = {{outlineInput: classes.outlineInput}}
                        variant="outlined"
                        rows={4}
                        rowsMax="4"
                        onChange={handleChange}
                        name="description"
                        value={values.description ? values.description : ""}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <FormHelperText
                        classes={{ root: classes.helperText }}
                        id="address-helper-text"
                      >
                        Cho mọi người biết về bản thân, sở thích, trải nghiệm du
                        lịch với tư cách là khách hoặc chủ nhà của bạn.
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </GridContainer>
                <GridContainer
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.editRequired}
                >
                  <Typography variant="h5" className={classes.typoBigTitle}>
                    Tùy chọn
                  </Typography>
                  <Divider />
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Nghề nghiệp{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={classes.formControl}
                        aria-describedby="Work-helper-text"
                        fullWidth
                      >
                        <TextField
                          name="job"
                          placeholder="Tên trường học, công ty hoặc vị trí công việc của bạn"
                          value={values.job ? values.job : ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                      {/* </Tooltip> */}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={classes.rowInputs}
                  >
                    <Grid
                      className={classes.title}
                      item
                      xs={4}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.typoTitle}
                      >
                        Liên lạc khẩn cấp{" "}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <Lock style={{ marginTop: 10 }} color="error" />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={classes.formControl}
                        aria-describedby="emergencyContact-helper-text"
                        fullWidth
                      >
                        {/* <Input
                            endAdornment={
                              <InputAdornment position="end">
                                <Lock color="error" />
                              </InputAdornment>
                            }
                            inputProps={{
                              "aria-label": "Emergency Contact"
                            }}
                          /> */}
                        <TextField
                          name="emergency_contact"
                          value={
                            values.emergency_contact
                              ? values.emergency_contact
                              : ""
                          }
                          inputProps={{
                            className: classes.outlineInput
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                        />
                        <FormHelperText
                          classes={{ root: classes.helperText }}
                          id="emergencyContact-helper-text"
                        >
                          Cung cấp cho chúng tôi một liên hệ đáng tin cậy để có
                          thể thông báo trong tình huống khẩn cấp.
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </GridContainer>
                <GridContainer
                  xs={12}
                  sm={11}
                  md={10}
                  lg={9}
                  className={classes.editRequired}
                >
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    className={classes.rowButton}
                  >
                    <Grid item xs={4} sm={2}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleReset}
                      >
                        Tạo lại
                      </Button>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Lưu
                      </Button>
                    </Grid>
                  </Grid>
                </GridContainer>
              </Paper>
            </form>
          );
        }}
      </Formik>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => {
          setOpenSnack(!openSnack);
          window.location.reload();
        }}
      >
        <SnackbarContent
          className={classes.snackContent}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={classes.iconSnackContent} />
              Lưu dữ liệu thành công !
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => {
                setOpenSnack(!openSnack);
              }}
            >
              <CloseIcon className={classes.iconClose} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
};

export default EditProfile;
