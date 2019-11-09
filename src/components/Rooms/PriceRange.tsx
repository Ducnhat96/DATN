import { ThemeCustom } from "@/components/Theme/Theme";
import "@/styles/react-input-range-custom.scss";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid/Grid";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import InputBase from "@material-ui/core/InputBase/InputBase";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {
  useState,
  ComponentType,
  useContext,
  useEffect,
  Dispatch,
  Fragment
} from "react";
import InputRange, { Range } from "react-input-range";
import { compose } from "recompose";
import {
  RoomIndexContext,
  IRoomIndexContext,
  newRoomLocation,
  MIN_PRICE,
  MAX_PRICE,
  STEP_PRICE,
  RoomIndexState,
  RoomIndexAction
} from "@/store/context/Room/RoomIndexContext";
import qs from "query-string";
import { RoomUrlParams } from "@/types/Requests/Rooms/RoomRequests";
import { updateObject } from "@/store/utility";
import { GlobalContext, IGlobalContext } from "@/store/context/GlobalContext";
import _ from "lodash";
import { LocationDescriptorObject, History } from "history";
import Button from "@material-ui/core/Button/Button";

interface IProps {
  classes?: any;
  hasApplyButton?: boolean;
}

/**
 * Synchronize price
 * @param {Range} price
 * @param {React.Dispatch<Range>} setPrice
 * @param {RoomIndexState} state
 */
export const usePriceEffect = (
  price: Range,
  setPrice: Dispatch<Range>,
  state: RoomIndexState
) => {
  useEffect(() => {
    if (!_.isEqual(state.price, price)) {
      setPrice(state.price);
    }
  }, [state.price]);
};

export const priceFilterChange = (
  value: Range | number,
  location: LocationDescriptorObject,
  history: History,
  dispatch: Dispatch<RoomIndexAction>
) => {
  if (typeof value !== "number") {
    const params: RoomUrlParams = qs.parse(location.search!);
    let prices: RoomUrlParams = {
      price_day_from: value.min.toString(),
      price_day_to: value.max.toString()
    };

    const newParams = updateObject(params, prices);
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: "setPrices",
      price: value
    });

    dispatch({
      type: "setRooms",
      rooms: []
    });

    history.push(locationTo);
  }
};

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    marginPriceRange: {
      marginTop: 0
    },
    bootstrapRoot: {
      "label + &": {
        marginTop: theme!.spacing!.unit! * 2
      }
    },
    bootstrapInput: {
      borderRadius: 4,
      backgroundColor: theme!.palette!.common!.white!,
      border: "1px solid #ced4da",
      fontSize: 14,
      padding: "0.25rem 1.35rem",
      transition: theme!.transitions!.create!(["border-color", "box-shadow"]),
      "&:focus": {
        borderColor: "#80bdff"
      }
    },
    adornment: {
      position: "absolute",
      left: "0.4rem",
      zIndex: 2
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

const PriceRange: ComponentType<IProps> = (props: IProps) => {
  const { classes, hasApplyButton } = props;

  const { history, location } = useContext<IGlobalContext>(GlobalContext);
  const { state, dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);

  const [price, setPrice] = useState<Range>({
    min: MIN_PRICE,
    max: MAX_PRICE
  });

  const setPriceEnhancement = (value: Range) => {
    if (value.min < MIN_PRICE) {
      value.min = MIN_PRICE;
    } else if (value.max > MAX_PRICE) {
      value.max = MAX_PRICE;
    }
    setPrice(value);
  };

  const applyFilter = () => {
    priceFilterChange(price, location, history, dispatch);
  };

  const afterChange = (value: Range | number) => {
    if (!hasApplyButton) {
      priceFilterChange(value, location, history, dispatch);
    }
  };

  usePriceEffect(price, setPrice, state);

  useEffect(() => {
    const params: RoomUrlParams = qs.parse(location.search!);

    let min = params.price_day_to ? parseInt(params.price_day_to) : MIN_PRICE;
    let max = params.price_day_from
      ? parseInt(params.price_day_from)
      : MAX_PRICE;

    if (min >= max) return;

    let prices: Range = { min, max };

    dispatch({
      type: "setPrices",
      price: prices
    });
  }, []);

  return (
    <Fragment>
      <Grid container item xs={12} className={classes.marginPriceRange}>
        <InputRange
          allowSameValues={false}
          onChangeComplete={value => afterChange(value)}
          minValue={MIN_PRICE}
          maxValue={MAX_PRICE}
          step={STEP_PRICE}
          onChange={(value: any) => setPriceEnhancement(value)}
          value={price}
        />
      </Grid>
      <Grid container item lg={6} sm={6}>
        <FormControl>
          <InputLabel shrink htmlFor="min-price-filter">
            Tối thiểu
          </InputLabel>
          <InputBase
            id="min-price-filter"
            value={price.min}
            readOnly
            fullWidth
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput
            }}
            startAdornment={
              <InputAdornment position="start" className={classes.adornment}>
                đ
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid container item lg={6} sm={6}>
        <FormControl>
          <InputLabel shrink htmlFor="max-price-filter">
            Tối đa
          </InputLabel>
          <InputBase
            id="max-price-filter"
            value={price.max}
            readOnly
            fullWidth
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput
            }}
            startAdornment={
              <InputAdornment position="start" className={classes.adornment}>
                đ
              </InputAdornment>
            }
          />
        </FormControl>
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

export default compose<IProps, any>(withStyles(styles))(PriceRange);
