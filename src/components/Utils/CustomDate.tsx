import * as act from "@/store/actions/actionTypes";
import { ReducersType } from "@/store/reducers";
import {
  SearchFilterState,
  SearchFilterAction,
  DateRange
} from "@/store/reducers/searchFilter";
import moment, { Moment } from "moment";
import React, { useState, useEffect, ComponentType, Fragment } from "react";
import { FocusedInputShape, DayPickerRangeController } from "react-dates";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import "react-dates/initialize";
import "@/styles/date-picker.scss";
import "@/styles/Airbnb/date-picker-homepage.scss";

interface IProps {
  filter: SearchFilterState;

  updateDate(date: DateRange): any;
}

const DateRangePK: ComponentType<any> = (props: any) => {
  const { filter, updateDate } = props;

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape>(
    "startDate"
  );

  const { startDate, endDate } = filter;

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    if (focusedInput === "startDate") {
      endDate = null;
    }
    updateDate({ startDate, endDate });
  };

  useEffect(() => {
    let checkFilter = !filter.startDate && !filter.endDate;
    let oldDate = moment(filter.startDate) < moment();

    if (checkFilter || oldDate) {
      updateDate({
        startDate: moment(),
        endDate: moment().add(7, "days")
      });
    }
  }, []);

  const isOutSideRange = (day: Moment) => day.diff(moment(), "days") < 0;

  return (
    <Fragment>
      {
        <DayPickerRangeController
          startDate={sd}
          endDate={ed}
          onDatesChange={({ startDate, endDate }) => {
            // onDateChange(startDate, endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(!!focusedInput ? focusedInput : "startDate");
          }}
          orientation="verticalScrollable"
          numberOfMonths={3}
          verticalHeight={400}
          isOutsideRange={isOutSideRange}
          noBorder
          initialVisibleMonth={() => moment()}
        />
      }
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
    updateDate: (date: DateRange) =>
      dispatch({
        type: act.CHANGE_DATE,
        date: date
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DateRangePK);
