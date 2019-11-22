import * as act from '@/store/actions/actionTypes';
import { ReducersType } from '@/store/reducers';
import { SearchFilterState, SearchFilterAction, DateRange } from '@/store/reducers/searchFilter';
import moment, { Moment } from 'moment';
import React, { useState, useEffect, ComponentType, Fragment, useContext } from 'react';
import { FocusedInputShape, DayPickerRangeController } from 'react-dates';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import 'react-dates/initialize';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-homepage.scss';
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { ThemeCustom } from '../Theme/Theme';
import Button from "@material-ui/core/Button/Button";
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { newRoomLocation } from '@/store/context/Room/RoomIndexContext';
import { GlobalContext, IGlobalContext } from '@/store/context/GlobalContext';


interface IProps {
  classes?: any;
  filter: SearchFilterState

  updateDate(date: DateRange): any
}


const styles: any = (theme: ThemeCustom) =>
  createStyles({
    applyButton: {
      background: 'transparent',
      boxShadow: 'none',
      color: '#248489',
      fontWeight: 700,
      textTransform: 'initial',
      fontSize: '16px',
      padding: '2px 11px'
    }
  });

const DateRangeController: ComponentType<IProps> = (props: IProps) => {
  const { filter, updateDate, classes } = props;

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape>('startDate');
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const [city_id, setCityId] = useState('');
  const [district_id, setDistrictId] = useState('');

  const { startDate, endDate } = filter;

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    if (focusedInput === 'startDate') {
      endDate = null
    }
    updateDate({ startDate, endDate });
  };


  const applyFilter = () => {
    const pushQuery: RoomUrlParams = {
      number_of_rooms: filter.roomsCount,
      check_in: filter.startDate,
      check_out: filter.endDate,
      number_of_guests: filter.guestsCount,
      most_popular: null,
      rent_type: filter.bookingType !== 0 ? filter.bookingType : undefined,
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : ''

    };
    const location = newRoomLocation(pushQuery);
    history.push(location);
  }


  useEffect(() => {
    let checkFilter = !filter.startDate && !filter.endDate;
    let oldDate = moment(filter.startDate) < moment();

    if (checkFilter || oldDate) {
      updateDate({
        startDate: moment(),
        endDate: moment().add(7, 'days'),
      });
    }

  }, []);

  return (
    <Fragment>
      {(
        <DayPickerRangeController
          startDate={sd}
          endDate={ed}
          onDatesChange={({ startDate, endDate }) => {
            // onDateChange(startDate, endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(!!focusedInput ? focusedInput : 'startDate');
          }}
          orientation='horizontal'
          numberOfMonths={2}
          verticalHeight={400}
          noBorder
          initialVisibleMonth={() => moment()}
        />
      )}
      <Button className={classes.applyButton} onClick={applyFilter}>
        Áp dụng
          </Button>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateDate: (date: DateRange) => dispatch({
      type: act.CHANGE_DATE,
      date: date,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DateRangeController);
