import { ThemeCustom } from "@/components/Theme/Theme";
import GuestSelect from "@/components/Utils/GuestSelect";
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
import SearchIcon from "@material-ui/icons/Search";
import classNames from "classnames";
import { Formik, FormikActions } from "formik";
import React, { FunctionComponent, useState, memo, useEffect } from "react";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { withRouter, RouteProps } from "react-router-dom";
import { compose } from "recompose";
import { Dispatch } from "redux";
import * as Yup from "yup";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import Hidden from "@material-ui/core/Hidden/Hidden";
import DatePickerHomeXsOnly from "@/views/Homepage/DatePicker/DatePickerHomeXsOnly";
import { InputActionMeta } from "react-select/lib/types";
import { StylesConfig } from "react-select/lib/styles";
import MenuItemSelectWithIcon from "@/components/Custom/MenuItemSelectWithIcon";
import { searchSuggest } from "@/store/context/searchSuggestion";
import { SearchSuggestRes } from "@/types/Requests/Search/SearchResponse";
import axiosBase from "axios";
import { newRoomLocation } from "@/store/context/Room/RoomIndexContext";
import Collapse from "@material-ui/core/Collapse";
import Orange from "@material-ui/core/colors/orange";
import SelectSearch from "react-select";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AutoSuggestSearch from "@/components/Utils/AutosuggestSearch";

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
      // height: '30px',

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
      // border: '1px solid #e0e0e0 !important',
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
      background: "linear-gradient(to right, #FFC54D, #FFA712)",
      boxShadow: "none",
      fontWeight: 800,
      "&:hover": {
        background: "linear-gradient(to right, #ff890f, #fc6b09)"
      }
    },
    grayLighten1: {
      color: Gray[600]
    },
    spinner: {
      width: "30px !important",
      height: "30px !important"
    },
    marginSearch: {
      marginLeft: 23
    },
    paperCustom: {
      padding: "25px 30px",
      // boxShadow : 'none',
      borderRadius: 4,
      backgroundColor: "#fffffff0"
    }
  });

export const searchStylesHome: StylesConfig = {
  control: styles => ({
    ...styles,
    border: "none",
    // boxShadow: 'none',
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

const SearchHome: FunctionComponent<IProps | any> = (props: IProps) => {
  const { classes, filter, history } = props;
  const { bookingType } = filter;
  const [isOpen, setMenuOpen] = useState<boolean>(false);
  const [openGuestSelect, toggleOpenGuestSelect] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<any>(null);
  const [city_id, setCityId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const [searchText, setSearchText] = useState(filter!.searchText);
  return (
    <Grid className={classes.searchWrapper} item lg={5} md={6} xs={12}>
      <Typography className={classes.searchTitle} variant="h1">
        Đặt phòng Homestay ngay hôm nay để tận hưởng ưu đãi.
      </Typography>
      <Formik
        initialValues={FormikInit}
        validationSchema={() => FormValidationSchema}
        validateOnChange={false}
        onSubmit={(
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
                    <Hidden smUp>
                      <DatePickerHomeXsOnly />
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
      {/* </Paper> */}
      <Grid item md={10} sm={12} xs={12} style={{ marginTop: 10 }}>
        <Collapse in={openGuestSelect}>
          <GuestSelect />
        </Collapse>
      </Grid>
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
)(SearchHome);

export const style = styles;
