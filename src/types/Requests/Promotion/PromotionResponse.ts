import {TransformerInclude} from "@/types/Requests/ResponseTemplate";
import {CouponRes} from "@/types/Requests/Coupon/CouponResponse";


export interface PromotionRes<T=any>{
  id: number
  name: string
  description: string
  date_start: string
  date_end: string
  status: number
  image: string
  status_txt: string
  coupons: TransformerInclude<CouponRes[]>
}