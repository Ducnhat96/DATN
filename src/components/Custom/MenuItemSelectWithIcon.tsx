import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { FunctionComponent, memo, useMemo } from "react";
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

const { Option } = components;

interface IProps extends OptionProps<any> {
  classes?: any;
  data: SearchSuggestRes;
}

interface ItemDetail {
  icon: any;
  description: string;
  name: string;
  hot_txt: string;
  hot: number;
  city: string;
  country: string;
  type: number;
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
      verticalAlign: 'middle'
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

const detailInfo = (data: SearchSuggestRes): ItemDetail => {
  switch (data.type) {
    case IS_SEARCH_CITY:
      return {
        icon: <LocationIcon />,
        description: data.description,
        name: data.name,
        hot_txt: data.hot_txt,
        hot: data.hot,
        city: data.city,
        country: data.country,
        type: data.type
      };
    case IS_SEARCH_DISTRICT:
      return {
        icon: <LocationIcon />,
        description: data.description,
        name: data.name,
        hot_txt: data.hot_txt,
        hot: data.hot,
        city: data.city,
        country: data.country,
        type: data.type
      };
    case IS_SEARCH_ROOM:
      return {
        icon: <HomeIcon />,
        description: data.room_type_text,
        name: data.name,
        hot_txt: data.hot_txt,
        hot: data.hot,
        city: data.city,
        country: data.country,
        type: data.type
      };
    default:
      return {
        icon: "",
        description: data.description,
        name: data.name,
        hot_txt: data.hot_txt,
        hot: data.hot,
        city: data.city,
        country: data.country,
        type: data.type
      };
  }
};

// @ts-ignore
const MenuItemSelectWithIcon: FunctionComponent<IProps> = (props: IProps) => {
  const { classes, data, isSelected } = props;

  const { name, error, hot_txt, hot, city, country, type } = data;

  const info = useMemo(() => detailInfo(data), []);

  return (
    <Option {...props}>
      <Grid container alignItems="center" justify="center">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          className={classes.grow}
          alignItems="center"
        >
          <Grid
            item
            className={classNames({
              [classes.white]: isSelected,
              [classes.black]: !isSelected
            })}
          >
            {info.icon}
          </Grid>
          <Grid item className={classes.title}>
            <Typography
              className={classNames({
                [classes.white]: isSelected
              })}
            >
              {!error ? name : error}{" "}
              {hot == 1 ? (
                <span>
                  {!error ? <Popular className={classes.hotLocation} /> : error}
                </span>
              ) : (
                ""
              )}
            </Typography>
            <Typography
              className={classNames({
                [classes.white]: isSelected,
                [classes.subTitle]: !isSelected
              })}
            >
              {type == 1 ? country : city !== null ? city : ""}
            </Typography>
          </Grid>
        </Grid>
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
    </Option>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(MenuItemSelectWithIcon);
