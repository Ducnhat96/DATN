import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';


interface IProps extends RouteChildrenProps {
  classes?: any,
  onClick?:any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  x:{
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '26%',
    display: 'block',
    width: 20,
    height: 20,
    minWidth:20,
    padding: 0,
    WebkitTransform: 'translate(0, -50%)',
    transform: 'translate(0, -50%)',
    cursor:'pointer',
    color: '#273740',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    right:'-2.5%',
    [theme!.breakpoints!.down!('md')]: {
      right:'-3%',
    },
    '&:hover':{
      background: 'transparent',
    }
  }
});

const NextArrowSlider: ComponentType<IProps> = (props: IProps) => {
  const { classes ,onClick} = props;

  return (
    <Fragment>
      <Button
        className={classes.x}
        onClick={props.onClick}
        disableRipple={true}
      >
        <ArrowForwardIos/>
      </Button>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(NextArrowSlider);
