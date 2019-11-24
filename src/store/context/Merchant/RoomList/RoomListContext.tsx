import { createContext, Dispatch } from "react";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import { LocationDescriptorObject } from "history";
import qs from "query-string";
import {
  AxiosRes,
  Pagination,
  BaseResponse,
  TypeSelect
} from "@/types/Requests/ResponseTemplate";
import { axios, axios_merchant } from "@/utils/axiosInstance";
import { updateObject } from "@/store/utility";
import {
  RoomIndexGetParams,
  RoomUrlParams,
  MapCoords
} from "@/types/Requests/Rooms/RoomRequests";
import { Range } from "react-input-range";
import _ from "lodash";
import { ComfortIndexGetParams } from "@/types/Requests/Comforts/ComfortRequests";
import { ComfortIndexRes } from "@/types/Requests/Comforts/ComfortResponses";
import { AxiosResponse } from "axios";
import { makeRequestSingle } from "@/store/context/searchSuggestion";
import Cookies from "universal-cookie";

export const RoomListContext = createContext<IRoomListContext | any>(null);

export interface IRoomListContext {
  state: RoomListState;
  dispatch: Dispatch<RoomListAction>;
}

export type RoomListAction =
  | { type: "setRoomList"; roomlist: RoomIndexRes[]; meta?: Pagination | null }
  | { type: "setMeta"; meta: Pagination };

export type RoomListState = {
  readonly roomlist: RoomIndexRes[];
  readonly meta: Pagination | null;
};

export const RoomListStateInit: RoomListState = {
  roomlist: [],
  meta: null
};

export const RoomListReducer = (
  state: RoomListState,
  action: RoomListAction
): RoomListState => {
  switch (action.type) {
    case "setRoomList":
      return updateObject<RoomListState>(state, {
        roomlist: action.roomlist,
        meta: action.meta || null
      });
    case "setMeta":
      return updateObject<RoomListState>(state, {
        meta: action.meta
      });
    default:
      return state;
  }
}

export const getRoomListMerchant = async (
  dispatch: Dispatch<RoomListAction>,
  page?: number
): Promise<any> => {
  const cookies = new Cookies();
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + cookies.get("_token"),
    "Content-Language": "vi-VN"
  };
    let query = {
      include: 'details,media,city,district,comforts.details',
      size: 10,
      page: page
    };
    const url = `rooms?${qs.stringify(query)}`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    const roomlist = res.data.data;
    if (roomlist) {
      dispatch({ type: "setRoomList", roomlist: roomlist, meta: res.data.meta });
    }
    return roomlist;
};
