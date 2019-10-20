import RatingBar from "@/components/Custom/RatingBar";
import { ThemeCustom } from "@/components/Theme/Theme";
import Grid from "@material-ui/core/Grid/Grid";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import React, {
  ComponentType,
  useContext,
  useEffect,
  useState,
  Fragment
} from "react";
import { compose } from "recompose";
import _ from "lodash";
import {
  IRoomIndexContext,
  RoomIndexContext,
  newRoomLocation
} from "@/store/context/Room/RoomIndexContext";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";
import Button from "@material-ui/core/Button/Button";
import { updateObject } from "@/store/utility";
import { arrayFilterCheckBoxEvent } from "@/utils/mixins";

interface IProps {
  classes?: any;
  hasApplyButton?: boolean;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    expandedMargin: {
      margin: "20px 0"
    },
    applyButton: {
      background: "transparent",
      boxShadow: "none",
      color: "#ff9800",
      fontWeight: 700,
      textTransform: "initial",
      fontSize: "16px",
      padding: "2px 11px"
    }
  });

const StarsRatingRoomIndex: ComponentType<IProps> = (props: IProps) => {
  const { classes, hasApplyButton } = props;
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);
  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const [mainRatingList, setMainRatingList] = useState<Array<number>>([]);

  useEffect(() => {
    const params: RoomUrlParams = qs.parse(location.search!);
    let list: number[] | string[] = params.rating
      ? _.split(params.rating, ",")
      : [];
    list = _.map(list, value => parseInt(value));

    dispatch({
      type: "setRating",
      ratingLists: list
    });
  }, []);

  const rateList = [
    { id: "5 Sao", value: 5 },
    { id: "4 Sao", value: 4 },
    { id: "3 Sao", value: 3 },
    { id: "2 Sao", value: 2 }
  ];

  return (
    <Fragment>
      {_.map(rateList, o => {
        return (
          <Grid key={o.id} item sm={12}>
            <RatingBar
              mainRatingList={mainRatingList}
              setMainRatingList={setMainRatingList}
              id={o.id}
              totalRate={o.value}
              hasApplyButton={hasApplyButton}
            />
          </Grid>
        );
      })}
      {hasApplyButton ? (
        <Button className={classes.applyButton}>
          Áp dụng
        </Button>
      ) : (
          ""
        )}
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(StarsRatingRoomIndex);
