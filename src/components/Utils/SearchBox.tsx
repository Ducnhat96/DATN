import { ThemeCustom } from "@/components/Theme/Theme";
import GuestSelect from "@/components/Utils/GuestSelect";
import { ReducersType } from "@/store/reducers";
import { SearchFilterState } from "@/store/reducers/searchFilter";
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
import React, {
  FunctionComponent,
  useState,
  memo,
  useEffect,
  Fragment,
  SetStateAction
} from "react";
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
import "@/styles/searchHome.scss";
import "@/styles/Airbnb/date-picker-homepage.scss";
import Collapse from "@material-ui/core/Collapse";
import SelectSearch from "react-select";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import WhatshotIcon from "@material-ui/icons/WhatshotRounded";
import Downshift from "downshift";

interface IProps extends RouteProps, RouterProps {
  classes?: any;
  searchData: any;
  onSearch: void;
  setSearchValue(selection: any): any;
  initialInputValue?: string;
  onInputKeyDown: void;
  onOuterClick: any;
  inputValue: string;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    searchWrapper: {
      [theme!.breakpoints!.up!("md")]: {
        background: "#fffffff7",
        padding: "32px !important",
        boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
        borderRadius: "4px"
      },

      zIndex: 2,
      paddingBottom: "24px",
      width: "441px"
    },
    searchTitle: {
      [theme!.breakpoints!.down!("md")]: {
        color: "#fff"
      },
      fontSize: "30px",
      lineHeight: "36px",
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
      //maxWidth: "calc(100% - 70px)",
      width: "100%",
      position: "relative",
      border: "none",
      fontSize: "1em",
      fontWeight: 300,
      outline: "none"
    },
    paperSize: {
      [theme!.breakpoints!.up!("md")]: {
        border: "1px solid #EBEBEB !important",
        boxShadow: "none"
      },
      height: 60,
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      // border: '1px solid #e0e0e0 !important',

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
    iconSearch: {
      [theme!.breakpoints!.down!("md")]: {
        padding: "0px 13px 0 13px"
      },
      [theme!.breakpoints!.up!("md")]: {
        padding: "0 23px"
      }
    },
    paperCustom: {
      padding: "25px 30px",
      // boxShadow : 'none',
      borderRadius: 4,
      backgroundColor: "#fffffff0"
    },
    menu: {
      [theme!.breakpoints!.down!("md")]: {
        width: "calc(100% + 50px)",
        marginLeft: "-50px"
      },
      zIndex: 9999999,
      width: "calc(100% + 5em)",
      outline: 0,
      position: "absolute",
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "auto",
      marginTop: "1.3em",
      marginLeft: "-70px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      borderRadius: "4px",
      background: "#fff",
      maxHeight: "16rem"
    },
    title: {
      marginLeft: "10px",
      fontWeight: 600,
      fontSize: "0.9em"
    },
    item: {
      padding: "10px 10px 10px 15px",
      cursor: "pointer"
    },
    subTitle: {
      color: "#757575"
    },
    hotLocation: {
      marginLeft: "5px",
      fontWeight: 600,

      color: "#e53935"
    },
    searchIcon: {
      verticalAlign: "sub",
      width: "20px",
      height: "20px"
    }
  });

const SearchBox: FunctionComponent<IProps | any> = (props: IProps) => {
  const { classes, setSearchValue, onSearch, searchData, initialInputValue, onInputKeyDown, onOuterClick, inputValue } = props;
  // console.log('Input Value: '+inputValue);
  return (
    <Downshift
      onChange={selection => setSearchValue(selection)}
      itemToString={item => (item ? item.name : "")}
      // defaultIsOpen={true}
      initialInputValue={initialInputValue}
      // defaultHighlightedIndex={0}
      onOuterClick={onOuterClick}
    // inputValue={inputValue}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
          <div className={classes.inputSearch}>
            <input
              className={classes.inputSearch}
              {...getInputProps({
                isOpen,
                placeholder: "Bạn muốn tới đâu?",
                onChange: onSearch,
                // onKeyDown: onInputKeyDown,
              })}
            />
            {isOpen ? (
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.menu}
              >
                {searchData.map((item: any, index: number) => (
                  <Fragment>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.item}
                      alignItems="center"
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      <Grid item xs={2} sm={1} md={1}>
                        {item.type == 1 || item.type == 2 ? (
                          <LocationIcon className={classes.searchIcon} />
                        ) : item.type == 3 ? (
                          <HomeIcon className={classes.searchIcon} />
                        ) : (
                              ""
                            )}
                      </Grid>
                      <Grid item xs={10} sm={11} md={11}>
                        <Typography className={classes.title}>
                          {!item.error ? item.name : item.error}
                          {"  "}
                          {item.hot == 1 ? (
                            <span className={classes.hotLocation}>
                              <WhatshotIcon className={classes.searchIcon} />
                            </span>
                          ) : (
                              ""
                            )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            ) : null}
          </div>
        )}
    </Downshift>
  );
};

export default compose<IProps, any>(
  withRouter,
  withStyles(styles),
  memo
)(SearchBox);

export const style = styles;
