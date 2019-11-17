import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { FunctionComponent, memo, useMemo, Fragment } from "react";
import { compose } from "recompose";
import { components } from "react-select";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import Popular from "@material-ui/icons/WhatshotRounded";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { OptionProps } from "react-select/lib/components/Option";
import {
  SearchSuggestRes,
  IS_SEARCH_CITY,
  IS_SEARCH_DISTRICT,
  IS_SEARCH_ROOM
} from "@/types/Requests/Search/SearchResponse";
import classNames from "classnames";
import Hidden from "@material-ui/core/Hidden/Hidden";
//import {Menu, MenuItem } from "react-bootstrap-typeahead";

interface IProps extends OptionProps<any> {
  classes?: any;
  options: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    white: {
      color: "white"
    },
    black: {
      color: "black"
    },
    subTitle: {
      color: "#757575"
    },
    title: {
      marginLeft: 20
    },
    hotLocation: {
      color: "#e53935",
      padding: "4px 8px",
      width: 20,
      height: 20,
      verticalAlign: "middle"
    },
    descriptionChip: {
      border: "1px solid #dde9fd",
      color: "#0664ff",
      borderWidth: "1px",
      borderRadius: 5,
      backgroundColor: "#ffffff",
      padding: "4px 8px",
      fontSize: 12,
      fontWeight: 500
    }
  });

// @ts-ignore
const CitiesMenu: FunctionComponent<IProps> = (props: IProps) => {
  const { classes, options, isSelected } = props;

  return (
    <Fragment>
      <Grid container alignItems="center" justify="center">
        {options.map((option: any, index: any) => 
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            className={classes.grow}
            alignItems="center"
          >
            <Grid item className={classes.title}>
              
            </Grid>
          </Grid>
        )}

        {/* <Hidden smDown>
          <Grid container item xs = {2} sm = {4} md = {4} justify = 'flex-end'>
            <Typography variant = 'subtitle2' className = {
              classNames({
                [classes.white]: isSelected,
              })
            }>
              <span className={classes.descriptionChip}>{info.description}</span>
            </Typography>
          </Grid>
        </Hidden> */}
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(CitiesMenu);
