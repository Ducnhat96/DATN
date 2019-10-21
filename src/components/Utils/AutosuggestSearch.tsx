import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import VN_vi from "@/assets/vietnam84.png";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import React, {
  ComponentType,
  useContext,
  useMemo,
  useState,
  useEffect,
  memo
} from "react";
import { compose } from "recompose";
import { ReducersType } from "@/store/reducers";
import { ThemeCustom } from "@/components/Theme/Theme";
import { connect } from "react-redux";
import { axios } from "@/utils/axiosInstance";
import { Dispatch } from "redux";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import { RouterProps } from "react-router";
import { withRouter, RouteProps } from "react-router-dom";
import { searchSuggest } from "@/store/context/searchSuggestion";
import {
  SearchSuggestRes,
  IS_SEARCH_CITY,
  IS_SEARCH_DISTRICT,
  IS_SEARCH_ROOM
} from "@/types/Requests/Search/SearchResponse";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import Popular from "@material-ui/icons/WhatshotRounded";
import ErrorBoundary from "react-error-boundary";

interface Iprops extends RouteProps, RouterProps {
  classes?: any;
  searchText: string;
  isNav?: boolean;
  setSearchText(searchText: string): void;
  setCityId(cityId: any): void;
  setDistrictId(districtId: any): void;
  updateSearchText(inputSearch: string): void;
  updateSearchCity(city_id: number | undefined): void;
  updateSearchDistrict(district_id: number | undefined): void;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    container: {
      position: "relative",
      width: "100%"
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 10000,
      left: 0,
      right: 0,
      maxHeight: 192,
      overflowY: "scroll",
      borderTop: "1px solid #EBEBEB",
      paddingTop: 6
    },

    suggestionsContainerOpenNavSearch: {
      position: "absolute",
      zIndex: 1,
      left: 0,
      right: 0,
      top: 46,
      maxHeight: 322,
      overflowY: "scroll",
      borderTop: "1px solid #EBEBEB",
      paddingTop: 5,
      width: "calc(100% + 12vw)"
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
    input: {
      color: "#000"
    },
    marginSearch: {
      marginLeft: 23
    },
    gutters: {
      paddingLeft: 22
    },
    suggestionText: {
      marginLeft: 26,
      fontSize: 14
    },
    searchIcon: {
      width: 23,
      height: 23,
      verticalAlign: "sub"
    },
    paperShadow: {
      boxShadow: "#1a1a1d 0px 9px 26px -14px"
    }
  });

const AutosuggestSearch: ComponentType<Iprops> = (props: Iprops) => {
  const {
    classes,
    searchText,
    setSearchText,
    updateSearchText,
    updateSearchCity,
    updateSearchDistrict,
    setCityId,
    setDistrictId,
    isNav
  } = props;
  const [suggestions, setSuggestions] = useState<any>([]);

  //const [inputValue, setInputValue] = useState<any>(filter.searchText);

  const renderSuggestion = (
    suggestion: SearchSuggestRes,
    { query, isHighlighted }: any
  ) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
    // console.log(parts, matches);
    return (
      <MenuItem
        selected={isHighlighted}
        component="div"
        classes={{ gutters: classes.gutters }}
      >
        <div>
          {suggestion.type === IS_SEARCH_CITY ||
            suggestion.type === IS_SEARCH_DISTRICT ? (
              <HomeIcon className={classes.searchIcon} />
            ) : (
              <LocationIcon className={classes.searchIcon} />
            )}
        </div>
        <div className={classes.suggestionText}>
          {parts.map((part: { text: React.ReactNode; highlight: any }, index) => (
            <span key={index}>{part.text}</span>
              // fontSize="default"
          ))}
        </div>
      </MenuItem>
    );
  };

  const getSuggestionValue = (suggestion: SearchSuggestRes) => {
    setSearchText(suggestion.name);
    return suggestion.name;
  };

  const getSuggestions = (value: any) => {
    searchSuggest(value)
      .then(data => {
        setSuggestions(data);
      })
      .catch(err => console.log(err));
  };
  const handleSuggestionsFetchRequested = ({ value }: { value: any }) => {
    getSuggestions(value);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const onChange = (e: any, { newValue }: { newValue: any }) => {
    setSearchText(newValue);
    updateSearchText(newValue);
  };

  const handleSuggestionSelected = (
    e: any,
    { suggestion, method }: { suggestion: SearchSuggestRes; method: string }
  ) => {
    if (method === "enter") {
      e.preventDefault();
    }

    if (suggestion.type === 1) {
      setCityId(suggestion.id);
      setDistrictId("");
      updateSearchCity(suggestion.id);
      updateSearchDistrict(undefined);
      updateSearchText(suggestion.name);
      setSearchText(suggestion.name);
    } else if (suggestion.type === 2) {
      setDistrictId(suggestion.id);
      setCityId("");
      updateSearchDistrict(suggestion.id);
      updateSearchCity(undefined);
      updateSearchText(suggestion.name);
      setSearchText(suggestion.name);

    } else if (suggestion.type === 3) {
      setDistrictId("");
      setCityId("");
      updateSearchDistrict(undefined);
      updateSearchCity(undefined);
      setSearchText(suggestion.name);
      updateSearchText(suggestion.name);
    }
  };

  const renderInputComponent = (inputProps: any) => {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;
    return (
      <TextField
        fullWidth
        classes={{ marginDense: classes.marginDense }}
        inputProps={{
          className: classes.outlineInput
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                className={classes.marginSearch}
              />
            </InputAdornment>
          ),
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          },
          disableUnderline: true
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
    onSuggestionSelected: handleSuggestionSelected,
    getSuggestionValue,
    renderSuggestion
  };



  return (
    <ErrorBoundary>
      <Autosuggest
        {...autosuggestProps}
        // alwaysRenderSuggestions={true}
        inputProps={{
          classes,
          id: "search-autosuggest-simple",
          placeholder: "Bạn muốn tới đâu?",
          value: searchText,
          onChange
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: isNav ? classes.suggestionsContainerOpenNavSearch : classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper
            {...options.containerProps}
            square
            classes={{ root: classes.paperShadow }}
          >
            {options.children}
          </Paper>
        )}
      />
    </ErrorBoundary>
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

export default compose<Iprops, any>(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  memo
)(AutosuggestSearch);
