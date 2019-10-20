import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useState,
  useEffect,
  useContext,
  memo
} from "react";
import { compose } from "recompose";
import Fab from "@material-ui/core/Fab/Fab";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom/Zoom";
import { ReactScrollLinkProps } from "react-scroll/modules/components/Link";
import { animateScroll as scroll } from "react-scroll/modules";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    toTop: {
      textTransform: 'inherit',
      position: "fixed",
      zIndex: 9,
      right: theme!.spacing!.unit! * 2,
      bottom: theme!.spacing!.unit! * 12,
      [theme!.breakpoints!.only!("xs")]: {
        left: "35%",
        zIndex: 1,
        bottom: '64px',
        //transform: "translate(-50%, -50%) !important"
      },
      color: "#fff",
      fontSize: "1rem"
    },
    exFab: {
      width: 48,
      height: 48,

    }
  });

// @ts-ignore
const ScrollTopButton: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const [toTop, setToTop] = useState<boolean>(false);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: "easeInOutQuad",
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };

  useEffect(() => {
    const buttonToTop = () => {
      let isOverTop = window.scrollY > window.innerHeight && !toTop;
      if (isOverTop) {
        setToTop(true);
      } else if (!isOverTop) {
        setToTop(false);
      }
    };
    window.addEventListener("scroll", buttonToTop);
    return () => {
      window.removeEventListener("scroll", buttonToTop);
    };
  }, []);

  return (
    <Fragment>
      <Zoom in={toTop}>
        <Fab
          variant="extended"
          className={classes.toTop}
          color="primary"
          onClick={scrollTop}
          size={width === "xs" ? "small" : "large"}
          classes={{ extended: classes.exFab }}
        >
          {width === "xl" || width === "lg" || width === "md" || width === "sm" ? (
            <UpIcon />
          ) : (
              "Lên đầu trang"
            )}
        </Fab>
      </Zoom>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(ScrollTopButton);
