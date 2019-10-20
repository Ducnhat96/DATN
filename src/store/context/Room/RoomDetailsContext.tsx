import { createContext, Dispatch, useContext } from 'react';
import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { updateObject } from '@/store/utility';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { History } from 'history';
import _ from 'lodash';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';

export const RoomDetailsContext = createContext<IRoomDetailsContext | any>(null);

export interface IRoomDetailsContext {
  state: RoomDetailsState,
  dispatch: Dispatch<RoomDetailsAction>,
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null,
  readonly roomRecommend: RoomIndexRes[] | [],
  readonly schedule: string[]
  readonly bookingType: number
  readonly price?: BookingPriceCalculatorRes
}

export type RoomDetailsAction =
  { type: 'setDetails', room: RoomIndexRes, recommend: RoomIndexRes[], schedule: string[] }
  | { type: 'setBookingType', bookingType: number }
  | { type: 'setPrice', price: BookingPriceCalculatorRes }

export const RoomDetailsStateInit: RoomDetailsState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  bookingType: 2,
};

export const RoomDetailsReducer = (state: RoomDetailsState, action: RoomDetailsAction): RoomDetailsState => {
  switch (action.type) {
    case 'setDetails':
      return updateObject<RoomDetailsState>(state, {
        room: action.room,
        schedule: action.schedule,
        roomRecommend: action.recommend,
      });
    case 'setBookingType':
      return updateObject<RoomDetailsState>(state, {
        bookingType: action.bookingType,
      });
    case 'setPrice':
      return updateObject(state, {
        price: action.price,
      });
    default:
      return state;
  }
};

export const getRoom = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${idRoom}?include=details,merchant,comforts.details,media,district,city,places.guidebook,reviews.user`);
  return res.data.data;
};

const getRoomRecommend = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(`rooms/room_recommend/${idRoom}?include=media,details,city,district`);
  return res.data.data;
};

const getRoomSchedule = async (id: number) => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${id}`);
  return res.data;
};

export const getData = (id: number, dispatch: Dispatch<RoomDetailsAction>, history: History) => {
  if (isNaN(id)) history.push('/');
  const pathName = window.location.pathname;
  let isMerchant = false;
  //console.log(window.location.pathname);
  if (pathName.indexOf("preview-room") !== -1) {
    isMerchant = true;
  };
  Promise.all([
    getRoom(id),
    getRoomSchedule(id),
    getRoomRecommend(id),
  ]).then(res => {
    const [room, schedule, roomRecommend] = res;
    // console.log(!isMerchant, room.status !== 1);
    if (!isMerchant && room.status !== 1) {
      history.push('/404')
    }
    dispatch({
      type: 'setDetails',
      room: room,
      recommend: roomRecommend,
      schedule: _.sortBy(schedule.data.blocks),
    });
  }).catch(err => {
    console.log(err);
    history.push('/404');
  });
};
