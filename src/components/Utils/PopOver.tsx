import { ThemeCustom } from "@/components/Theme/Theme";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState
} from "react";

import Button from "@material-ui/core/Button";

import Popover from "@material-ui/core/Popover";

interface IProps {
  children?: any;
  classes?: any;
  title?: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => ({
  paper: {
    padding: '15px'
  },
  lightTooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  },
  grow: {
    flexGrow: 1
  },
  button: {
    border: "1px solid #F2F2F2",
    textTransform: "initial",
    boxShadow: 'none',
    background: 'transparent',
    marginRight: '13px',
    "&:active": {
      background: '#F2F2F2'
    }
  }
});

const PopOver: ComponentType<IProps> = (props: IProps) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const { classes, title, children } = props;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <Button
        aria-owns={open ? "simple-popper" : undefined}
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        className={classes.button}
      >
        {title}
      </Button>
      <Popover
        classes={{
          paper: classes.paper
        }}
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {children}
      </Popover>
    </span>
  );
};

export default withStyles(styles)(PopOver);
