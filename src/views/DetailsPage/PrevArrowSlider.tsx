import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


interface IProps extends RouteChildrenProps {
  classes?: any,
  onClick?:any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  arrow:{
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '50%',
    display: 'block',
    width: 40,
    height: 40,
    minWidth:40,
    padding: 0,
    WebkitTransform: 'translate(0, -50%)',
    transform: 'translate(0, -50%)',
    cursor:'pointer',
    color: '#273740',
    border: '1px solid lightgrey',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    outline: 'none',
    background: 'transparent',
    left:'-2.5%',
    zIndex: 100,
    [theme!.breakpoints!.down!('md')]: {
      left:'-5.5%',
    },
    '&:hover':{
      cursor:'pointer',
      background: 'transparent',
    }
  }
});

const NextArrowSlider: ComponentType<IProps> = (props: IProps) => {
  const { classes ,onClick} = props;

  return (
    <Fragment>
      <Button
        className={classes.arrow}
        onClick={props.onClick}
        disableRipple={true}
      >
        <ArrowBackIos/>
      </Button>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(NextArrowSlider);
