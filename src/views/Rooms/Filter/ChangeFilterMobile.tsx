import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useState,
  useEffect,
  memo
} from "react";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { Range } from "react-input-range";
import {
  RoomIndexContext,
  IRoomIndexContext,
  loadFilter,
  newRoomLocation
} from "@/store/context/Room/RoomIndexContext";
import { usePriceEffect } from "@/components/Rooms/PriceRange";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { updateObject } from "@/store/utility";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";
import _ from "lodash";

import Paper from "@material-ui/core/Paper/Paper";
import Grey from "@material-ui/core/colors/grey";
import Blue from "@material-ui/core/colors/blue";

import { Grid, Slide, InputBase } from "@material-ui/core";
import { Hidden, Modal } from "@material-ui/core/es";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import { connect } from "react-redux";
import { ReducersType } from "@/store/reducers";
import { Dispatch } from "redux";
import Loadable from "react-loadable";
import Gray from "@material-ui/core/colors/grey";
import Orange from "@material-ui/core/colors/orange";
import GuestSelect from "@/components/Utils/GuestSelect";
import SearchIcon from "@material-ui/icons/Search";
import SelectSearch from "react-select";
import { SearchSuggestRes } from "@/types/Requests/Search/SearchResponse";
import { searchSuggest } from "@/store/context/searchSuggestion";
import axiosBase from "axios";
import classNames from "classnames";
import { InputActionMeta } from "react-select/lib/types";
import MenuItemSelectWithIcon from "@/components/Custom/MenuItemSelectWithIcon";
import { StylesConfig } from "react-select/lib/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import '@/styles/filtersearchmobile.scss'

interface PropsFilterCity {
  setOpen(value: boolean): void;
  open?: boolean;
}

const FilterCityMobile = Loadable<PropsFilterCity, any>({
  loader: (): Promise<any> => import("@/views/Rooms/Filter/FilterCityMobile"),
  loading: (): any => {
    return null;
  }
});

export const TransitionCustom = (props: any) => (
  <Slide direction="left" {...props} timeout={{ enter: 500, exit: 200 }} />
);

interface IProps {
  classes?: any;
  filter: SearchFilterState;
  setOpen(value: boolean): void;
  updateSearchText(inputSearch: string): void;
  updateSearchCity(city_id: number | undefined): void;
  updateSearchDistrict(district_id: number | undefined): void;
}

const DatePickerHomeXsOnly = Loadable({
  loader: (): Promise<any> =>
    import("@/views/Homepage/DatePicker/DatePickerHomeXsOnly"),
  loading: () => null
});

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    sortMargin: {
      marginTop: 12
    },
    ul: {
      listStyleType: "none",
      marginBlockStart: "0px",
      paddingInlineStart: "0.4rem",
      paddingBlockStart: "0.5rem",
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5
    },
    buttonHeight: {
      height: "100%"
    },
    center: {
      textAlign: "center"
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0
    },
    dialog: {
      [theme!.breakpoints!.only!("xs")]: {
        padding: "0 20px"
      }
    },
    apply: {
      width: "100%",
      fontSize: 16,
      fontWeight: 700,
      textTransform: "initial"
    },
    showMore: {
      textAlign: "center",
      padding: 5,
      backgroundColor: Grey[200],
      color: Blue[400]
    },
    title: {
      fontWeight: 700
    },
    paperSizeDatePicker: {
      height: 60,
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      border: "2px solid #e0e0e0 !important",
      borderRadius: "4px !important",
      backgroundColor: "#fff"
    },
    paperSize: {
      height: 60,
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      // border: '1px solid #e0e0e0 !important',
      borderRadius: "4px !important",
      backgroundColor: "#fff"
    },
    marginSearch: {
      marginLeft: 21
    },
    grayLighten1: {
      color: Gray[600]
    },
    searchButton: {
      height: "100%",
      width: "100%",
      fontSize: "0.9rem",
      color: "#FFFFFF",
      "&:hover": {
        background: Orange[700]
      }
    },
    spinner: {
      width: "30px !important",
      height: "30px !important"
    },
    paperSearch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    },
    inputSearch: {
      width: "100%",
      border: "none",
      fontSize: "1em",
      fontWeight: 300,
      outline: "none"
    },
    boxSearch: {
      border: "2px solid #EBEBEB !important"
    },
    '#react-select-2-input': {
      opacity: 1
    }
  });

const searchStylesHome: StylesConfig = {
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
    width: "100%",
    marginTop: "18px",
    border: "1px solid #EBEBEB !important",
    borderRadius: "4px !important",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1) !important"
  }),
  singleValue: styles => ({
    ...styles,
    width: "100% !important"
  }),
  noOptionsMessage: styles => ({
    ...styles,
    display: "none"
  })
};

// @ts-ignore
const ChangeFilterMobile: ComponentType<IProps> = (props: IProps) => {
  const {
    classes,
    setOpen,
    filter,
    updateSearchText,
    updateSearchCity,
    updateSearchDistrict
  } = props;

  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const {
    ratingLists,
    roomTypes,
    comforts,
    amenities,
    roomTypesFilter
  } = state;

  const [star, setStar] = useState<number>(5);
  const [roomTypeLocal, setRoomTypeLocal] = useState<number[]>(roomTypesFilter);
  const [comfortTypeLocal, setComfortLocal] = useState<number[]>(amenities);
  const [sortPrice, setSortPrice] = useState<string>("1");
  const [openGuestSelect, toggleOpenGuestSelect] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchSuggestRes[]>([]);
  const [searchText, setSearchText] = useState<any>(filter.searchText);
  const [city_id, setCityId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const { bookingType } = filter;

  const [price, setPrice] = useState<Range>({
    min: state.price.min,
    max: state.price.max
  });

  const params: RoomUrlParams = qs.parse(location.search!);

  const updateLocation = () => {
    let rateList = star.toString();
    const newParams = updateObject(params, {
      rating: rateList,
      lowest_price: sortPrice === "0" ? null : undefined,
      most_popular: undefined,
      sort_price_day: sortPrice,
      room_type: _.join(roomTypeLocal, ","),
      amenities: _.join(comfortTypeLocal, ",")
    });

    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setFilter",
      roomTypesFilter: roomTypeLocal,
      amenities: comfortTypeLocal,
      ratingLists: [star]
    });

    // history.push(locationTo);
  };

  const applyFilter = () => {
    setOpen(false);
    updateLocation();

    const pushQuery: RoomUrlParams = {
      name: city_id === "" && district_id === "" ? searchText : searchText,
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

  useEffect(() => {
    if (roomTypes.length === 0) loadFilter(dispatch);
    if (params.sort_price_day === "0") setSortPrice("0");
    if (ratingLists.length > 0) setStar(ratingLists[0]);
  }, []);

  usePriceEffect(price, setPrice, state);

  const handleClose = () => {
    setOpenSearch(false);
  };

  // const suggestEvent = (value: string, cb: (result: any[]) => void) => {
  //   if (!value) cb([]);
  //   searchSuggest(value)
  //     .then(data => {
  //       cb(data);
  //       setSearchData(data);
  //     })
  //     .catch(err => {
  //       if (!axiosBase.isCancel(err)) {
  //         cb([
  //           {
  //             error: "Có lỗi xảy ra. Vui lòng thử lại"
  //           }
  //         ]);
  //       }
  //     });
  // };

  const searchEvent = () => {
    searchSuggest(searchText)
      .then(data => {
        setSearchData(data);
      })
      .catch(err => {
        if (!axiosBase.isCancel(err)) {
        }
      });
  };

  const onSearch = (value: string, meta: InputActionMeta) => {
    let { action } = meta;

    if (action === "menu-close" || action === "input-blur") return;

    setSearchText(value);
    return value;
  };

  const optionSearchLabel = (option: SearchSuggestRes) => option.name;

  useEffect(() => {
    searchSuggest(searchText)
      .then(data => {
        setSearchData(data);
      })
      .catch(err => {
        if (!axiosBase.isCancel(err)) {
        }
      });
  }, [searchText]);

  const setSearchValue = (value: SearchSuggestRes | any) => {

    if (value.type === 1) {
      setCityId(value.id);
      updateSearchCity(value.id);
      updateSearchDistrict(undefined);
      updateSearchText(value.name);
      setDistrictId("");
      setSearchText(value.name);
    } else if (value.type === 2) {
      setDistrictId(value.id);
      updateSearchDistrict(value.id);
      updateSearchCity(undefined);
      setCityId("");
      updateSearchText(value.name);
      setSearchText(value.name);
    } else if (value.type === 3) {
      setDistrictId("");
      setCityId("");
      updateSearchDistrict(undefined);
      updateSearchCity(undefined);
      setCustomTextSearch(value.name);
    }
  };

  const setCustomTextSearch = (value: any) => {
    updateSearchText(value);
    setSearchText(value);
  };
  const clickAwaySearchSuggest = () => {
    setCustomTextSearch(searchText);

    // setMenuOpen(false);
  };

  return (
    <Fragment>
      <DialogTitle disableTypography>
        {/* <Typography variant="h6" className={classes.center}>
          Tìm kiếm
        </Typography> */}
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container spacing={16} style={{ marginTop: "5px" }}>
          <ClickAwayListener onClickAway={clickAwaySearchSuggest}>
            <Grid item md={12} xs={12} className={classes.boxSearch}>
              {/* <Paper
              onClick={() => setOpenSearch(true)}
              className={classes.paperSearch}
            >
              <InputBase
                readOnly
                placeholder="Bạn muốn tới đâu?"
                value={filter.searchText}
              />
              <IconButton aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>

            <Modal
              // fullScreen
              open={openSearch}
              onClose={handleClose}
              // aria-labelledby="form-dialog-title"
              // TransitionComponent={TransitionCustom}
            >
              <FilterCityMobile open={openSearch} setOpen={setOpenSearch} />
            </Modal> */}
              <SelectSearch
                defaultInputValue={searchText}
                autoFocus={false}
                name="search-bar"
                components={{
                  Option: MenuItemSelectWithIcon
                }}
                options={searchData}
                getOptionLabel={optionSearchLabel}
                getOptionValue={optionSearchLabel}
                inputValue={searchText}
                value={searchText}
                onInputChange={onSearch}
                placeholder="Bạn muốn tới đâu?"
                className={classes.inputSearch}
                onFocus={searchEvent}
                onChange={setSearchValue}
                styles={searchStylesHome}
              />
            </Grid>
          </ClickAwayListener>

          <Grid item md={12} xs={12}>
            <Paper elevation={0} className={classes.paperSizeDatePicker}>
              <Hidden smUp>
                <DatePickerHomeXsOnly />
              </Hidden>
            </Paper>
          </Grid>

          <Grid item md={10} sm={12} xs={12} style={{ marginTop: 10 }}>
            {/* <Collapse in={openGuestSelect}> */}
            <GuestSelect />
            {/* </Collapse> */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={applyFilter}
          classes={{
            root: classes.apply
          }}
        >
          Tìm kiếm
        </Button>
      </DialogActions>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateSearchText: (inputSearch: string) => {
      dispatch({
        type: "SET_SEARCH_TEXT",
        searchText: inputSearch
      });
    },
    updateSearchCity: (city_id: number | undefined) => {
      dispatch({
        type: "SET_SEARCH_CITY",
        city_id: city_id
      });
    },
    updateSearchDistrict: (district_id: number | undefined) => {
      dispatch({
        type: "SET_SEARCH_DISTRICT",
        district_id: district_id
      });
    }
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  memo
)(ChangeFilterMobile);
