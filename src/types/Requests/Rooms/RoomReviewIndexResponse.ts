import {TransformerInclude} from '@/types/Requests/ResponseTemplate';

export interface RoomReviewIndexResponse {
  id: number
  cleanliness: number
  quality: number
  service: number
  valuable: number
  avg_rating: number
  comment: string
  like: number
  recommend: number
  booking_id: number
  user_id: number
  room_id: number
  status: number
  user: TransformerInclude<UserReviewRes>
}

export interface UserReviewRes {
  name: string
  avatar: string
}