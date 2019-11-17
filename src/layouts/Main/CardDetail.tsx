import React, { Fragment, ComponentType, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { windowExist } from "@/index";
import LazyLoad from "react-lazyload";
import { ThemeCustom } from "@/components/Theme/Theme";
import { GridListTileBar, Theme, createStyles, GridListTile } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "0.2em",
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: "100%",
      height: "auto"
    },
    gridListTile: {
      borderRadius: "8px",
      width: "100% !important"
    },
    gridListTileBar: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: "1.3rem"
    },
    titleListTileBar: {
      fontSize: "1.1em"
    },
    subtitleListTileBar: {
      fontSize: "0.8em"
    },
    imageCity: {
      WebkitTransform: "scale(1) ",
      left: "0 ",
      transform: "none",
      WebkitTransition: ".3s ease-in-out",
      transition: ".3s ease-in-out",
      "&:hover": {
        WebkitTransform: "scale(1.2) ",
        transform: "scale(1.2) "
      }
    },
    borRadius: {
      borderRadius: 8,
      cursor: "pointer"
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    }
  })
);

interface IProps {
  classes?: any;
  url: string;
  content: string;
  onClick: any;
}

const CardDetail: ComponentType<IProps> = props => {
  const classes = useStyles(props);
  const { url, content, onClick } = props;

  return (
    <Fragment>
      <div className={classes.root} onClick={onClick}>
        <GridList className={classes.gridList}>
          <GridListTile
            className={classes.gridListTile}
            classes={{ tile: classes.borRadius }}
          >
            <LazyLoad height={0} offset={windowExist ? window.innerHeight : 0}>
              <img
                style={{ width: "100%", minHeight: "210px" }}
                src={url}
                className={classes.imageCity}
                alt={`VN-Homestay - Homestay cho người việt`}
              />
            </LazyLoad>
            <GridListTileBar
              className={classes.gridListTileBar}
              title={content}
              classes={{
                title: classes.titleListTileBar,
                subtitle: classes.subtitleListTileBar,
                root: classes.titleBar
              }}
            />
          </GridListTile>
        </GridList>
      </div>
    </Fragment>
  );
};

export default CardDetail;
