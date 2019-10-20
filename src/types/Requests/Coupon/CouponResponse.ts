import {TransformerInclude} from '@/types/Requests/ResponseTemplate';
import {SettingCoupon} from '@/types/Requests/Coupon/SettingCoupon';


export interface CouponRes{
  id: number
  code: string
  discount: number
  max_discount: number
  usable: number
  status: number
  status_txt: string
  date_start: string
  date_end: string
  all_day: number
  promotion_id: number
  all_day_txt: string
  day_finish: number,
  settings: SettingCoupon
}