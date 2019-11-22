import { ThemeCustom } from "@/components/Theme/Theme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  ComponentType,
  Fragment,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  memo
} from "react";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography/Typography";
import _ from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Divider from "@material-ui/core/Divider/Divider";
import Blue from "@material-ui/core/colors/blue";
import {
  IRoomIndexContext,
  RoomIndexContext,
  newRoomLocation,
  loadFilter
} from "@/store/context/Room/RoomIndexContext";
import { ComfortIndexRes } from "@/types/Requests/Comforts/ComfortResponses";
import SimpleLoader from "@/components/Loading/SimpleLoader";
import { arrayFilterCheckBoxEvent } from "@/utils/mixins";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";
import { updateObject } from "@/store/utility";
import { useExpandableList } from "@/store/hooks/filterHooks";
import { TypeSelect } from "@/types/Requests/ResponseTemplate";
import PriceRange from "@/components/Rooms/PriceRange";
import SearchProperty from "@/components/Rooms/SearchProperty";
import StarsRatingRoomIndex from "@/components/Rooms/StarsRating";
import Grid from "@material-ui/core/Grid/Grid";
import Orange from "@material-ui/core/colors/orange";
import RoomTypes from "@/views/Rooms/Filter/RoomTypes.tsx";
import ComfortTypes from "@/views/Rooms/Filter/ComfortTypes.tsx";

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    ul: {
      listStyleType: "none",
      marginBlockStart: "0px",
      paddingInlineStart: "1rem",
      paddingBlockStart: "0.5rem",
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5,
      color: "#7373739e",
      fontSize: "0.9em"
    },
    expandText: {
      fontSize: "0.9rem",
      // color: Blue[400],
      color: '#248489',
      fontWeight: 500,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    showMore: {
      textAlign: "right",
      marginBlockStart: 0
    },
    divider: {
      margin: "10px 0 10px 0"
    },
    textCheckbox: {
      color: "#5a5b5b",
      fontSize: "0.9em",
      "&:hover": {
        color: "#5392f9"
      }
    },
    filterTitle: {
      fontWeight: 700
    }
  });

// @ts-ignore
const FilterLeftBar: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;

  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const { comforts, amenities, roomTypes, roomTypesFilter } = state;

  const [comfortChunks, isComfortExpand, setComfortExpand] = useExpandableList<
    ComfortIndexRes
  >(comforts);
  const [
    roomTypeChunks,
    isRoomTypeExpand,
    setRoomTypeExpand
  ] = useExpandableList<TypeSelect>(roomTypes);

  const comfortEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let listComforts = arrayFilterCheckBoxEvent(amenities, e, checked);
    listComforts = _.sortBy(listComforts);

    const params: RoomUrlParams = qs.parse(location.search!);

    const newParams = updateObject(params, {
      amenities: _.join(listComforts, ",")
    });
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setFilter",
      amenities: listComforts
    });

    history.push(locationTo);
  };

  const roomTypeEvent = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let roomTypeLists = arrayFilterCheckBoxEvent(roomTypesFilter, e, checked);
    roomTypeLists = _.sortBy(roomTypeLists);

    const params: RoomUrlParams = qs.parse(location.search!);

    const newParams = updateObject(params, {
      room_type: _.join(roomTypeLists, ",")
    });
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setFilter",
      roomTypesFilter: roomTypeLists
    });

    history.push(locationTo);
  };

  useEffect(() => {
    loadFilter(dispatch);
  }, []);

  return (
    <Fragment>
      {/* Danh sách phòng */}
      {roomTypes.length > 0 ? (
        <Fragment>
          <SearchProperty />
        </Fragment>
      ) : (
          <Fragment>
            <Typography variant="subtitle2" className={classes.filterTitle}>
              Tìm kiếm phòng
          </Typography>
            <SimpleLoader />
          </Fragment>
        )}
      <Divider className={classes.divider} />
      {/* Price Range */}
      {roomTypes.length > 0 ? (
        <Fragment>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Khoảng giá</Typography>
            </Grid>
            <PriceRange />
          </Grid>
        </Fragment>
      ) : (
          <Fragment>
            <Typography variant="subtitle2" className={classes.filterTitle}>
              Khoảng giá
          </Typography>
            <SimpleLoader />
          </Fragment>
        )}
      <Divider className={classes.divider} />
      {/* Room Type */}
      <Typography variant="subtitle2">Loại phòng</Typography>

      {roomTypes.length > 0 ? (
        <Fragment>
          <ul className={classes.ul}>
            {_.map(roomTypeChunks, o => (
              <li key={o.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={o.id.toString()}
                      color="primary"
                      onChange={roomTypeEvent}
                      value={o.id.toString()}
                      checked={_.indexOf(roomTypesFilter, o.id) !== -1}
                      classes={{
                        root: classes.checkboxRoot
                      }}
                    />
                  }
                  label={<p className={classes.textCheckbox}>{o.value}</p>}
                />
              </li>
            ))}
          </ul>
          <p className={classes.showMore}>
            <span
              className={classes.expandText}
              onClick={() => setRoomTypeExpand(!isRoomTypeExpand)}
            >
              {isRoomTypeExpand ? "Thu gọn" : `Xem thêm`}
            </span>
          </p>
        </Fragment>
      ) : (
          <SimpleLoader />
        )}
      <Divider className={classes.divider} />
      {/* Chất lượng */}

      {roomTypes.length > 0 ? (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Đánh Giá</Typography>
          </Grid>
          <StarsRatingRoomIndex />
        </Grid>
      ) : (
          <Fragment>
            <Typography variant="subtitle2" className={classes.filterTitle}>
              Đánh giá
          </Typography>
            <SimpleLoader />
          </Fragment>
        )}
      <Divider className={classes.divider} />
      {/* Comforts Lists */}
      <Typography variant="subtitle2" className={classes.filterTitle}>
        Tiện nghi
      </Typography>
      {comfortChunks.length > 0 ? (
        <Fragment>
          <ul className={classes.ul}>
            {_.map(comfortChunks, o => (
              <li key={o.comfort_id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={o.comfort_id.toString()}
                      color="primary"
                      onChange={comfortEvent}
                      value={o.comfort_id.toString()}
                      checked={_.indexOf(amenities, o.comfort_id) !== -1}
                      classes={{
                        root: classes.checkboxRoot
                      }}
                    />
                  }
                  label={
                    <p className={classes.textCheckbox}>{`${o.name_comfort} (${
                      o.total_rooms
                      })`}</p>
                  }
                />
              </li>
            ))}
          </ul>
          <p className={classes.showMore}>
            <span
              className={classes.expandText}
              onClick={() => setComfortExpand(!isComfortExpand)}
            >
              {isComfortExpand ? "Thu gọn" : `Xem thêm`}
            </span>
          </p>
        </Fragment>
      ) : (
          <SimpleLoader />
        )}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(FilterLeftBar);
