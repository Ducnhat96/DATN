
export interface SettingCoupon{
  id: number
  date_start : string
  date_end : string,
  bind: any | null,
  rooms: any | null,
  cities: any | null,
  districts: any | null,
  days: any | null,
  booking_type: number,
  booking_create: any | null,
  booking_stay: any | null,
  merchants: any | null,
  users: any | null,
  days_of_week: any | null,
  room_type: any | null,
  min_price: number
}