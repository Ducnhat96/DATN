export interface CouponDiscountCalculateRes {
  code: number;
  message: string;
  price_discount: number;
  price_remain: number;
}

export interface CouponIndexRes {
  id: number;
  code: string;
  discount: number;
  max_discount: number;
  usable: number;
  used: number;
  status: number;
  status_txt: number;
  all_day: number | null;
  all_day_txt: string;
  settings: {
    bind: string[];
    rooms: number[];
    cities: number[];
    districts: number[];
    days: string[];
    booking_type: number;
    booking_create: [];
    booking_stay: string[];
    merchants: number[];
    users: number[]
    days_of_week: number[];
    room_type: number[];
    min_price: number
  };
  promotion_id: number
}
