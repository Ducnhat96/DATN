import { ThemeCustom } from "@/components/Theme/Theme";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid/Grid";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import React, {
  ComponentType,
  Fragment,
  useState,
  useContext,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from "react";
import StarRatings from "react-star-ratings";
import { compose } from "recompose";
import classNames from "classnames";
import _ from "lodash";
import {
  IRoomIndexContext,
  RoomIndexContext,
  newRoomLocation
} from "@/store/context/Room/RoomIndexContext";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";
import { updateObject } from "@/store/utility";
import { arrayFilterCheckBoxEvent } from "@/utils/mixins";

interface IProps {
  classes?: any;
  /**
   * Number of star
   * @default 5
   */
  rate?: number;
  totalRate: number;
  dimension?: number;
  spacing?: number;
  ratedColor?: string;
  id: string;
  hasApplyButton?: boolean;
  
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    checkboxPadding: {
      padding: 0
    },
    hover: {
      color: blue[600],
      cursor: "pointer"
    },
    starMargin: {
      margin: "2px 0 0 10px"
    }
  });

const RatingBar: ComponentType<IProps> = (props: IProps) => {
  const { classes, hasApplyButton } = props;

  const [hover, setHover] = useState<boolean>(false);
  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const { ratingLists } = state;

  const checkboxEvent = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const params: RoomUrlParams = qs.parse(location.search!);
    // let value                   = parseInt(e.target.value);
    // let list                    = [...ratingLists];
    //
    // checked ? list.push(value) : _.remove(list, n => n === value);

    let list = arrayFilterCheckBoxEvent(ratingLists, e, checked);

    list = _.sortBy(list);

    const newParams  = updateObject(params, {
      rating: _.join(list, ','),
    });
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: 'setRating',
      ratingLists: list,
    });

    dispatch({
      type: 'setRooms',
      rooms: [],
    });

    history.push(locationTo);
    
  };

  return (
    <Fragment>
      <label
        htmlFor={props.id}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={classes.hover}
      >
        <Grid container spacing={8} alignItems="center">
          <Grid item sm={1}>
            <Checkbox
              id={props.id}
              value={props.totalRate.toString()}
              color="primary"
              checked={_.indexOf(ratingLists, props.totalRate) !== -1}
              onChange={checkboxEvent}
              classes={{
                root: classNames(classes.checkboxPadding, {
                  [classes.hover]: hover
                })
              }}
            />
          </Grid>
          <Grid item className={classes.starMargin}>
            {props.totalRate && props.totalRate > 0 ? (
              <StarRatings
                numberOfStars={props.totalRate || 5}
                rating={props.rate || props.totalRate || 5}
                starDimension={`${props.dimension || 20}px`}
                starSpacing={`${props.spacing || 1}px`}
                starRatedColor={props.ratedColor || "#FFC412"}
              />
            ) : (
              <Typography variant="caption">Không được xếp hạng</Typography>
            )}
          </Grid>
          {/*<Grid item sm = {2} className = {classes.starMargin}>*/}
          {/*<Typography variant = 'caption' className = {classNames({*/}
          {/*[classes.hover]: hover,*/}
          {/*})}>(69)</Typography>*/}
          {/*</Grid>*/}
        </Grid>
      </label>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(RatingBar);
