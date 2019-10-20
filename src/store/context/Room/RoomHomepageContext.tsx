import { createContext, Dispatch, useEffect } from 'react';
import { RoomIndexRes, NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { LocationDescriptorObject } from 'history';
import qs from 'query-string';
import { AxiosRes, Pagination, BaseResponse, TypeSelect } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/utility';
import { RoomIndexGetParams, RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import { Range } from 'react-input-range';
import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { fetchRoom } from '@/store/context/Room/RoomIndexContext';

export const RoomHomepageContext = createContext<IRoomHomepageContext | any>(null);

export interface IRoomHomepageContext {
   state: RoomHomepageState,
   dispatch: Dispatch<RoomHomepageAction>,
}

export type RoomHomepageAction = { type: 'setRoomHot', rooms: RoomIndexRes[] }
   | { type: 'setRoomCity', rooms: NumberRoomCity[] }
   | { type: 'setRoomNew', rooms: RoomIndexRes[] }

export type RoomHomepageState = {
   readonly roomsHot: RoomIndexRes[]
   readonly roomsCity: NumberRoomCity[]
   readonly roomsNew: RoomIndexRes[]
}

export const RoomHotStateInit: RoomHomepageState = {
   roomsHot: [],
   roomsCity: [],
   roomsNew: [],
};

export const RoomHotReducer = (state: RoomHomepageState, action: RoomHomepageAction): RoomHomepageState => {
   switch (action.type) {
      case 'setRoomHot':
         return updateObject<RoomHomepageState>(state, {
            roomsHot: action.rooms,
         });
      case 'setRoomCity':
         return updateObject<RoomHomepageState>(state, {
            roomsCity: action.rooms,
         });
      case 'setRoomNew':
         return updateObject<RoomHomepageState>(state, {
            roomsNew: action.rooms,
         });
      default:
         return state;
   }
};

export const getRoomHot = async (): Promise<BaseResponse<RoomIndexRes[]>> => {
   const query: Partial<RoomIndexGetParams> = {
      include: 'details,media,city,district',
      hot: 1,
      limit: 10,
   };
   const url = `rooms?${qs.stringify(query)}`;

   return fetchRoom(url);
};

export const getRoomCity = async () => {
   const query: Partial<RoomIndexGetParams> = {
      hot: 1,
   };
   const res: AxiosRes<NumberRoomCity[]> = await axios.get(`rooms/number-room-by-city?${qs.stringify(query)}`);
   return res.data;
};

export const getRoomNew = async (): Promise<BaseResponse<RoomIndexRes[]>> => {
   const query: Partial<RoomIndexGetParams> = {
      include: 'details,media,city,district',
      limit: 10,
   };
   const url = `get-new-room?${qs.stringify(query)}`;

   return fetchRoom(url);
};