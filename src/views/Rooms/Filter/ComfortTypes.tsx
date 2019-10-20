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
import Blue from "@material-ui/core/colors/blue";
import Grey from "@material-ui/core/colors/grey";
import Orange from "@material-ui/core/colors/orange";
import {
  IRoomIndexContext,
  RoomIndexContext,
  newRoomLocation,
  loadFilter
} from "@/store/context/Room/RoomIndexContext";
import { ComfortIndexRes } from "@/types/Requests/Comforts/ComfortResponses";
import { arrayFilterCheckBoxEvent } from "@/utils/mixins";
import { IGlobalContext, GlobalContext } from "@/store/context/GlobalContext";
import { updateObject } from "@/store/utility";
import { useExpandableList } from "@/store/hooks/filterHooks";
import Button from "@material-ui/core/Button/Button";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import qs from "query-string";

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    sortMargin: {
      marginTop: 12
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
    ul: {
      listStyleType: "none",
      marginBlockStart: "0px",
      paddingInlineStart: "0.4rem",
      paddingBlockStart: "0.5rem",
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5
    },
    buttonHeight: {
      height: "100%"
    },
    center: {
      textAlign: "center"
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0
    },
    dialog: {
      [theme!.breakpoints!.only!("xs")]: {
        padding: "0 20px"
      }
    },
    apply: {
      width: "100%"
    },
    showMore: {
      textAlign: "right",
      marginBlockStart: 0
    },
    title: {
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
  });

const RoomTypes: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;

  const { location, history } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const { comforts, amenities, roomTypes } = state;

  const [comfortTypeLocal, setComfortLocal] = useState<number[]>(amenities);

  const [comfortChunks, isComfortExpand, setComfortExpand]    = useExpandableList<ComfortIndexRes>(comforts);

  const params: RoomUrlParams = qs.parse(location.search!);

  const comfortEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let listComforts = arrayFilterCheckBoxEvent(comfortTypeLocal, e, checked);
    listComforts = _.sortBy(listComforts);

    setComfortLocal(listComforts);
  };

  const updateLocation = () => {
    const newParams = updateObject(params, {
      amenities: _.join(comfortTypeLocal, ",")
    });

    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setFilter",
      amenities: comfortTypeLocal
    });

    history.push(locationTo);
  };


  const applyFilter = () => {
    
    updateLocation();
  };

  useEffect(() => {
    if (roomTypes.length === 0) loadFilter(dispatch);
  }, []);

  return (
    <Fragment>
      {comfortChunks.length > 0 ? (
        <Fragment>
          <ul className = {classes.ul}>
            {_.map(comfortChunks, (o) => (
              <li key = {o.comfort_id}>
                <FormControlLabel
                  control = {<Checkbox
                    name = {o.comfort_id.toString()}
                    color = 'primary'
                    onChange = {comfortEvent}
                    value = {o.comfort_id.toString()}
                    checked = {_.indexOf(comfortTypeLocal, o.comfort_id) !== -1}
                    classes = {{
                      root: classes.checkboxRoot,
                    }}
                  />}
                  label = {<p className = {classes.textCheckbox}>{`${o.name_comfort} (${o.total_rooms})`}</p>}
                />
              </li>
            ))}
          </ul>
          <p className = {classes.showMore}>
            <span
              className = {classes.expandText}
              onClick = {() => setComfortExpand(!isComfortExpand)}
            >{isComfortExpand ? 'Thu gọn' : `Xem thêm`}
            </span>
          </p>
          <Button className= {classes.applyButton} onClick={applyFilter}>
            Áp dụng
          </Button>
        </Fragment>
      ) : ''}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(RoomTypes);
