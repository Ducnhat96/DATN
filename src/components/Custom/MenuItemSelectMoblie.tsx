import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { FunctionComponent, memo, useContext } from "react";
import { compose } from "recompose";
import { components } from "react-select";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { OptionProps } from "react-select/lib/components/Option";
import { SearchSuggestRes } from "@/types/Requests/Search/SearchResponse";
import classNames from "classnames";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

const { Option } = components;

interface IProps extends OptionProps<any> {
  classes?: any;
  data: SearchSuggestRes;
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
    hotLocation: {
      borderStyle: "1px solid #ffffff",
      borderWidth: "1px",
      borderRadius: 10,
      backgroundColor: "#e53935",
      padding: "4px 8px",
      fontSize: 11,
      fontWeight: 500,
      color: "#ffffff"
    }
  });

// @ts-ignore
const MenuItemSelectMoblie: FunctionComponent<IProps> = (props: IProps) => {
  const { classes, data, isSelected } = props;
  const { history } = useContext<IGlobalContext>(GlobalContext);

  const { name, error, hot_txt, hot, city, country, type } = data;

  return (
    <Option {...props}>
      <Grid container>
        <Grid
          container
          item
          xs={10}
          sm={8}
          md={8}
          className={classes.grow}
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              className={classNames({
                [classes.white]: isSelected
              })}
            >
              {!error ? name : error}{" "}
              {hot == 1 ? (
                <span className={classes.hotLocation}>
                  {!error ? hot_txt : error}
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
      </Grid>
    </Option>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(MenuItemSelectMoblie);
