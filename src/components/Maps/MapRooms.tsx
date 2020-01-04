import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useState, useContext, memo, useEffect } from 'react';
import { compose } from 'recompose';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid/Grid';
import RoomCardMap from '@/components/Rooms/RoomCardMap';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import Pagination from 'rc-pagination';
import Slider, { Settings } from 'react-slick';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IRoomIndexContext, RoomIndexContext } from '@/store/context/Room/RoomIndexContext';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { AxiosError } from 'axios';
import RoomCardMapXs from '@/components/Rooms/RoomCardMapXs';
import { Hidden } from '@material-ui/core';

interface IProps {
  classes?: any
  rooms: RoomIndexRes[]
  page: number

  hoverAction(id: number): void

  hoverId: number

  focusRoomLocation(room: RoomIndexRes): void

  pageChange(current: number, pageSize: number): void

  defaultRoom: RoomIndexRes
}

const styles: any = (theme: ThemeCustom) => createStyles({
  roomList: {
    [theme!.breakpoints!.only!('xs')]: {
      maxWidth: '100%',
    },
  },
});

// @ts-ignore
const MapRooms: ComponentType<IProps> = (props: IProps) => {
  const { classes, rooms, hoverId, hoverAction, focusRoomLocation, pageChange, page } = props;
  const [showRoom, setShowRoom] = useState<RoomIndexRes | null>(null);
  const [defaultRoom, setdefaultRoom] = useState<RoomIndexRes | null>(null);
  const { state } = useContext<IRoomIndexContext>(RoomIndexContext);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const xsMode = width === 'xs';
  const { meta } = state;

  const settings: Settings = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: false,
  };

  useEffect(() => {
    if (width === 'xs' && hoverId !== 0 && hoverId !== -1) {
      axios.get(`/rooms/${hoverId}?include=comforts,details,media,city,district,prices`)
        .then((res: AxiosRes<RoomIndexRes>) => {
          console.log(res.data.data);
          setShowRoom(res.data.data)
        })
        .catch((err: AxiosError) => {

        })
    }
  }, [hoverId]);

  useEffect(() => {
    if (rooms) {
      setdefaultRoom(rooms[0])
    }
  }, [rooms.length > 0])

  return (
    <Fragment>
      {!xsMode ? (
        <Fragment>
          {rooms.length > 0 ? _.map(rooms, room => (
            <Grid
              key={room.id}
              id={`room-${room.id}`}
              item xs={12}
              onMouseEnter={() => hoverAction(room.id)}
              onMouseLeave={() => hoverAction(0)}
            >
              <RoomCardMap
                room={room}
                isHover={hoverId === room.id}
                focus={focusRoomLocation} />
            </Grid>
          )) : <SimpleLoader height={200} width={200} />}
          <Grid container item xs={12} justify='flex-end'>
            {rooms.length > 0 ? (
              <Pagination
                total={meta ? meta!.pagination.total : 0}
                current={page}
                onChange={pageChange}
              />
            ) : ''}
          </Grid>
        </Fragment>
      ) : (
          <Fragment>
            <Grid item xs={12} className={classes.roomList}>
              {showRoom != null ? (
                <Grid
                  key={showRoom.id}
                  id={`room-${showRoom.id}`}
                  item xs={12}
                  onMouseEnter={() => hoverAction(showRoom.id)}
                  onMouseLeave={() => hoverAction(0)}
                >
                  <RoomCardMapXs
                    showRoom={showRoom}
                    isHover={hoverId === showRoom.id}
                    focus={focusRoomLocation}
                  />
                </Grid>
              ) : (
                  <Fragment>
                    {defaultRoom != null ? (
                      <Grid
                        key={defaultRoom.id}
                        id={`room-${defaultRoom.id}`}
                        item xs={12}
                        onMouseEnter={() => hoverAction(defaultRoom.id)}
                        onMouseLeave={() => hoverAction(0)}
                      >
                        <RoomCardMapXs
                          showRoom={defaultRoom}
                          isHover={hoverId === defaultRoom.id}
                          focus={focusRoomLocation}
                        />
                      </Grid>
                    ) : <SimpleLoader height={200} width={200} />}
                  </Fragment>
                )}
            </Grid>
          </Fragment>
        )}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(MapRooms);
