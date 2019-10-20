export interface RoomReviewInfoReq {
  cleanliness: number
  quality: number
  service: number
  valuable: number
  avg_rating: number
  comment: string
  like?: number
  recommend?: number
  booking_id: number
}
