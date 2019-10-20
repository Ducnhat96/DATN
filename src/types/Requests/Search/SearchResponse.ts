export const IS_SEARCH_CITY = 1;
export const IS_SEARCH_DISTRICT = 2;
export const IS_SEARCH_ROOM = 3;

export interface SearchSuggestRes {
  name: string;
  id: number;
  hot: number;
  status: number;
  hot_txt: string;
  room_type_text: string;
  description: string;
  type: number;
  priority?: number;
  address?: string;
  error?: string;
  city: string;
  country: string;
}
