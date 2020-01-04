import * as act from "@/store/actions/actionTypes";
import { ReducersType } from "@/store/reducers";
import { BookingAction, DateRange } from "@/store/reducers/booking";
import React, { ComponentType, useContext } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { SearchFilterState } from "@/store/reducers/searchFilter";
import { useDatePickerHook } from "@/components/Utils/DatePickerRoomDetail";
import {
  IRoomDetailsContext,
  RoomDetailsContext
} from "@/store/context/Room/RoomDetailsContext";

interface IProps {
  minNights?: number;
}

interface LocalProps extends IProps {
  filter: SearchFilterState;
  updateDate(date: DateRange): any;
}

// @ts-ignore
const DateRangeSingle: ComponentType<IProps> = (props: LocalProps) => {
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {
    setFocusedInput,
    onDateChange,
    sd,
    ed,
    focusedInput,
    blockingDate,
    isOutSideRange
  } = useDatePickerHook(props, state, null);

  return (
    <DateRangePicker
      numberOfMonths={1}
      startDateId="startDate"
      endDateId="endDate"
      startDate={sd}
      endDate={ed}
      onDatesChange={({ startDate, endDate }) => {
        onDateChange(startDate, endDate);
      }}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => {
        setFocusedInput(focusedInput);
      }}
      isDayBlocked={blockingDate}
      isOutsideRange={isOutSideRange}
      minimumNights={0}
      noBorder={true}
      displayFormat="ddd, DD/MM/YYYY"
      readOnly
    />
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch<BookingAction>) => {
  return {
    updateDate: (date: DateRange) =>
      dispatch({
        type: act.CHANGE_DATE,
        date: date
      })
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps)
)(DateRangeSingle);
