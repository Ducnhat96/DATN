import { createContext, Dispatch } from 'react';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { LocationDescriptorObject } from 'history';
import qs from 'query-string';
import { AxiosRes, Pagination, BaseResponse, TypeSelect } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/utility';
import { RoomIndexGetParams, RoomUrlParams, MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import { Range } from 'react-input-range';
import _ from 'lodash';
import { ComfortIndexGetParams } from '@/types/Requests/Comforts/ComfortRequests';
import { ComfortIndexRes } from '@/types/Requests/Comforts/ComfortResponses';
import { AxiosResponse } from 'axios';
import { makeRequestSingle } from '@/store/context/searchSuggestion';

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000000;
export const STEP_PRICE = 10000;

const get = makeRequestSingle();

export const RoomIndexContext = createContext<IRoomIndexContext | any>(null);

export interface IRoomIndexContext {
  state: RoomIndexState,
  dispatch: Dispatch<RoomIndexAction>,
}

export type RoomIndexAction = { type: 'setRooms', rooms: RoomIndexRes[], meta?: Pagination | null }
  | { type: 'setPrices', price: Range }
  | { type: 'setMeta', meta: Pagination }
  | { type: 'setLoadMore', isLoadMore: boolean }
  | { type: 'setMapOpen', isMapOpen: boolean }
  | { type: 'setRating', ratingLists: number[] }
  | { type: 'setComforts', comforts: ComfortIndexRes[] }
  | { type: 'setRoomTypes', roomTypes: TypeSelect[] }
  | { type: 'setAmenitiesFilter', amenities: number[] }
  | { type: 'setFilter', amenities?: number[], roomTypesFilter?: number[], ratingLists?: number[], sorts?: number }

export type RoomIndexState = {
  readonly rooms: RoomIndexRes[]
  readonly comforts: ComfortIndexRes[]
  readonly roomTypes: TypeSelect[]
  readonly sorts: any
  readonly price: Range,
  readonly ratingLists: number[]
  readonly amenities: number[]
  readonly roomTypesFilter: number[]
  readonly meta: Pagination | null
  readonly isLoadMore: boolean
  readonly isMapOpen: boolean
}

export const RoomIndexStateInit: RoomIndexState = {
  price: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  roomTypes: [],
  comforts: [],
  rooms: [],
  amenities: [],
  ratingLists: [],
  roomTypesFilter: [],
  sorts: null,
  meta: null,
  isLoadMore: false,
  isMapOpen: true,
};

export const RoomIndexReducer = (state: RoomIndexState, action: RoomIndexAction): RoomIndexState => {
  switch (action.type) {
    case 'setRooms':
      return updateObject<RoomIndexState>(state, {
        rooms: action.rooms,
        meta: action.meta || null,
      });
    case 'setPrices':
      return updateObject<RoomIndexState>(state, {
        price: action.price,
      });
    case 'setMeta':
      return updateObject<RoomIndexState>(state, {
        meta: action.meta,
      });
    case 'setLoadMore':
      return updateObject<RoomIndexState>(state, {
        isLoadMore: action.isLoadMore,
      });
    case 'setMapOpen':
      return updateObject<RoomIndexState>(state, {
        isMapOpen: action.isMapOpen,
      });
    case 'setRating':
      return updateObject<RoomIndexState>(state, {
        ratingLists: action.ratingLists,
      });
    case 'setComforts':
      return updateObject<RoomIndexState>(state, {
        comforts: action.comforts,
      });
    case 'setAmenitiesFilter':
      return updateObject<RoomIndexState>(state, {
        amenities: action.amenities,
      });
    case 'setRoomTypes':
      return updateObject<RoomIndexState>(state, {
        roomTypes: action.roomTypes,
      });
    case 'setFilter':
      return updateObject(state, {
        roomTypesFilter: !action.roomTypesFilter ? state.roomTypesFilter : action.roomTypesFilter,
        amenities: !action.amenities ? state.amenities : action.amenities,
        ratingLists: !action.ratingLists ? state.ratingLists : action.ratingLists,
        rooms: [],
        sorts: action.sorts,
      });
    default:
      return state;
  }
};

/**
 * Get list of rooms
 * @param {LocationDescriptorObject} location
 * @param {number} page
 * @param {MapCoords} coords
 * @returns {Promise<BaseResponse<RoomIndexRes[]>>}
 */
export const getRooms = async (
  location: LocationDescriptorObject | string,
  page?: number,
  coords?: MapCoords,
): Promise<BaseResponse<RoomIndexRes[]>> => {

  let params: RoomUrlParams;
  if (typeof location !== 'string') {
    params = qs.parse(location.search!);
  } else {
    params = qs.parse(location);
  }

  let query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district,comforts.details',
    name: params.name,
    city_id: params.city_id,
    district_id: params.district_id,
    rent_type: params.rent_type,
    check_in: params.check_in,
    check_out: params.check_out,
    number_guest: params.number_of_guests,
    most_popular: params.most_popular,
    sort_total_review: (params.sort_total_review === null) ? 1 : undefined,
    discount: (params.discount === null) ? 1 : undefined,
    price_day_from: params.price_day_from,
    price_day_to: params.price_day_to,
    instant_book: (typeof params.instant !== 'undefined') ? 1 : undefined,
    sort_price_day: (params.lowest_price === null) ? 0 : 1,
    standard_point: (params.rating) ? _.split(params.rating, ',')[0] : undefined,
    comfort_lists: !!params.amenities ? params.amenities : undefined,
    type_room: !!params.room_type ? params.room_type : undefined,
    page,
  };
  if (coords) {
    query = updateObject(query, coords);
  }

  const signature = coords ? 'rooms/room-lat-long' : 'rooms';
  const url = `${signature}?${qs.stringify(query)}`;

  return fetchRoom(url);
};

export const newRoomLocation = (params: RoomUrlParams): LocationDescriptorObject => {
  return {
    pathname: '/rooms',
    search: `?${qs.stringify(params)}`,
  };
};

export const fetchRoom = async (url: string) => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);
  return res.data;
};

export const fetchComforts = async () => {
  const params: ComfortIndexGetParams = {
    include: '',
    limit: -1,
  };

  const url = 'rooms/count-room-by-comfort-lists';
  const res: AxiosRes<ComfortIndexRes[]> = await axios.get(url);
  return res.data;
};

export const fetchRoomType = async () => {
  const res: AxiosResponse<TypeSelect[]> = await axios.get('rooms/type');
  return res.data;
};

/**
 * Load filter and room type
 * @param {React.Dispatch<RoomIndexAction>} dispatch
 */
export const loadFilter = (dispatch: Dispatch<RoomIndexAction>) => {
  Promise.all([
    fetchComforts(),
    fetchRoomType(),
  ]).then(res => {
    const [comfortsRes, roomTypes] = res;
    dispatch({
      type: 'setComforts',
      comforts: comfortsRes.data,
    });
    dispatch({
      type: 'setRoomTypes',
      roomTypes,
    });
  }).catch(err => {

  });
};

/**
 * Load more room when user scroll down
 * @param {RoomIndexState} state
 * @param {React.Dispatch<RoomIndexAction>} dispatch
 */
export const loadMoreRooms = (state: RoomIndexState, dispatch: Dispatch<RoomIndexAction>) => {
  const { meta, rooms } = state;
  if (meta !== null) {
    let links = meta!.pagination.links;

    if (!_.isArray(links) && links.next) {
      fetchRoom(links.next).then(data => {
        const meta = data.meta;
        const roomsNext = data.data;
        const roomsUpdated = _.concat(rooms, roomsNext);

        dispatch({
          type: 'setRooms',
          rooms: roomsUpdated,
          meta: meta,
        });
      }).catch(err => {

      });
    } else {
      dispatch({
        type: 'setLoadMore',
        isLoadMore: false,
      });
    }
  }
};
