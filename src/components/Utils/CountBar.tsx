import * as act from "@/store/actions/actionTypes";
import { ReducersType } from "@/store/reducers";
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid/Grid";
import React, {
  ComponentType,
  MouseEvent,
  useEffect,
  useState,
  Fragment,
  useContext
} from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { RouterProps } from "react-router";
import { Dispatch } from "redux";
import { withRouter, RouteProps } from "react-router-dom";
import NavigateNext from "@material-ui/icons/AddCircleOutline";
import NavigateBefore from "@material-ui/icons/RemoveCircleOutline";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import { newRoomLocation } from "@/store/context/Room/RoomIndexContext";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";

interface IProps extends RouteProps, RouterProps {
  "p-classes": any;
  singular: string;
  plural: string;
  name: string;
  divider?: boolean;
  hasApplyButton?: boolean;
}

interface IPropsLocal extends IProps {
  filter?: any;
  changeValue(value: number, field: string): Dispatch;
}

// @ts-ignore
const CountBar: ComponentType<IProps> = (props: IPropsLocal) => {
  const { filter, hasApplyButton } = props;
  const classes = props["p-classes"];
  const dividerStatus = props.divider;
  let pluralLowerCase = props.name.toLowerCase() + "Count";
  const [status, setStatus] = useState(true);
  const { history } = useContext<IGlobalContext>(GlobalContext);
  const [city_id, setCityId] = useState("");
  const [district_id, setDistrictId] = useState("");

  useEffect(() => {
    let count = props.filter[pluralLowerCase];
    setStatus(count <= 1);
  }, [props.filter[pluralLowerCase]]);

  /**
   * Change value of property
   * @param event
   * @param number
   */
  const handleCount = (event: MouseEvent<HTMLElement>, number: number) => {
    event.preventDefault();
    props.changeValue!(number, pluralLowerCase);
  };

  const applyFilter = () => {
    const pushQuery: RoomUrlParams = {
      number_of_rooms: filter.roomsCount,
      check_in: filter.startDate,
      check_out: filter.endDate,
      number_of_guests: filter.guestsCount,
      most_popular: null,
      rent_type: filter.bookingType !== 0 ? filter.bookingType : undefined,
      city_id: city_id ? city_id : "",
      district_id: district_id ? district_id : ""
    };
    const location = newRoomLocation(pushQuery);
    history.push(location);
  };

  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={2} xs={3}>
          <Button onClick={event => handleCount(event, -1)} disabled={status}>
            <NavigateBefore />
          </Button>
        </Grid>
        <Grid
          item
          sm={8}
          xs={6}
          style={{
            textAlign: "center"
          }}
        >
          <span className={classes.countNumber}>
            {props.filter[pluralLowerCase]}
          </span>
          &nbsp;
          <span className={classes.textCount}>
            {props.filter[pluralLowerCase] > 1 ? props.plural : props.singular}
          </span>
        </Grid>
        <Grid container item sm={2} xs={3} alignItems="flex-end">
          <Button
            onClick={event => handleCount(event, 1)}
            style={{ marginLeft: "auto" }}
          >
            <NavigateNext />
          </Button>
        </Grid>
        {dividerStatus ? (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      {hasApplyButton ? (
        <Button className={classes.applyButton} onClick={applyFilter}>
          Áp dụng
        </Button>
      ) : (
        ""
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeValue: (value: number, field: string) =>
      dispatch({
        type: act.ADD_VALUE,
        field: field,
        value: value
      })
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps)
)(CountBar);
