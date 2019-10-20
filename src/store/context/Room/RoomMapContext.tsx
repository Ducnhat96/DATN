import { Dispatch, createContext } from 'react';
import { updateObject } from '@/store/utility';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';

export const RoomMapContext = createContext<IRoomMapContext | any>(null);

export interface IRoomMapContext {
  state: RoomMapState,
  dispatch: Dispatch<RoomMapAction>
}

export type RoomMapAction = { type: 'setRoomId', id: number }
  | { type: 'setMapOpen', status: boolean }
  | { type: 'setMapCoords', coords: MapCoords }

export type RoomMapState = {
  readonly id: number
  readonly isMapOpen: boolean
  readonly coords?: MapCoords
}

export const RoomMapStateInit: RoomMapState = {
  id: 0,
  isMapOpen: false,
};

export const RoomMapReducer = (state: RoomMapState, action: RoomMapAction) => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject<RoomMapState>(state, {
        id: action.id,
      });
    case 'setMapOpen':
      return updateObject<RoomMapState>(state, {
        isMapOpen: action.status,
      });
    case 'setMapCoords':
      return updateObject<RoomMapState>(state, {
        coords: action.coords,
      });
    default:
      return state;
  }
};
