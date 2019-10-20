import {TransformerInclude} from '@/types/Requests/ResponseTemplate';
import {ComfortIndexRes} from '@/types/Requests/Comforts/ComfortResponses';
import {MediaIndexRes} from '@/types/Requests/Media/MediaIndexResponse';
import {CityRes} from '@/types/Requests/Cities/CityResponse';
import {DistrictRes} from '@/types/Requests/Districts/DistrictResponse';
import {PlaceIndexResponse} from '@/types/Requests/Places/PlaceIndexResponse';
import {RoomReviewIndexResponse} from '@/types/Requests/Rooms/RoomReviewIndexResponse';

export interface RoomIndexRes<T = any> {
  id: number;
  merchant_id: number;
  room_type: number;
  room_type_txt: string;
  max_guest: number;
  max_additional_guest: number;
  number_bed: number;
  bathroom: number;
  number_room: number;
  city_id: number;
  district_id: number;
  checkin: string;
  checkout: string;
  price_day: number;
  price_hour: number;
  price_after_hour: number;
  price_charge_guest: number;
  cleaning_fee: number;
  standard_point: number;
  is_manager: number;
  manager: number;
  manager_txt: string;
  instant_book: number;
  hot: number;
  hot_txt: string;
  new: number;
  latest_deal: number;
  latest_deal_txt: string;
  rent_type: number;
  rent_type_txt: string;
  longitude: string;
  latitude: string;
  status: number,
  cleanliness: number | null,
  quality: number | null,
  service: number | null,
  valuable: number | null,
  avg_rating: number,
  avg_cleanliness: number,
  avg_quality: number,
  avg_service: number,
  avg_valuable: number,
  total_review: number,
  total_recommend: number | null,
  avg_rating_txt:string,
  is_discount: number | null,
  is_discount_txt: string,
  price_day_discount: number,
  price_hour_discount: number,
  settings: Settings,
  details: TransformerInclude<RoomDetails[]>;
  user: TransformerInclude<User>;
  comforts: TransformerInclude<ComfortIndexRes[]>;
  media: TransformerInclude<MediaIndexRes[]>
  city: TransformerInclude<CityRes>
  district: TransformerInclude<DistrictRes>
  merchant: TransformerInclude<Merchant>;
  places: TransformerInclude<PlaceIndexResponse[]>;
  reviews: TransformerInclude<RoomReviewIndexResponse[]>;
}

export interface RoomDetails<T=any> {
  name: string,
  address: string,
  description: string
  space: string
  note: string
}

export interface RoomScheduleRes {
  blocks: string[]
}

export interface User {
  name: string,
  avatar_url: string,
  vip_txt:string,
}

export interface NumberRoomCity {
  city_id: number,
  name_city: string,
  image: string,
  total_rooms: string,
  average_price: number,
}

export interface Merchant {
  id: any;
  name: string,
  avatar_url: string,
  vip_txt: string,
}

export interface Settings {
  days: number,
  booking_cancel_text: string,
  no_booking_cancel: number
}
