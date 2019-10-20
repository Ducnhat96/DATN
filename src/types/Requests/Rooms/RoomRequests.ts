import {BaseGetRequestParams} from '@/types/Requests/RequestTemplate';

export interface RoomIndexGetParams extends BaseGetRequestParams, Partial<MapCoords> {
  name?: string
  city?: string |  number
  district?: string
  status?: string
  merchant?: string
  manager?: string | number
  instant_book?: string | number
  hot?: string | number
  new?: string | number
  rooms?: number | string
  most_popular?: any
  sort_price_day?: number | string
  sort_total_review?: string | number | null
  discount?: string | number | null
  number_bed?: string
  number_guest?: string | number
  check_in?: string
  check_out?: string
  rent_type?: string | number
  room_type?: string
  latest_deal?: string
  comfort_lists?: string
  price_day_from?: string | number
  price_day_to?: string | number
  price_hour_from?: string
  price_hour_to?: string
  cleanliness?: string
  service?: string
  valuable?: string
  quality?: string
  avg_rating?: string
  recommend?: string
  page?: number,
  standard_point?: string
  type_room?: string
  city_id?: string |  number
  district_id?: string | number

}

export interface MapCoords {
  lat_min: number
  lat_max: number
  long_min: number
  long_max: number
}

export interface RoomUrlParams {
  name?: string
  city_id?: string |  number
  district_id?: string | number
  number_of_rooms?: number
  rent_type?: number
  check_in?: string
  check_out?: string
  number_of_guests?: number
  price_day_from?: string
  price_day_to?: string
  instant?: string | number | null,
  most_popular?: string | number | null
  lowest_price?: string | number | null
  most_review?: string | number | null
  deal_hot?: string | number | null
  rating?: string | null
  view?: 'map' | 'list'
  amenities?: string | null
  room_type?: string | null
  sort_total_review?: string | number | null
  sort_price_day?: string | number | null
  discount?: string | number | null
}

