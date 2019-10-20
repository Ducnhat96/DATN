import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext, memo, Dispatch, SetStateAction, useState } from 'react';
import { compose } from 'recompose';
import _ from 'lodash';
import MapMarker from '@/components/Rooms/MapMarker';
import GoogleMapReact, { MapOptions, Coords, ChangeEventValue } from 'google-map-react';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IRoomMapContext, RoomMapContext } from '@/store/context/Room/RoomMapContext';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';

interface IProps {
  classes?: any
  rooms: RoomIndexRes[],
  center: Coords
  hoverAction(id: number): void
  hoverId: number
  setRooms(rooms: RoomIndexRes[]): void
}

const styles: any = (theme: ThemeCustom) => createStyles({});

// @ts-ignore
const MapDetail: ComponentType<IProps> = (props: IProps) => {
  const { classes, rooms, center, hoverAction, hoverId, setRooms } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const { dispatch: mapDispatch } = useContext<IRoomMapContext>(RoomMapContext);
  const xsMode = width === 'xs';

  const mapOptions: MapOptions = {
    gestureHandling: 'greedy',
    zoomControl: !xsMode,
  };

  const onMapMove = (data: ChangeEventValue) => {
    if (hoverId === 0) {
      const bounds = data.bounds;
      const coords: MapCoords = {
        lat_max: bounds.ne.lat,
        lat_min: bounds.sw.lat,
        long_max: bounds.ne.lng,
        long_min: bounds.sw.lng,
      };

      mapDispatch({
        type: 'setMapCoords',
        coords: coords,
      });
    }
  };

  return (
    <GoogleMapReact
      options={mapOptions}
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyCEXOt4NhCX7FzuqDs83AsrIBGUdzl5SCY',
      }}
      defaultCenter={{ lat: 21.02, lng: 105.83 }}
      center={center}
      defaultZoom={13}
      hoverDistance={40}
      onChildMouseEnter={h => hoverAction(parseInt(h))}
      onChildMouseLeave={h => hoverAction(0)}
      onChange={onMapMove}
    >
      {_.map(rooms, room => (
        <MapMarker
          isHover={hoverId === room.id}
          room={room}
          key={room.id}
          lat={room.latitude}
          lng={room.longitude}
        />
      ))}
    </GoogleMapReact>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(MapDetail);
