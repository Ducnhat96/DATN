import { ThemeCustom } from "@/components/Theme/Theme";
import { ReducersType } from "@/store/reducers";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import appC from "@/styles/App.module.scss";
import { FormikProps } from "@/types/Interface/Formik";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Gray from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import People from "@material-ui/icons/People";
import { Formik, FormikActions } from "formik";
import React, { useState, memo, FC } from "react";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { withRouter, RouteProps } from "react-router-dom";
import { compose } from "recompose";
import * as Yup from "yup";
import Hidden from "@material-ui/core/Hidden/Hidden";
import { StylesConfig } from "react-select/lib/styles";
import AutoSuggestSearch from "@/components/Utils/AutosuggestSearch";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import { newRoomLocation } from "@/store/context/Room/RoomIndexContext";

export const DatePicker = Loadable<any, any>({
  loader: (): Promise<any> => import("@/components/Utils/DateRange"),
  loading: () => null
});

interface IProps extends RouteProps, RouterProps {
  classes?: any;
  filter: SearchFilterState;
}

type FormikValues = {
  name: string;
  id: number;
};

const FormikInit: FormikValues = {
  name: "",
  id: 2
};

const FormValidationSchema = Yup.object().shape({
  name: Yup.string()
});

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    searchWrapper: {
      background: "#fffffff7",
      borderRadius: "4px",
      padding: "32px !important",
      paddingBottom: "24px",
      width: "441px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.25)"
    },
    searchTitle: {
      [theme!.breakpoints!.only!("xs")]: {
        fontSize: "20px"
      },
      [theme!.breakpoints!.only!("sm")]: {
        fontSize: 28
      },
      fontSize: "30px",
      lineHeight: "32px",
      letterSpacing: "normal",
      color: "#484848",
      marginBottom: "20px",
      fontWeight: 700
    },
    heading: {
      textTransform: "uppercase"
    },
    fontSize: {
      fontSize: "1.1rem"
    },
    button: {
      margin: theme.spacing!.unit
    },
    modal: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "15%",
      width: "40%",
      padding: 40
    },
    inputSearch: {
      [theme!.breakpoints!.only!("xs")]: {
        width: "100%",
        maxWidth: "247px"
      },
      [theme!.breakpoints!.only!("xl")]: {
        width: "100%"
      },
      [theme!.breakpoints!.only!("lg")]: {
        width: "100%",
        maxWidth: "389px"
      },
      [theme!.breakpoints!.only!("sm")]: {
        width: "100%",
        maxWidth: "560px"
      },
      [theme!.breakpoints!.only!("md")]: {
        width: "100%",
        maxWidth: "560px"
      },
      width: "100%",
      border: "none",
      fontSize: "1em",
      fontWeight: 300,
      outline: "none"
    },
    paperSize: {
      height: 60,
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      border: "1px solid #EBEBEB !important",
      boxShadow: "none",
      borderRadius: "4px !important",
      backgroundColor: "#fff"
    },
    searchButton: {
      height: "100%",
      width: "100%",
      fontSize: "0.9rem",
      color: "#FFFFFF",
      background: "#248489",
      boxShadow: "none",
      fontWeight: 800,
      "&:hover": {
        background: "#008489"
      }
    },
    grayLighten1: {
      color: Gray[600]
    },
    spinner: {
      width: "30px !important",
      height: "30px !important",
      color: "#008489"
    },
    marginSearch: {
      marginLeft: 23
    },
    paperCustom: {
      padding: "25px 30px",
      borderRadius: 4,
      backgroundColor: "#fffffff0"
    }
  });

export const searchStylesHome: StylesConfig = {
  control: styles => ({
    ...styles,
    border: "none",
    cursor: "pointer"
  }),
  container: styles => ({
    ...styles,
    padding: 0
  }),
  indicatorSeparator: styles => ({
    display: "none"
  }),
  valueContainer: styles => ({
    ...styles,
    padding: 0
  }),
  placeholder: styles => ({
    ...styles,
    color: "#a7a5a5",
    fontSize: "1rem"
  }),
  menu: styles => ({
    ...styles,
    zIndex: 99999,
    width: "calc(100% + 5vw)",
    left: "-5vw",
    marginTop: "18px",
    border: "none"
  }),
  singleValue: styles => ({
    ...styles,
    width: "100% !important"
  })
};

const SearchHomeNew: FC<IProps | any> = (props: IProps) => {
  const { classes, filter, history } = props;
  const { bookingType } = filter;
  const [isOpen, setMenuOpen] = useState<boolean>(false);
  const [city_id, setCityId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState<any>(null);
  const [openGuestSelect, toggleOpenGuestSelect] = useState<boolean>(false);
  const [searchText, setSearchText] = useState(filter!.searchText);
  const handleSubmitForm = (
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) => {
    const pushQuery: RoomUrlParams = {
      name: city_id === "" && district_id === "" ? searchText : "",
      number_of_rooms: filter.roomsCount,
      check_in: filter.startDate,
      check_out: filter.endDate,
      number_of_guests: filter.guestsCount,
      most_popular: null,
      rent_type: bookingType !== 0 ? bookingType : undefined,
      city_id: city_id ? city_id : "",
      district_id: district_id ? district_id : ""
    };
    const location = newRoomLocation(pushQuery);
    history.push(location);
  };
  return (
    <Grid className={classes.searchWrapper} item lg={5} md={6} xs={12}>
      <Typography className={classes.searchTitle} variant="h1">
        Đặt phòng Homestay nhận ngay ưu đãi.
      </Typography>
      <Formik
        initialValues={FormikInit}
        validationSchema={() => FormValidationSchema}
        validateOnChange={false}
        onSubmit={handleSubmitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }: FormikProps<FormikValues>) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={16}>
                <Grid item md={12} xs={12} onClick={() => setMenuOpen(!isOpen)}>
                  <Paper elevation={2} className={classes.paperSize}>
                    <AutoSuggestSearch
                      isNav={false}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      setCityId={setCityId}
                      setDistrictId={setDistrictId}
                    />
                  </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Paper elevation={2} className={classes.paperSize}>
                    <Hidden xsDown>
                      <DatePicker
                        setOpenDatePicker={setOpenDatePicker}
                        openDatePicker={openDatePicker}
                        toggleOpenGuestSelect={toggleOpenGuestSelect}
                      />
                    </Hidden>
                  </Paper>
                </Grid>
                <Grid
                  item
                  md={8}
                  xs={12}
                  sm={12}
                  onClick={() => toggleOpenGuestSelect(!openGuestSelect)}
                >
                   <Paper elevation={2} className={classes.paperSize}>
                   <People
                      className={classes.marginSearch}
                      fontSize="default"
                    />
                    <Grid container spacing={8}>
                      <Grid item lg={12}>
                        <div className={appC["ml-20"]}>
                          <Typography variant="body2">
                            <span>{filter.guestsCount}</span>&nbsp;
                            <span>khách</span>
                          </Typography>
                          <Typography
                            variant="body2"
                            className={classes.grayLighten1}
                          >
                            {bookingType === 2
                              ? "Theo ngày"
                              : bookingType === 1
                              ? "Theo giờ"
                              : "Theo ngày và giờ"}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                   </Paper>
                </Grid>
                <Grid item md={4} xs={12} sm={12}>
                    <Paper elevation={2} className={classes.paperSize}>
                      <Button
                        variant="contained"
                        color="primary"
                        name="search"
                        className={classes.searchButton}
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <CircularProgress className={classes.spinner} />
                        ) : (
                          "Tìm kiếm"
                        )}
                      </Button>
                    </Paper>
                  </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  memo
)(SearchHomeNew);

export const style = styles;
