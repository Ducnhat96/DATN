import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useContext, useState} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import Toolbar from '@material-ui/core/Toolbar';
import GridContainer from '@/layouts/Grid/Container';
import {AppBar} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import Hidden from '@material-ui/core/Hidden';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import {formatMoney} from '@/utils/mixins';

interface IProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  toolBar: {
    padding: '0 13px'
  },
  container: {
    alignItems: 'center'
  },
  barSearch: {
    bottom: 0,
    top: 'unset',
    boxShadow: '0px 5px 5px 7px rgba(0,0,0,0.2)',
  },
  price: {
    fontSize: '0.9rem',
    fontWeight: 700,
    [theme!.breakpoints!.down!('sm')]: {
      fontSize: 16,
    },
  },
  perTime: {
    display: 'block',
    fontSize: 13,
    [theme!.breakpoints!.down!('sm')]: {
      fontSize: 12,
    },
  },
  dialogTitle: {
    textAlign: 'right',
    padding: 0,
  },
  dialogContent: {
    padding: 0,
  },
  btBook: {
    fontWeight: 700,
    color: 'white',
    background: '#248489',
    width: '100%',
    textTransformt: 'none',
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 13,
    },
  },
});
const Transition  = (props: any) => {
  return <Slide direction = 'up' {...props} />;
};

const NavBottomBook: ComponentType<IProps> = (props: IProps) => {
  const {classes}                   = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {width}                     = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const { room } = state;

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Fragment>
      <AppBar position = 'fixed' color = 'inherit' classes = {{root: classes.barSearch}}>
        <Toolbar classes ={{root: classes.toolBar}}>
          <GridContainer xs = {12} sm = {12} md = {11} lg = {10}>
            <Grid container spacing = {0} className = {classes.container}>
              <Grid item xs = {8} sm = {9}>
                <Grid container>
                  <Grid item xs = {6} sm = {3}>
                    <div>
                      <span className={classes.price}>{formatMoney(room!.price_day)}<sub></sub></span>
                      <sub className = {classes.perTime}>&#8363;/đêm</sub>
                    </div>
                  </Grid>
                  {/* <Hidden xsDown> */}
                    { (room && room!.rent_type != 2) ?
                    <Grid item xs = {6} sm = {3}>
                      <div>
                        <span className={classes.price}>{formatMoney(room!.price_hour)}<sub></sub></span>
                        <sub className = {classes.perTime}>&#8363;/4 giờ</sub>
                      </div>
                    </Grid> : ''}
                  {/* </Hidden> */}
                </Grid>
              </Grid>
              <Grid item xs = {4} sm = {3} >
                <Button color = {'primary'} onClick = {handleClick} className = {classes.btBook}>
                  Đặt phòng
                </Button>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>

      <Dialog
        aria-labelledby = 'customized-dialog-title'
        TransitionComponent = {Transition}
        keepMounted
        scroll = 'body'
        fullScreen = {width === 'xs'}
        maxWidth = 'xs'
        open = {openDialog}
        onClose = {handleClick}
      >
        <DialogTitle classes = {{root: classes.dialogTitle}}>
          <IconButton className = {classes.button} aria-label = 'Close' onClick = {handleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes = {{root: classes.dialogContent}}>
          <BoxBooking />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(NavBottomBook);
