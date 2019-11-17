import { ThemeCustom } from '@/components/Theme/Theme';
import AppBar from '@material-ui/core/AppBar';
import { withStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import React, {
  ChangeEvent,
  ComponentType,
  Fragment,
  useState,
  useContext,
  useEffect,
  memo
} from 'react';
import { compose } from 'recompose';
import SearchIcon from '@material-ui/icons/Search';
import PlaceRounded from '@material-ui/icons/PinDropOutlined';
import Grid from '@material-ui/core/Grid';
import GridContainer from '@/layouts/Grid/Container';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import appC from '@/styles/App.module.scss';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loadable from 'react-loadable';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-NavSearch.scss';
import MenuItemSelectWithIcon from '@/components/Custom/MenuItemSelectWithIcon';
import AsyncSelect from 'react-select/lib/Async';
import SelectSearch from 'react-select';
import { StylesConfig } from 'react-select/lib/styles';
import { SearchSuggestRes } from '@/types/Requests/Search/SearchResponse';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { ReducersType } from '@/store/reducers';
import { connect } from 'react-redux';
import {
  SearchFilterState,
  SearchFilterAction
} from '@/store/reducers/searchFilter';
import { newRoomLocation } from '@/store/context/Room/RoomIndexContext';
import Orange from '@material-ui/core/colors/orange';
import { Dispatch } from 'redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AutoSuggestSearch from "@/components/Utils/AutosuggestSearch";
import { makeStyles } from '@material-ui/styles';

interface IProps {
  classes?: any;
}

interface LocalProps extends IProps {
  filter: SearchFilterState;
  updateBookingType(type: number): void;
  updateGuestsCount(type: number): void;
}

const DatePicker = Loadable({
  loader: (): Promise<any> => import('@/components/Utils/DateRange'),
  loading: () => null
});

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    barSearch: {
      backgroundColor: '#455A64',
      zIndex: 10
    },
    inputSearch: {
      width: '85%',
      border: 'none',
      fontWeight: 300,
      outline: 'none',
      backgroundColor: 'transparent'
    },
    paperSize: {
      height: 40,
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center'
    },
    formControl: {
      height: 40,
      width: '100%',
      borderRadius: 4,
      backgroundColor: '#ffffff'
    },
    inputOutline: {
      border: 'none'
    },
    btSearch: {
      height: '100%',
      minWidth: '100%',
      color: '#FFFFFF',
    },
    dayHour: {
      fontSize: '1rem'
    },
    searchIcon: {
      fontSize: '28px',
      width: '28px',
      height: '28px'
    },
    toolbar: {
      [theme.breakpoints.up('md')]: {
        padding: 0,
        minHeight: 50
      },
      [theme.breakpoints.only('sm')]: {
        paddingLeft: 32,
        paddingRight: 32,
        minHeight: 48
      }
    }
  })
);

const searchStylesHome: StylesConfig = {
  control: styles => ({
    ...styles,
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer'
  }),
  container: styles => ({
    ...styles,
    padding: 0
  }),
  indicatorSeparator: styles => ({
    display: 'none'
  }),
  valueContainer: styles => ({
    ...styles,
    padding: 0
  }),
  placeholder: styles => ({
    ...styles,
    color: '#BDBDBD',
    fontWeight: 400
  }),
  menu: styles => ({
    ...styles,
    width: 'calc(100% + 15vw)',
    left: '-5vw'
  })
};

// @ts-ignore
const NavSearch: ComponentType<IProps> = (props: LocalProps) => {
  const {
    classes,
    filter,
    updateBookingType,
    updateGuestsCount,
  } = props;

  const [searchText, setSearchText] = useState<string>(filter!.searchText);
  const [city_id, setCityId] = useState<any>(filter!.district_id);
  const [district_id, setDistrictId] = useState<any>(filter!.district_id);
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const [isOpen, setMenuOpen] = useState<boolean>(false);


  const handleChange = () => (event: ChangeEvent<HTMLInputElement>) => {
    updateBookingType(parseInt(event.target.value));
  };


  const setGuestCountValue = () => (event: ChangeEvent<HTMLInputElement>) => {
    updateGuestsCount(parseInt(event.target.value));
  };

  const onButtonSearchClick = () => {
    // console.log(city_id === "", district_id === "", searchText);
    const pushQuery: RoomUrlParams = {
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : '',
      name: ((city_id === "" && district_id === "") || (city_id == undefined && district_id == undefined)) ? searchText : '',
      number_of_rooms: filter.roomsCount,
      check_in: filter.startDate,
      check_out: filter.endDate,
      number_of_guests: filter.guestsCount,
      most_popular: null,
      rent_type: filter.bookingType !== 0 ? filter.bookingType : undefined
    };

    const location = newRoomLocation(pushQuery);
    history.push(location);
  };



  return (
    <Fragment>
      <AppBar
        position="sticky"
        elevation={0}
        classes={{ root: classes.barSearch }}
      >
        <Toolbar
          classes={{
            root: classes.toolbar
          }}
        >
          <GridContainer xs={12} sm={12} md={11} lg={10} xl={9}>
            <Grid container spacing={1}>
              <Grid item xs={3} sm={3} md={4}>
                <Paper
                  elevation={4}
                  className={classes.paperSize}
                  onClick={() => setMenuOpen(!isOpen)}
                >
                  <AutoSuggestSearch
                    isNav={true}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setCityId={setCityId}
                    setDistrictId={setDistrictId} />
                </Paper>
              </Grid>
              <Grid item container xs spacing={1}>
                <Grid item xs={6} sm={6} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      displayEmpty
                      value={filter.bookingType}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          notched={false}
                          labelWidth={0}
                          name="time"
                          id="outlined-time-simple"
                          classes={{ notchedOutline: classes.inputOutline }}
                          style={{ height: '100%' }}
                        />
                      }
                    >
                      <MenuItem value={2}>
                        <Typography className={classes.dayHour}>
                          Theo ngày
                        </Typography>
                      </MenuItem>
                      <MenuItem value={1}>Theo giờ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      displayEmpty
                      value={filter.guestsCount}
                      onChange={setGuestCountValue}
                      input={
                        <OutlinedInput
                          notched={false}
                          labelWidth={0}
                          name="time"
                          id="outlined-time-simple"
                          classes={{ notchedOutline: classes.inputOutline }}
                          style={{ height: '100%' }}
                        />
                      }
                    >
                      <MenuItem value={1}>1 khách</MenuItem>
                      <MenuItem value={2}>2 khách</MenuItem>
                      <MenuItem value={3}>3 khách</MenuItem>
                      <MenuItem value={4}>4 khách</MenuItem>
                      <MenuItem value={5}>5 khách</MenuItem>
                      <MenuItem value={6}>6 khách</MenuItem>
                      <MenuItem value={7}>7 khách</MenuItem>
                      <MenuItem value={8}>8 khách</MenuItem>
                      <MenuItem value={9}>9 khách</MenuItem>
                      <MenuItem value={10}>10+ khách</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={5} sm={5} md={4}>
                <Paper elevation={4} className={classes.paperSize}>
                  <DatePicker />
                </Paper>
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <Button
                  name="search-navbar"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onButtonSearchClick}
                  className={classes.btSearch}
                >
                  <Hidden mdUp>
                    <SearchIcon className={classes.searchIcon} />
                  </Hidden>
                  <Hidden smDown>
                    <SearchIcon className={classes.searchIcon} />
                  </Hidden>
                </Button>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) =>
      dispatch({
        type: 'SET_NAV_BOOKING_TYPE',
        bookingType: type
      }),
    updateGuestsCount: (type: number) =>
      dispatch({
        type: 'SET_NAV_GUESTS',
        guestsCount: type
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  memo
)(NavSearch);
