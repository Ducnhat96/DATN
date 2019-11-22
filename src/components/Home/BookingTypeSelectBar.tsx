import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, memo, ChangeEvent, useContext} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';

import Gray from '@material-ui/core/colors/grey';
import {connect} from 'react-redux';
import {ReducersType} from '@/store/reducers';
import {Dispatch} from 'redux';
import _ from 'lodash';
import {SearchFilterAction, DateRange, SearchFilterState} from '@/store/reducers/searchFilter';
import RadioGroup from '@material-ui/core/RadioGroup';
import '@/styles/checkbox_booking_type.scss';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { newRoomLocation } from "@/store/context/Room/RoomIndexContext";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import Button from '@material-ui/core/Button/Button';
import mainColor from '@/styles/constants/colors';

interface IProps {
  classes?: any,
  isBlockStyle?: boolean,
  hasApplyButton?: boolean
}

interface LocalProps extends IProps {
  filter: SearchFilterState
  updateBookingType(type: number): void
}

interface BookingType {
  id: number
  label: string
}

const styles: any = (theme: ThemeCustom) => createStyles({
  blockStyle: {
    display: 'block'
  },
  textCount: {
    color: Gray[600],
  },
  'label-checkbox': {
    border: '1.4px solid',
    borderColor: mainColor.primary,
    boxShadow: 'none'
  },
  
  applyButton: {
    background: "transparent",
    boxShadow: "none",
    color: mainColor.primary,
    fontWeight: 700,
    textTransform: "initial",
    fontSize: "16px",
    padding: "2px 11px"
  }
});

// const bookingTypeList: BookingType[] = [
//   {id: 2, label: 'Đặt theo ngày'},
//   {id: 1, label: 'Đặt theo giờ'},
// ];

// @ts-ignore
const BookingTypeSelectBar: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, filter, updateBookingType, isBlockStyle, hasApplyButton} = props;

  // const [direction, setDirection] = useState(0);
  const {bookingType}             = filter;
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const [city_id, setCityId] = useState('');
  const [district_id, setDistrictId] = useState('');

  // const changeTypeEvent = (num: number) => {
  //   setDirection(num);
  //   let next: number;
  //   switch ([bookingType, num].join(' ')) {
  //     case '1 -1':
  //       next = 2;
  //       break;
  //     case '2 1':
  //       next = 1;
  //       break;

  //     case '1 1':
  //     case '2 -1':
  //     default:
  //       next = bookingType + num;
  //   }
  //   updateBookingType(next);
  // };

  const radioChangeEvent = (e: ChangeEvent<{}>, value: string) => {
    const type = parseInt(value);
    updateBookingType(type);
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

  return (
    <Fragment>
      <Grid container spacing={8} justify="center" alignItems="center">
        
        <Grid container item xs={12} justify="center">

            <RadioGroup
              aria-label="Loại đặt phòng"
              name="gender1"
              className={classes.group}
              style = {{width: "100%"}}
              value={bookingType.toString()}
              onChange={radioChangeEvent}
            >
              <section className={ isBlockStyle ? classes.blockStyle : undefined}>
                <div>
                  <input
                    type='radio'
                    id='control_01'
                    name='select'
                    value={'2'}
                  />
                  <label className='label-checkbox' htmlFor='control_01'>
                    Theo ngày
                  </label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='control_05'
                    name='select'
                    value={'1'}
                  />
                  <label className='label-checkbox' htmlFor='control_05'>
                    Theo giờ
                  </label>
                </div>
              </section>

            </RadioGroup>
        </Grid>
       
      </Grid>
      {hasApplyButton ? (
        <Button className={classes.applyButton} onClick={applyFilter}>
          Áp dụng
        </Button>
      ) : (
        ""
      )}
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
    updateBookingType: (type: number) => dispatch({
      type: 'SET_BOOKING_TYPE',
      bookingType: type,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  memo,
)(BookingTypeSelectBar);
