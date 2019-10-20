import {BookingIndexRes} from '@/types/Requests/Booking/BookingResponses';

export interface PaymentBankListRes extends BookingIndexRes {
  bank_list: PaymentMethod[]
}

export interface PaymentMethod {
  title: string
  payment_method: number,
  status: boolean
  banks: BaoKimBankInfo[]
  default: boolean
}

export type PaymentRouterParams = {
  uuid: string
}

export type BaoKimBankInfo = {
  id: string
  logo_url: string
  name: string
}

