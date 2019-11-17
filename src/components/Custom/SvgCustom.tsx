import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useEffect} from 'react';
import {compose} from 'recompose';
import wifi from '@/assets/SvgIcon/wifi.svg';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface IProps {
  classes?: any
  iconClass?: string;
  borderClass?: string;
  text?: string;
  name?: string;
  icon?: string
}

interface TextProps {
  classes?: any
  value: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  marker: {
    width: '1rem',
    height: '1rem',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    border: '1px rgba(0,0,0,0.75) solid',
  },
  size: {
    width: 26,
    height: 26,
  },
  circle: {
    borderRadius: '50%',
  },
  textSize: {
    fontSize: '0.6rem',
    fontWeight: 500,
    color: '#767676'
  },
})
);

const Text = (props: TextProps) => {
  const {classes, value} = props;
  return (
    <span className = {classes.textSize}>{value}</span>
  );
};

// @ts-ignore
const SvgCustom: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  const {borderClass, icon} = props;

  return (
    <Fragment>
      <div className = {classNames({
        [classes.border]: !(props.borderClass),
        [borderClass!]: !!(props.borderClass)
      },
        classes.box,
        classes.size,
        classes.border,
        classes.circle,
      )}>
        {!(props.text) ? (
          <img src = {icon} title = {props.name} alt = {props.name} className = {classNames(classes.marker,)} />
        ): <Text value={props.text} classes={classes}/>}
      </div>
    </Fragment>
  );
};

export default SvgCustom;
