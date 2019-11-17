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
import _ from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {
  IRoomIndexContext,
  RoomIndexContext,
  newRoomLocation,
  loadFilter
} from "@/store/context/Room/RoomIndexContext";
import { arrayFilterCheckBoxEvent } from "@/utils/mixins";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";
import { updateObject } from "@/store/utility";
import { useExpandableList } from "@/store/hooks/filterHooks";
import { TypeSelect } from "@/types/Requests/ResponseTemplate";
import Button from "@material-ui/core/Button/Button";

import Orange from "@material-ui/core/colors/orange";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
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
      color: Orange[500],
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
    },
    applyButton: {
      background: 'transparent',
      boxShadow: 'none',
      color: '#ff9800',
      fontWeight: 700,
      textTransform: 'initial',
      fontSize: '16px',
      padding: '2px 11px'
    }
  })
);

const RoomTypes: ComponentType<IProps> = (props: IProps) => {
  const classes = useStyles(props);

  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const { roomTypes, roomTypesFilter } = state;

  const [roomTypeLocal, setRoomTypeLocal] = useState<number[]>(roomTypesFilter);

  const [
    roomTypeChunks,
    isRoomTypeExpand,
    setRoomTypeExpand
  ] = useExpandableList<TypeSelect>(roomTypes);

  const params: RoomUrlParams = qs.parse(location.search!);

  const updateLocation = () => {
    const newParams = updateObject(params, {
      room_type: _.join(roomTypeLocal, ",")
    });

    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setFilter",
      roomTypesFilter: roomTypeLocal
    });

    history.push(locationTo);
  };

  const applyFilter = () => {
    updateLocation();

  };

  const roomTypeEvent = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let roomTypeLists = arrayFilterCheckBoxEvent(roomTypeLocal, e, checked);
    roomTypeLists = _.sortBy(roomTypeLists);

    setRoomTypeLocal(roomTypeLists);
  };

  useEffect(() => {
    if (roomTypes.length === 0) loadFilter(dispatch);
  }, []);

  return (
    <Fragment>
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
                      checked={_.indexOf(roomTypeLocal, o.id) !== -1}
                      classes={{
                        root: classes.checkboxRoot
                      }}
                    />
                  }
                  label={o.value}
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
          <Button className= {classes.applyButton} onClick={applyFilter}>
            Áp dụng
          </Button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default compose<IProps, any>(
  memo
)(RoomTypes);
