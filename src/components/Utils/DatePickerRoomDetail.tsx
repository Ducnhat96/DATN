import { ReducersType } from "@/store/reducers";
import { ThemeCustom } from "@/components/Theme/Theme";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import {
  SearchFilterState,
  DateRange,
  SearchFilterAction
} from "@/store/reducers/searchFilter";
import moment, { Moment } from "moment";
import React, {
  useState,
  useEffect,
  ComponentType,
  Fragment,
  useContext,
  memo,
  useMemo,
  Dispatch
} from "react";
import { FocusedInputShape, DayPickerRangeController } from "react-dates";
import { connect } from "react-redux";
import { compose } from "recompose";
import "react-dates/initialize";
import "@/styles/date-picker.scss";
import "@/styles/Airbnb/date-picker-homepage.scss";
import _ from "lodash";
import {
  RoomDetailsContext,
  IRoomDetailsContext,
  RoomDetailsState
} from "@/store/context/Room/RoomDetailsContext";
import Button from "@material-ui/core/Button";
import { DEFAULT_DATE_FORMAT } from "@/utils/store/global";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

interface IProps {
  classes?: any;
  minNights?: number;
  month?: number;
}

interface LocalProps extends IProps {
  filter: SearchFilterState;
  updateDate(date: DateRange): any;
}

export const useDatePickerHook = (
  props: LocalProps,
  state: RoomDetailsState,
  focus: FocusedInputShape | null
) => {
  const { filter, updateDate, minNights } = props;
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | any>(
    focus
  );
  const [maxDate, setMaxDate] = useState<string | undefined>(undefined);
  const [now] = useState<Moment>(moment());

  const { startDate, endDate } = filter;

  const { schedule } = state;

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    if (focusedInput === "startDate") {
      endDate = null;
    }
    updateDate({ startDate, endDate });
  };

  const blockingDate = (day: Moment) => {
    let isBlocked = _.indexOf(schedule, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    let isBookingHour = minNights === 0;

    if (focusedInput === "endDate" && !!sd) {
      let checkOnlyOneDay =
        day.format(DEFAULT_DATE_FORMAT) !== sd.format(DEFAULT_DATE_FORMAT);

      let onlyOneDay = isBookingHour && checkOnlyOneDay;
      let pastDayBlocked = day.diff(sd, "days") < 0;
      let chainBlocked = maxDate
        ? day.diff(moment(maxDate), "days") > 0
        : false;
      return pastDayBlocked || isBlocked || chainBlocked || onlyOneDay;
    }
    return isBlocked;
  };
  const isOutSideRange = (day: Moment) => day.diff(now, "days") < 0;

  useEffect(() => {
    let date = _.find(schedule, block => moment(block).diff(sd!) > 0);

    setMaxDate(date);
  }, [filter]);

  return {
    onDateChange,
    blockingDate,
    sd,
    ed,
    focusedInput,
    setFocusedInput,
    maxDate,
    now,
    isOutSideRange
  };
};

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    rowMargin: {
      margin: "10px 0",
      padding: "12px 10px",
      [theme!.breakpoints!.down!("xs")]: {
        padding: "10px 0px"
      },
      borderTop: "1px solid #e0e0e0"
    },
    titleHighlight: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "1.375em",
      color: "#484848",
      display: "inline-block"
    },
    btClear: {
      float: "right"
    },
    boxCalendar: {
      textAlign: "center",
      justifyContent: "center",
      paddingTop: 20
    },
    paddingXS: {
      [theme!.breakpoints!.down!("xs")]: {
        width: "95%",
        margin: "0 auto",
        overflow: "hidden"
      }
    }
  });

// @ts-ignore
const DatePickerRoomDetail: ComponentType<IProps> = (props: LocalProps) => {
  const { classes, minNights } = props;
  const { state } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const isWide: boolean = useMemo(() => {
    return width === "xl" || width === "lg" || width === "md" || width === "sm";
  }, [width]);

  const {
    setFocusedInput,
    onDateChange,
    sd,
    ed,
    focusedInput,
    blockingDate,
    isOutSideRange
  } = useDatePickerHook(props, state, "startDate");

  return (
    <Fragment>
      <div className={classes.rowMargin}>
        <div className={classes.paddingXS}>
          <Typography className={classes.titleHighlight}>
            Lịch trống phòng
          </Typography>
          {/* <Button
            variant="outlined"
            className={classes.btClear}
            onClick={() => setFocusedInput("startDate")}
          >
            Chọn lại
          </Button> */}
          <div className={classes.boxCalendar}>
            <DayPickerRangeController
              minimumNights={!!minNights ? minNights : 1}
              startDate={sd}
              endDate={ed}
              onDatesChange={({ startDate, endDate }) => {
                // onDateChange(startDate, endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={focusedInput => {
                setFocusedInput(!!focusedInput ? focusedInput : "startDate");
              }}
              numberOfMonths={isWide ? 2 : 1}
              // verticalHeight = {400}
              noBorder
              enableOutsideDays={false}
              isDayBlocked={blockingDate}
              isOutsideRange={isOutSideRange}
              hideKeyboardShortcutsPanel
              initialVisibleMonth={() => moment()}
            />
          </div>
        </div>
      </div>
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
        type: "CHANGE_DATE",
        date: date
      })
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  memo
)(DatePickerRoomDetail);
