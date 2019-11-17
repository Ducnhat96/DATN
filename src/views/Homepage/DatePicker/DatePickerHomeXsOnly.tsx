import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import {ReducersType} from '@/store/reducers';
import {connect} from 'react-redux';
import {SearchFilterState} from '@/store/reducers/searchFilter';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog/Dialog';
import {TransitionCustom} from '@/views/Rooms/BottomNav';
import DateControllerXsOnly from '@/views/Homepage/DatePicker/DateControllerXsOnly';

interface IProps {
  classes?: any
}

interface LocalProps extends IProps {
  filter: SearchFilterState
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  root: {
    height: '100%',
    zIndex: 9
  },
  input: {
    width: '100%',
    textAlign: 'center',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
  },
});

// @ts-ignore
const DatePickerHomeXsOnly: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, filter}    = props;
  const {startDate, endDate} = filter;

  const [open, setOpen] = useState<boolean>(false);

  const sd = moment(startDate).format('DD/MM/YYYY');
  const ed = moment(endDate).format('DD/MM/YYYY');

  return (
    <Fragment>
      <Grid container spacing = {8} justify = 'center' alignItems = 'center' className = {classes.root}
            onClick = {() => setOpen(true)}>
        <Grid container item xs = {6} spacing = {8}>
          <Grid container item xs = {12} justify = 'center'>
            <Typography variant = 'caption' style = {{lineHeight: 1}}>Ngày nhận</Typography>
          </Grid>
          <Grid container item xs = {12} justify = 'center'>
            <input
              placeholder = 'DD/MM/YYYY'
              readOnly
              style = {{backgroundColor: '#fff'}}
              value = {sd}
              className = {classes.input} />
          </Grid>
        </Grid>
        <Grid container item xs = {6} spacing = {8}>
          <Grid container item xs = {12} justify = 'center'>
            <Typography variant = 'caption' style = {{lineHeight: 1}}>Ngày trả</Typography>
          </Grid>
          <Grid container item xs = {12} justify = 'center'>
            <input
              placeholder = 'DD/MM/YYYY'
              readOnly
              style = {{backgroundColor: '#fff'}}
              value = {ed}
              className = {classes.input} />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        TransitionComponent = {TransitionCustom}
        scroll = 'paper'
        open = {open}
        onClose = {() => setOpen(false)}
      >
        <DateControllerXsOnly setOpen = {setOpen} />
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps),
  withStyles(styles),
)(DatePickerHomeXsOnly);
