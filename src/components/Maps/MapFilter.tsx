import { ThemeCustom } from "@/components/Theme/Theme";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import React, {
  ComponentType,
  Fragment,
  useContext,
  useEffect,
  useState
} from "react";
import { compose } from "recompose";
import StarsRating from "@/components/Rooms/StarsRating";
import PriceRange from "@/components/Rooms/PriceRange";
import BookingTypeSelectBar from "@/components/Home/BookingTypeSelectBar";
import RoomTypes from "@/views/Rooms/Filter/RoomTypes.tsx";
import ComfortTypes from "@/views/Rooms/Filter/ComfortTypes.tsx";
import GuestCount from "@/components/Utils/GuestCount.tsx";
import PopOver from "@/components/Utils/PopOver";
import DateRangeController from "@/components/Utils/DateRangeController.tsx";
import { SearchFilterState } from '@/store/reducers/searchFilter';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';
import { ReducersType } from '@/store/reducers';
import { IRoomIndexContext, RoomIndexContext } from "@/store/context/Room/RoomIndexContext";


interface IProps {
  classes?: any;
  filter: SearchFilterState;
}


const useStyles = makeStyles<Theme, IProps>((theme: Theme) => ({
  lightTooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  },
  grow: {
    flexGrow: 1
  },
  button: {
    border: "1px solid #F2F2F2",
    textTransform: "initial"
  },
  wrapper: {
    marginRight: 30
  },
  paper: {
    width: '300px'
  }

});

const MapFilter: ComponentType<IProps> = (props: IProps) => {
  const { classes, filter } = props;
  const { state } = useContext<IRoomIndexContext>(RoomIndexContext);
  const { price } = state;

  const { startDate, endDate, guestsCount, bookingType } = filter;

  const sd = moment(startDate);
  const ed = moment(endDate);

  const duration = ed.diff(sd, 'days');

  return (
    <span className={classes.wrapper}>
      <PopOver title={sd.format('DD/MM/YYYY') + ' - ' + ed.format('DD/MM/YYYY')}>
        <DateRangeController />
      </PopOver>

      <PopOver title={guestsCount ? guestsCount.toString() + ' khách' : 'Số khách'}>
        <GuestCount hasApplyButton={true} />
      </PopOver>

      <PopOver title={bookingType == 1 ? 'Theo giờ' : bookingType == 2 ? 'Theo ngày' : 'Loại thuê phòng'}>
        <BookingTypeSelectBar isBlockStyle={true} hasApplyButton={true} />
      </PopOver>

      <PopOver title="Đánh giá" classes={{ paper: classes.paper }}>
        <StarsRating />
      </PopOver>

      <PopOver title={price ? price.min.toString() + ' - ' + price.max.toString() : "Khoảng giá"} classes={{ paper: classes.paper }}>
        <PriceRange hasApplyButton={true} />
      </PopOver>

      <PopOver title="Loại phòng">
        <RoomTypes hasApplyButton={true} />
      </PopOver>

      {/* <PopOver title="Tiện nghi">
        <ComfortTypes />
      </PopOver> */}
    </span>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};


export default compose<IProps, any>(
  connect(mapStateToProps),
  withStyles(styles)
)(MapFilter);
