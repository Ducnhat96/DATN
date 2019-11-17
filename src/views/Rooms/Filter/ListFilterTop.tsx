import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext, memo} from 'react';
import {compose} from 'recompose';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import {updateObject} from '@/store/utility';
import {newRoomLocation, IRoomIndexContext, RoomIndexContext} from '@/store/context/Room/RoomIndexContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
    textTab:{
    fontWeight:700,
    color:'#248489',
    '&:hover': {
      color:'#248489',
    },
  },
  paperOutlined: {
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
  },

});

const [MOST_POPULAR, LOWEST_PRICE, MOST_REVIEW, DISCOUNT] = [0, 1, 2, 3];

// @ts-ignore
const ListFilterTop: ComponentType<IProps> = (props: IProps) => {
  const {classes}               = props;
  const [tabFocus, setTabFocus] = useState<number>(0);
  const {history, location}     = useContext<IGlobalContext>(GlobalContext);
  const {dispatch}              = useContext<IRoomIndexContext>(RoomIndexContext);

  const tabFocusChange = (value: number) => {
    if (value !== tabFocus) {
      const params: RoomUrlParams  = qs.parse(location.search!);
      const instant: RoomUrlParams = {
        most_popular: (value === MOST_POPULAR) ? null : undefined,
        lowest_price: (value === LOWEST_PRICE) ? null : undefined,
        sort_total_review: (value === MOST_REVIEW) ? null : undefined,
        discount: (value === DISCOUNT) ? null : undefined,
      };

      const newParams  = updateObject(params, instant);
      const locationTo = newRoomLocation(newParams);

      dispatch({
        type: 'setRooms',
        rooms: [],
      });

      setTabFocus(value);
      history.push(locationTo);
    }
  };
  return (
    <Fragment>
      <Paper square elevation = {0} className = {classes.paperOutlined}>
        <Tabs
          variant='fullWidth'
          value = {tabFocus}
          indicatorColor = 'primary'
          textColor = 'primary'
          onChange = {(e, value) => tabFocusChange(value)}
        >
          <Tab label = 'Phù hợp nhất'  className={classes.textTab} />
          <Tab label = 'Đặt phòng nhanh' className={classes.textTab} />
          <Tab label = 'Giá thấp nhất'  className={classes.textTab} />
          <Tab label = 'Nhiều đánh giá'  className={classes.textTab} />
          <Tab label = 'Khuyến mãi'  className={classes.textTab} />
        </Tabs>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(ListFilterTop);
