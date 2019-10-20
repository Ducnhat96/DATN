import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useState, useEffect, memo, ChangeEvent} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import InputRange, {Range} from 'react-input-range';
import {
  MIN_PRICE,
  MAX_PRICE,
  RoomIndexContext,
  IRoomIndexContext,
  STEP_PRICE,
  loadFilter,
  newRoomLocation,
} from '@/store/context/Room/RoomIndexContext';
import {usePriceEffect, priceFilterChange} from '@/components/Rooms/PriceRange';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {TAB_LIST} from '@/views/Rooms/BottomNav';
import StarRatings from 'react-star-ratings';
import {updateObject} from '@/store/utility';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import SearchProperty from '@/components/Rooms/SearchProperty';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import {ComfortIndexRes} from '@/types/Requests/Comforts/ComfortResponses';
import Paper from '@material-ui/core/Paper/Paper';
import Grey from '@material-ui/core/colors/grey';
import Blue from '@material-ui/core/colors/blue';
import {TypeSelect} from '@/types/Requests/ResponseTemplate';
import {useExpandableList} from '@/store/hooks/filterHooks';
import {arrayFilterCheckBoxEvent} from '@/utils/mixins';
import {TrendingDown, TrendingUp} from '@material-ui/icons';
import {FormControl} from '@material-ui/core';
import {RadioGroup, Radio} from '@material-ui/core';

interface IProps {
  classes?: any
  setIndex(value: number): void
}

const styles: any = (theme: ThemeCustom) => createStyles({
  sortMargin: {
    marginTop: 12,
  },
  ul: {
    listStyleType: 'none',
    marginBlockStart: '0px',
    paddingInlineStart: '0.4rem',
    paddingBlockStart: '0.5rem',
    marginBlockEnd: 0,
  },
  checkboxRoot: {
    padding: 5,
  },
  buttonHeight: {
    height: '100%',
  },
  center: {
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dialog: {
    [theme!.breakpoints!.only!('xs')]: {
      padding: '0 20px',
    },
  },
  apply: {
    width: '100%',
  },
  showMore: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: Grey[200],
    color: Blue[400],
  },
  title: {
    fontWeight: 700,
  },
});

// @ts-ignore
const FilterDrawerM: ComponentType<IProps> = (props: IProps) => {
  const {classes, setIndex} = props;

  const {location, history} = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}   = useContext<IRoomIndexContext>(RoomIndexContext);

  const {ratingLists, roomTypes, comforts, amenities, roomTypesFilter} = state;

  const [star, setStar]                     = useState<number>(5);
  const [roomTypeLocal, setRoomTypeLocal]   = useState<number[]>(roomTypesFilter);
  const [comfortTypeLocal, setComfortLocal] = useState<number[]>(amenities);
  const [sortPrice, setSortPrice]           = useState<string>('1');

  const [price, setPrice] = useState<Range>({
    min: state.price.min,
    max: state.price.max,
  });

  const [comfortChunks, isComfortExpand, setComfortExpand]    = useExpandableList<ComfortIndexRes>(comforts);
  const [roomTypeChunks, isRoomTypeExpand, setRoomTypeExpand] = useExpandableList<TypeSelect>(roomTypes);

  const params: RoomUrlParams = qs.parse(location.search!);

  const updateLocation = () => {
    let rateList    = star.toString();
    const newParams = updateObject(params, {
      rating: rateList,
      lowest_price: sortPrice === '0' ? null : undefined,
      most_popular: undefined,
      sort_price_day: sortPrice,
      room_type: _.join(roomTypeLocal, ','),
      amenities: _.join(comfortTypeLocal, ','),
    });

    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: 'setFilter',
      roomTypesFilter: roomTypeLocal,
      amenities: comfortTypeLocal,
      ratingLists: [star],
    });

    history.push(locationTo);
  };

  const applyFilter = () => {
    setIndex(TAB_LIST);
    priceFilterChange(price, location, history, dispatch);
    updateLocation();
  };

  const changeRating    = (rate: number) => {
    setStar(rate);
  };
  const changeSortPrice = (e: ChangeEvent<{}>, value: string) => {
    setSortPrice(value);
  };

  const comfortEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let listComforts = arrayFilterCheckBoxEvent(comfortTypeLocal, e, checked);
    listComforts     = _.sortBy(listComforts);

    setComfortLocal(listComforts)
  };

  const roomTypeEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let roomTypeLists = arrayFilterCheckBoxEvent(roomTypeLocal, e, checked);
    roomTypeLists     = _.sortBy(roomTypeLists);

    setRoomTypeLocal(roomTypeLists)
  };

  useEffect(() => {
    if (roomTypes.length === 0) loadFilter(dispatch);
    if (params.sort_price_day === '0') setSortPrice('0');
    if (ratingLists.length > 0) setStar(ratingLists[0]);
  }, []);

  usePriceEffect(price, setPrice, state);

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <Typography variant = 'h6' className = {classes.center}>Bộ lọc phòng</Typography>
        <IconButton
          className = {classes.closeButton}
          onClick = {() => setIndex(TAB_LIST)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className = {classes.dialog}>
        <Grid item xs = {12} container className = {classes.sortMargin} spacing = {0}>
          <Grid item xs = {12} container spacing = {8}>
            <SearchProperty />
          </Grid>
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Đánh giá</Typography>
            <StarRatings
              numberOfStars = {5}
              rating = {star}
              changeRating = {changeRating}
              starDimension = {'2rem'}
              starRatedColor = '#FFC412'
              starHoverColor = '#FFC412'
            />
          </Grid>
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Sắp xếp giá</Typography>
            <FormControl>
              <RadioGroup
                onChange = {changeSortPrice}
                name = 'like'
                value = {sortPrice.toString()}
                classes = {
                  {
                    root: classes.radio,
                  }
                }
              >
                <FormControlLabel value = '1' control = {<Radio
                  checkedIcon = {<TrendingDown color = 'error' />} />} label = 'Từ cao đến thấp' />
                <FormControlLabel value = '0' control = {<Radio
                  checkedIcon = {<TrendingUp color = 'error' />} />} label = 'Từ thấp đến cao' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Khoảng giá</Typography><br />
            <InputRange
              allowSameValues = {false}
              minValue = {MIN_PRICE}
              maxValue = {MAX_PRICE}
              step = {STEP_PRICE}
              onChange = {(value: any) => setPrice(value)}
              value = {price} />
            <Typography variant = 'subtitle2'>{`đ ${price.min} - đ ${price.max}`}</Typography>
          </Grid>
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Loại phòng</Typography>
            {roomTypes.length > 0 ? (
              <Fragment>
                <ul className = {classes.ul}>
                  {_.map(roomTypeChunks, (o) => (
                    <li key = {o.id}>
                      <FormControlLabel
                        control = {<Checkbox
                          name = {o.id.toString()}
                          color = 'primary'
                          onChange = {roomTypeEvent}
                          value = {o.id.toString()}
                          checked = {_.indexOf(roomTypeLocal, o.id) !== -1}
                          classes = {{
                            root: classes.checkboxRoot,
                          }}
                        />}
                        label = {o.value}
                      />
                    </li>
                  ))}
                </ul>
                <Paper
                  elevation = {0} className = {classes.showMore}
                  onClick = {() => setRoomTypeExpand(!isRoomTypeExpand)}
                >
                  {isRoomTypeExpand ? 'Thu gọn' : 'Mở rộng'}
                </Paper>
              </Fragment>
            ) : ''}
          </Grid>
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2' className = {classes.title}>Tiện nghi phòng</Typography>
            {comfortChunks.length > 0 ? (
              <Fragment>
                <ul className = {classes.ul}>
                  {_.map(comfortChunks, (o) => (
                    <li key = {o.comfort_id}>
                      <FormControlLabel
                        control = {<Checkbox
                          name = {o.comfort_id.toString()}
                          color = 'primary'
                          onChange = {comfortEvent}
                          value = {o.comfort_id.toString()}
                          checked = {_.indexOf(comfortTypeLocal, o.comfort_id) !== -1}
                          classes = {{
                            root: classes.checkboxRoot,
                          }}
                        />}
                        label = {`${o.name_comfort} (${o.total_rooms})`}
                      />
                    </li>
                  ))}
                </ul>
                <Paper
                  elevation = {0} className = {classes.showMore}
                  onClick = {() => setComfortExpand(!isComfortExpand)}
                >
                  {isComfortExpand ? 'Thu gọn' : 'Mở rộng'}
                </Paper>
              </Fragment>
            ) : ''}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color = 'primary' variant = 'contained' onClick = {applyFilter} classes = {{
          root: classes.apply,
        }}>
          Lọc kết quả
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(FilterDrawerM);