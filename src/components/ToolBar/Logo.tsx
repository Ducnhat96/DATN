import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ComponentType } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo-main.svg';
interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  img: {
    [theme!.breakpoints!.up!('md')]: {
      height: 45,
    },
    [theme!.breakpoints!.down!('sm')]: {
      height: 30,
    },
  },
});

// @ts-ignore
const Logo: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;

  return (
    <Link to='/'>
      <img src={logo} className={classes.img} alt='Logo' />
    </Link>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Logo);
