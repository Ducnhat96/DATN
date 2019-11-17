import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { ComponentType } from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo-westay.png";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    img: {
      [theme.breakpoints.up("md")]: {
        height: 45
      },
      [theme.breakpoints.down("sm")]: {
        height: 30
      }
    }
  })
);

// @ts-ignore
const Logo: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);
  return (
    <Link to="/">
      <img src={logo} className={classes.img} alt="Logo" />
    </Link>
  );
};

export default Logo;
