import { Theme } from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { createStyles, makeStyles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { FC } from "react";
import { compose } from "recompose";

const checkTypeBackground = (value: string[] | string): string => {
  if (typeof value !== "string") {
    return `linear-gradient(to right, ${value.join(",")})`;
  } else {
    return value;
  }
};

const styles: any = () =>
  createStyles({
    root: {
      background: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% );`,
      borderRadius: 4,
      fontWeight: 600,
      fontSize: "16px",
      color: "white",
      height: "45px",
      width: "auto",
      padding: "0px 20px"
    }
  });

interface IProps extends ButtonProps {
  height?: string | number;
  background?: string[] | string;
  width?: string | number;
  fontSize?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  textColor?: string;
  classes?: any;
}

const ButtonGlobal: FC<IProps> = props => {
  const {
    classes,
    color,
    disabled,
    disableRipple,
    disableFocusRipple,
    fullWidth,
    href,
    size,
    variant,
    onClick,
    style,
    type
  } = props;

  return (
    <Button
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      disableFocusRipple={disableFocusRipple}
      fullWidth={fullWidth}
      href={href}
      size={size}
      variant={variant}
      onClick={onClick}
      style={style}
      type={type}
      className={classNames(classes.root, "buttonGlobal", props.className)}
    >
      {props.children}
    </Button>
  );
};
export default compose<IProps, any>(withStyles(styles))(ButtonGlobal);
