export interface IReply {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  reviewId: number,
  userEmail?: string,
  sellerId?: number,
}

export interface IReview {
  id: number,
  content: string,
  startRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string,
  replies: IReply[],
}

