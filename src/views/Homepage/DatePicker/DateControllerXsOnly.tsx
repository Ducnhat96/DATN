import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
// import CustomDate from '@/components/Utils/CustomDate';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import {ReducersType} from '@/store/reducers';
import {connect} from 'react-redux';
import {SearchFilterState} from '@/store/reducers/searchFilter';
import moment, {Moment} from 'moment';

interface IProps {
  classes?: any
  setOpen(status: boolean): void
}

interface LocalProps extends IProps {
  filter: SearchFilterState
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  content: {
    height: '80vh',
    padding: '0 !important',
  },
});

// @ts-ignore
const DateControllerXsOnly: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, setOpen, filter} = props;

  const {startDate, endDate} = filter;

  const sd = moment(startDate);
  const ed = moment(endDate);

  const duration = ed.diff(sd, 'days');

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <IconButton
          className = {classes.closeButton}
          onClick = {() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing = {8}>
          <Grid container item xs = {12} spacing = {24}>
            <Grid item xs = {6}>
              <TextField
                id = 'start-date'
                label = 'Check in'
                value={sd.format('DD/MM/YYYY')}
              />
            </Grid>
            <Grid item xs = {6}>
              <TextField
                id = 'end-date'
                label = 'Check out'
                value={ed.format('DD/MM/YYYY')}
              />
            </Grid>
          </Grid>
          <Grid item xs = {12} className = {classes.content}>
            {/* <CustomDate /> */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant = 'contained'
          color = 'primary'
          fullWidth
          onClick = {() => setOpen(false)}
        >Xác nhận ({`${duration} ${duration > 1 ? 'đêm' : 'đêm'}`})</Button>
      </DialogActions>
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
)(DateControllerXsOnly);
