import { updateObject } from '@/store/utility';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { createContext, Dispatch } from 'react';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { PaymentMethod, PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import qs from 'query-string';

export const PaymentContext = createContext<IPaymentContext | any>(null);

export interface IPaymentContext {
  state: PaymentState,
  dispatch: Dispatch<PaymentAction>
}

export type PaymentState = {
  readonly room: RoomIndexRes | null;
  readonly lists: BookingIndexRes | null;
  readonly payment_methods: PaymentMethod[];
}

export type PaymentAction = { type: 'setAll', room: RoomIndexRes, lists: PaymentBankListRes, payment_methods: PaymentMethod[] }

export const PaymentStateInit: PaymentState = {
  room: null,
  lists: null,
  payment_methods: [],
};

export const PaymentReducer = (state: PaymentState, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case 'setAll':
      return updateObject<PaymentState>(state, {
        room: action.room,
        lists: action.lists,
        payment_methods: action.payment_methods,
      });
    default:
      return state;
  }
};

export const getBankList = async (uuid: string) => {
  const params = {
    include: 'room.details,room.media,room.city,room.district',
  };
  const queryString = qs.stringify(params);

  const url = `bank-list/${uuid}?${queryString}`;
  const res: AxiosRes<PaymentBankListRes> = await axios.get(url);
  return res.data;
};

export const redirectToBaoKim = async (uuid: string, bank_id: number) => {
  const request = {
    payment_method: 4,
    bank_payment_method_id: bank_id,
  };

  const res: AxiosRes<string> = await axios.post(`payment/${uuid}`, request);
  return res.data
};

