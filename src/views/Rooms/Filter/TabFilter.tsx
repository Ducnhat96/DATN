import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext, useEffect, memo} from 'react';
import {compose} from 'recompose';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import {IRoomIndexContext, RoomIndexContext, newRoomLocation} from '@/store/context/Room/RoomIndexContext';
import {updateObject} from '@/store/utility';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  textTab:{
    fontWeight:700,
    color:'#515b62',
    '&:hover': {
      // color:'#5392f9',
      color:'#248489',
    },
  },
  paperOutlined: {
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
  },
});

// @ts-ignore
const TabFilter: ComponentType<IProps> = (props: IProps) => {
  const {classes}               = props;
  const [tabFocus, setTabFocus] = useState<number>(0);

  const {history, location} = useContext<IGlobalContext>(GlobalContext);
  const {dispatch}          = useContext<IRoomIndexContext>(RoomIndexContext);

  useEffect(() => {
    const params: RoomUrlParams = qs.parse(location.search!);
    let focus                   = (params.instant !== undefined) ? 1 : 0;
    setTabFocus(focus);
  }, []);

  const tabFocusChange = (value: number) => {
    if (value !== tabFocus) {
      const params: RoomUrlParams  = qs.parse(location.search!);
      const instant: RoomUrlParams = {
        instant: (value === 1) ? null : undefined,
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
          <Tab label = 'Tất cả phòng' className={classes.textTab} />
          <Tab label = 'Đặt phòng nhanh' className={classes.textTab} />
        </Tabs>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(TabFilter);
