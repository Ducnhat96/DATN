import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles, Theme} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/styles';


interface IProps extends RouteChildrenProps {
  classes?: any,
  onClick?:any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  arrow:{
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '50%',
    display: 'block',
    width: 40,
    height: 40,
    minWidth: 40,
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
    right:'-2.5%',
    zIndex: 100,
    [theme.breakpoints.down('md')]: {
      right:'-5%',
    },
    '&:hover':{
      background: 'transparent',
      cursor:'pointer',
    }
  }
})
);

const NextArrowSlider: ComponentType<IProps> = (props: IProps) => {
  const { classes , onClick} = props;

  return (
    <Fragment>
      <Button
        className={classes.arrow}
        onClick={props.onClick}
        disableRipple={true}
      >
        <ArrowForwardIos/>
      </Button>
    </Fragment>
  );
};

export default NextArrowSlider;
