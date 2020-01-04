import { axios, AxiosRequestType } from "@/utils/axiosInstance";
import { AxiosRes } from "@/types/Requests/ResponseTemplate";
import { SearchSuggestRes } from "@/types/Requests/Search/SearchResponse";
import axiosBase, { CancelTokenSource } from "axios";
import { LocationDescriptorObject } from "history";
import {
  RoomUrlParams,
  RoomIndexGetParams
} from "@/types/Requests/Rooms/RoomRequests";
import { RoomIndexRes } from "@/types/Requests/Rooms/RoomResponses";
import qs from "query-string";
import _ from "lodash";

export const makeRequestSingle = (method: AxiosRequestType = "GET") => {
  let call: CancelTokenSource;
  return (url: string) => {
    if (call) {
      call.cancel("Only one request allowed at a time.");
    }
    call = axiosBase.CancelToken.source();

    return axios.request({
      method: method,
      url: url,
      cancelToken: call.token
    });
  };
};

const get = makeRequestSingle();
export const searchSuggest = async (q: string) => {
  const res: AxiosRes<SearchSuggestRes[]> = await get(
    `search-suggestions-web?key=${q}`
  );

  return res.data.data;
};

export const getRoomSearch = async (
  location: LocationDescriptorObject,
  input: string
) => {
  const params: RoomUrlParams = qs.parse(location.search!);

  let query: Partial<RoomIndexGetParams> = {
    include: "details",
    name: input,
    rent_type: params.rent_type,
    check_in: params.check_in,
    check_out: params.check_out,
    number_guest: params.number_of_guests,
    most_popular: params.most_popular,
    price_day_from: params.price_day_from,
    price_day_to: params.price_day_to,
    manager: typeof params.instant !== "undefined" ? 1 : undefined,
    sort_price_day: params.lowest_price === null ? 0 : 1,
    standard_point: params.rating ? _.split(params.rating, ",")[0] : undefined,
    comfort_lists: params.amenities ? params.amenities : undefined,
    type_room: params.room_type ? params.room_type : undefined
  };

  const signature = "rooms";
  const url = `${signature}?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await get(url);
  return res.data;
};
