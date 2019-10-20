import { createContext, Dispatch } from 'react';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { updateObject } from '@/store/utility';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';

import { axios } from '@/utils/axiosInstance';

export const ReviewRoomContext = createContext<IRoomReview | any>(null);

export interface IRoomReview {
  state: RoomReviewState
  dispatch: Dispatch<RoomReviewAction>
}
export type RoomReviewAction =
  { type: 'setData', RoomReviews?: RoomReviewInfoRes }
export type RoomReviewState = {
  readonly roomReview?: RoomReviewInfoRes | null
}

export const RoomReviewStateInit: RoomReviewState = {
  roomReview: null,
};

export const RoomReviewReducer = (state: RoomReviewState, action: RoomReviewAction) => {
  switch (action.type) {
    case 'setData':
      return updateObject<RoomReviewState>(state, {
        roomReview: action.RoomReviews,
      });
    default:
      return state;
  }
};

const getRoomReview = async () => {
  const res: AxiosRes<RoomReviewInfoRes> = await axios.get('reviews/252');
  return res.data;
};


