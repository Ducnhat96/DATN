import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType, useState, useEffect } from 'react';
import { compose } from 'recompose';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import '@/styles/Airbnb/date-picker-homepage.scss';
import '@/styles/date-picker.scss';
import { ReducersType } from '@/store/reducers';
import { Dispatch } from 'redux';
import { SearchFilterAction, SearchFilterState } from '@/store/reducers/searchFilter';
import * as act from '@/store/actions/actionTypes';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';

interface IProps {
  classes?: any
  id: string
  type: 'start' | 'end'
}

interface LocalProps extends IProps {
  filter: SearchFilterState
  changeStartDate(date: string | null): void
  changeEndDate(date: string | null): void
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({});

// @ts-ignore
const SingleDatePicker1: ComponentType<IProps> = (props: LocalProps) => {
  const { classes, id, filter, type, changeStartDate, changeEndDate } = props;
  const isStartDate = type === 'start';
  const { startDate, endDate } = filter;

  const [focus, setFocus] = useState<boolean | null>(false);
  const [init, setInit] = useState<boolean>(false);

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const changeDate = (date: Moment | null) => {
    let dateString = !!date ? date.format(DEFAULT_DATE_TIME_FORMAT) : date;
    if (isStartDate) {
      changeStartDate(dateString);
      changeEndDate(dateString);
    }
  };

  useEffect(() => {
    if (!isStartDate && init) {
      setFocus(true);
    }
  }, [startDate]);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <SingleDatePicker
      date={isStartDate ? sd : ed} // momentPropTypes.momentObj or null
      // onDateChange={date => changeDate(date)} // PropTypes.func.isRequired
      onDateChange={date => console.log(date)} // PropTypes.func.isRequired
      focused={!!focus} // PropTypes.bool
      onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
      id={id} // PropTypes.string.isRequired,
    />
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    // changeStartDate: (date: string | null) => dispatch({
    //   type: act.CHANGE_START_DATE,
    //   value: date,
    // }),
    // changeEndDate: (date: string | null) => dispatch({
    //   type: act.CHANGE_END_DATE,
    //   value: date,
    // }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(SingleDatePicker1);
