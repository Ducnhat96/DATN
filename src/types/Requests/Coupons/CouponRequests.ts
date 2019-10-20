export interface CouponDiscountCalculateReq {
  coupon: string;
  price_original: number;
  room_id: number | string;
  city_id: number;
  checkin: string;
  checkout: string;
  booking_type: number | string;
  merchant_id: number;
  user_id?: number;
  room_type: number;
  number_of_guest: number | string;
  district_id: number;
  day: string;
}
